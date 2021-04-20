<template>
  <v-card>
    <v-img :src="imgSrc" height="100px" />
    <v-card-text>
      <p class="category text-black headline">
        {{ bangumi.name }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="!bangumi.status"
        :class="{ 'md-primary': !bangumi.status, 'md-accent': bangumi.status }"
        class="md-raised"
        color="info"
        @click.stop.prevent="add()"
      >
        add
      </v-btn>
      <v-btn
        v-else-if="!expand"
        class="md-raised"
        color="success"
        @click.stop.prevent="expandDetail()"
      >
        <div>detail</div>
      </v-btn>
      <v-btn v-else class="md-raised" @click="pack"> pack </v-btn>
    </v-card-actions>
    <!-- dialog -->
    <v-dialog v-model="expand">
      <v-card>
        <v-toolbar color="primary" dark app>
          <v-toolbar-title>Filter</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="bangumi.status"
              label="Status"
              type="number"
            />
            <v-text-field v-model="filter.include" label="Include" />
            <v-text-field v-model="filter.regex" label="Regex" />
            <v-text-field v-model="filter.exclude" label="Exclude" />
            <v-text-field v-model="mark" label="Episode" type="number" />
          </v-form>
        </v-card-text>
        <v-card-text v-show="showSubtitle">
          <v-checkbox
            v-for="key in filter.subtitle_group"
            :key="key"
            v-model="followed"
            :label="key"
            :value="key"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showSubtitle = !showSubtitle"> 显示字幕组 </v-btn>
          <v-btn color="error" @click="del()"> delete </v-btn>
          <v-btn color="primary" @click="save()"> save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog5" max-width="500px">
      <v-card>
        <v-card-title> 确认删除? </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" flat @click.stop="onClose('not-ok')">
            Cancel
          </v-btn>
          <v-btn color="primary" flat @click.stop="onClose('ok')">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog end -->
  </v-card>
</template>
<script>
const imgRoot = './bangumi/cover/';

export default {
  props: {
    bangumi: {
      type: Object,
      required: true,
    },
  },
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
      const action = 'add';
      this.$http.post(`${action}`, { name: this.bangumi.name }).then(
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
          //            this.bangumi.status = 1
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
<style scoped>
.headline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
