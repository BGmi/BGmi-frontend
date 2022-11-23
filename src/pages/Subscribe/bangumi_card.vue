<template>
  <v-card>
    <v-img
      :src="imgSrc"
      height="100px"
    />
    <v-card-text>
      <p
        class="category text-black headline"
        :title="name"
      >
        {{ name }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="!dataStatus"
        :class="{ 'md-primary': !dataStatus, 'md-accent': dataStatus }"
        class="md-raised"
        color="info"
        @click.stop.prevent="add()"
      >
        订阅
      </v-btn>
      <v-btn
        v-else-if="!expand"
        class="md-raised"
        color="success"
        @click.stop.prevent="expandDetail()"
      >
        <div>查看</div>
      </v-btn>
      <v-btn
        v-else
        class="md-raised"
        @click="pack"
      >
        ...
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-model="expand"
      max-width="800px"
    >
      <v-card class="flex-row">
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>过滤器设置</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="filter.include"
              label="包含(include)"
            />
            <v-text-field
              v-model="filter.regex"
              label="正则表达式(regex)"
            />
            <v-text-field
              v-model="filter.exclude"
              label="排除(exclude)"
            />
            <v-text-field
              v-model="mark"
              label="已下载至(episode)"
              type="number"
            />
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
          <v-btn @click="showSubtitle = !showSubtitle">
            显示字幕组
          </v-btn>
          <v-btn
            color="error"
            @click="del()"
          >
            删除
          </v-btn>
          <v-btn
            color="primary"
            @click="save()"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog5"
      max-width="500px"
    >
      <v-card>
        <v-card-title> 确认删除?</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click.stop="onClose('not-ok')"
          >
            取消
          </v-btn>
          <v-btn
            color="error"
            text
            @click.stop="onClose('ok')"
          >
            删除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';

const imgRoot = './bangumi/cover/';

type Filter = {
  name: string,
  regex: string,
  followed: [],
  // eslint-disable-next-line camelcase
  subtitle_group: [],
  exclude: string,
  // eslint-disable-next-line camelcase
  bangumi_name: string,
  include: string,
}

export default Vue.extend({
  name: 'BangumiCard',
  model: {
    prop: 'status',
    event: 'changed',
  },
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: Number, required: false, default: 0 },
    cover: { type: String, required: true },
    episode: { type: Number, required: false, default: 0 },
  },
  data() {
    return {
      dialog5: false,
      showSubtitle: false,
      expand: false,
      dataStatus: this.$props.status,
      filter: {
        name: this.name,
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
      mark: this.episode,
    };
  },
  computed: {
    imgSrc(): string {
      return `${imgRoot}${this.cover}`;
    },
  },
  methods: {
    filter_args() {
      return {
        name: this.name,
        include: this.filter.include,
        exclude: this.filter.exclude,
        regex: this.filter.regex,
        subtitle: this.followed.join(','),
      };
    },
    save() {
      let p = [];
      if (!this.script) {
        p = [
          this.$http.post('filter', this.filter_args()),
          this.$http.post('mark', {
            name: this.name,
            episode: this.mark,
          }),
        ];
      } else {
        p = [
          this.$http.post('mark', {
            name: this.name,
            episode: this.mark,
          }),
        ];
      }
      this.expand = false;
      Promise.all(p).then(
        () => {
          this.dataStatus = true;
          this.expand = false;
          this.$notify({
            type: 'success',
            text: 'save filter successfully',
          });
        },
      );
    },
    pack() {
      this.expand = false;
    },
    fetchFilter(data: Filter) {
      this.filter = data;
      this.followed = data.followed;
      this.expand = true;
    },
    expandDetail() {
      if (this.id) {
        this.$http.post('filter', { name: this.name }).then((res) => {
          this.fetchFilter(res.data.data);
        });
      } else {
        this.expand = true;
        this.script = true;
      }
    },
    add() {
      this.$store.commit('clearBangumiIndex');
      this.$http.post('add', { name: this.name, episode: 0 }).then(
        (res) => {
          this.expand = true;
          this.$notify({
            type: res.data.status,
            text: res.data.message,
          });
        },
        (res) => {
          this.$emit('changed', 1);
          // this.status = 1;
          this.$notify({
            type: 'danger',
            text: res.data.message,
          });
        },
      );
    },
    onClose(type: string) {
      this.dialog5 = false;
      if (type === 'ok') {
        this.$store.commit('clearBangumiIndex');
        this.dataStatus = false;
        this.expand = false;
        const action = 'delete';
        this.$http.post(`${action}`, { name: this.name }).then(
          (res) => {
            this.$notify({
              type: res.data.status,
              text: res.data.message,
            });
          },
          // reject
          (res) => {
            // this.bangumi.status = 0
            this.$emit('changed', 0);
            console.log(res);

            this.$notify({
              type: 'danger',
              text: res.data.message,
            });
          },
        );
      }
    },
    del() {
      this.dialog5 = true;
    },
  },
});
</script>

<style scoped>
.headline:not(:hover) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
