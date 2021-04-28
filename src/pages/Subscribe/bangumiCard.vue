<template>
  <v-card>
    <v-img :src="imgSrc" height="100px"></v-img>
    <v-card-text>
      <p class="category text-black headline" :title="bangumi.name">
        {{ bangumi.name }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :class="{ 'md-primary': !bangumi.status, 'md-accent': bangumi.status }"
        @click.stop.prevent="add()"
        class="md-raised"
        color="info"
        v-if="!bangumi.status"
      >
        订阅
      </v-btn>
      <v-btn
        @click.stop.prevent="expandDetail()"
        class="md-raised"
        color="success"
        v-else-if="!expand"
      >
        <div>查看</div>
      </v-btn>
      <v-btn @click="pack" class="md-raised" v-else> ... </v-btn>
    </v-card-actions>
    <!-- dialog -->
    <v-dialog v-model="expand" max-width="800px">
      <v-card class="flex-row">
        <v-toolbar color="primary" dark app>
          <v-toolbar-title>过滤器设置</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="状态(status)"
              type="number"
              v-model="bangumi.status"
            ></v-text-field>
            <v-text-field
              label="包含(include)"
              v-model="filter.include"
            ></v-text-field>
            <v-text-field
              label="正则表达式(regex)"
              v-model="filter.regex"
            ></v-text-field>
            <v-text-field
              label="排除(exclude)"
              v-model="filter.exclude"
            ></v-text-field>
            <v-text-field
              label="已下载至(episode)"
              type="number"
              v-model="mark"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text v-show="showSubtitle">
          <v-checkbox
            :key="key"
            :label="key"
            :value="key"
            v-for="key in filter.subtitle_group"
            v-model="followed"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showSubtitle = !showSubtitle"> 显示字幕组 </v-btn>
          <v-btn @click="del()" color="error"> 删除 </v-btn>
          <v-btn @click="save()" color="primary"> 保存 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="dialog5">
      <v-card>
        <v-card-title> 确认删除? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.stop="onClose('not-ok')" color="primary" flat
            >取消
          </v-btn>
          <v-btn @click.stop="onClose('ok')" color="error" flat>删除 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog end -->
  </v-card>
</template>
<script>
const imgRoot = './bangumi/cover/';

export default {
  data() {
    return {
      dialog5: false,
      showSubtitle: false,
      imgRoot,
      expand: false,
      filter: {
        name: this.bangumi.name,
        regex: '',
        followed: [],
        subtitle_group: [],
        exclude: '',
        bangumi_name: '',
        include: '',
      },
      script: false,
      src: '',
      followed: [],
      mark: this.bangumi.episode,
    };
  },
  computed: {
    imgSrc() {
      return `${this.imgRoot}${this.bangumi.cover}`;
    },
    filter_args() {
      const obj = { name: this.bangumi.name };
      obj.include = this.filter.include;
      obj.exclude = this.filter.exclude;
      obj.regex = this.filter.regex;
      obj.subtitle = this.followed.join(',');
      return obj;
    },
  },
  props: {
    bangumi: {
      type: Object,
      required: true,
    },
  },
  methods: {
    status() {
      this.$http.post('status', {
        name: this.bangumi.name,
        status: this.bangumi.status,
      });
    },
    save() {
      let p = [];
      if (!this.script) {
        p = [
          this.$http.post('filter', this.filter_args),
          this.$http.post('mark', {
            name: this.bangumi.name,
            episode: this.mark,
          }),
        ];
      } else {
        p = [
          this.$http.post('mark', {
            name: this.bangumi.name,
            episode: this.mark,
          }),
        ];
      }
      this.expand = false;
      Promise.all(p).then(
        (res) => {
          this.expand = false;
          this.$notify({
            type: 'success',
            text: 'save filter successfully',
            placement: {
              from: 'top',
              align: 'right',
            },
          });
        },
        (res) => {}
      );
    },
    pack() {
      this.expand = false;
    },
    fetchFilter(data) {
      this.filter = data;
      this.followed = data.followed;
      this.expand = true;
    },
    expandDetail() {
      if (this.bangumi.id) {
        this.$http.post('filter', { name: this.bangumi.name }).then((res) => {
          this.fetchFilter(res.data.data);
        });
      } else {
        this.expand = true;
        this.script = true;
      }
    },
    add() {
      this.$store.commit('clearBangumiIndex');
      this.$http.post('add', { name: this.bangumi.name, episode: 0 }).then(
        (res) => {
          // this.expand = true
          this.bangumi.status = 1;
          this.$notify({
            type: res.data.status,
            text: res.data.message,
            placement: {
              from: 'top',
              align: 'right',
            },
          });
        },
        (res) => {
          // this.bangumi.status = 1
          this.$notify({
            type: 'danger',
            text: res.data.message,
            placement: {
              from: 'top',
              align: 'right',
            },
          });
        }
      );
    },
    onClose(type) {
      this.dialog5 = false;
      if (type === 'ok') {
        this.$store.commit('clearBangumiIndex');
        this.expand = false;
        const action = 'delete';
        this.$http.post(`${action}`, { name: this.bangumi.name }).then(
          (res) => {
            this.bangumi.status = 0;
            this.$notify({
              type: res.data.status,
              text: res.data.message,
              placement: {
                from: 'top',
                align: 'right',
              },
            });
          },
          (res) => {
            //              this.bangumi.status = 0
            this.$notify({
              type: 'danger',
              text: res.data.message,
              placement: {
                from: 'top',
                align: 'right',
              },
            });
          }
        );
      }
    },
    del() {
      this.dialog5 = true;
    },
  },
};
</script>
<style scoped lang="less">
.headline:not(:hover) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
