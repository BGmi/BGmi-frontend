<template>
  <v-container>
    <v-layout justify-center>
      <v-flex
        xs12
        lg10
        xl8
      >
        <v-card>
          <v-toolbar
            app
            dark
            color="primary"
          >
            <v-toolbar-title>
              {{ bangumi.bangumi_name }} - {{ $route.params.episode }}
            </v-toolbar-title>
            <v-spacer />
            <v-tooltip right>
              <v-btn
                slot="activator"
                icon
                large
                :href="dirPath"
                target="_blank"
              >
                <v-icon>{{ mdiFolderOpen }}</v-icon>
              </v-btn>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <div class="dplayer-container">
              <div :id="bangumi.bangumi_name" />
            </div>
          </v-card-text>

          <v-card-actions
            v-for="(e,index ) in chunk(episodes, 8)"
            :key="index"
          >
            <router-link
              v-for="(key, i) in e"
              :key="i"
              tag="v-btn"
              :class="{
                lightGray: hasWatched(bangumi.bangumi_name, key),
                'btn--flat': parseInt($route.params.episode.toString()) !== parseInt(key.toString()),
              }"
              :to="`/player/${$route.params.category}/${normalizePath(bangumi.bangumi_name)}/${key}`"
            >
              第{{ key }}集
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import path from 'path';

import DPlayer from 'dplayer';
import md5 from 'md5';
import { mdiFolderOpen } from '@mdi/js';
import chunk from 'lodash/chunk';

import { hasWatched, normalizePath } from '@/utils';

export default {
  data() {
    return {
      mdiFolderOpen,
      bangumi: {},
      videoFileUrl: '',
      $dplayer: null,
      danmakuApi: '',
    };
  },
  computed: {
    dirPath() {
      return path.dirname(this.videoFileUrl) + '/';
    },
    episodes() {
      if (!Object.prototype.hasOwnProperty.call(this.bangumi, 'player')) { return []; }
      return Object.keys(this.bangumi.player);
    },
  },
  watch: {
    '$route.params.episode'() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    chunk,
    normalizePath,
    hasWatched,
    init() {
      const cb = (bangumi) => {
        this.initData(bangumi);
      };
      this.$store.dispatch('getBangumi', {
        category: this.$route.params.category,
        cb,
      });
    },
    initData(data) {
      for (const bangumi of data) {
        if (
          normalizePath(bangumi.bangumi_name) ===
          this.$route.params.bangumi_name
        ) {
          this.bangumi = bangumi;
          this.$store.commit('saveHistory', {
            bangumi_name: bangumi.bangumi_name,
            episode: this.$route.params.episode,
          });
          this.$nextTick(() => {
            const episode = `/bangumi${
              bangumi.player[this.$route.params.episode].path
            }`;
            /* */
            const filePath = bangumi.player[this.$route.params.episode].path.toLowerCase();
            if (filePath.includes('hevc') || filePath.includes('x265')) {
              this.$notify({
                type: 'warn',
                text:
                  '如果不能正常播放视频,可能是因为这个视频的编码方式暂时不受浏览器支持,请使用其他播放器播放.',
              });
            }
            this.videoFileUrl = episode;

            const option = {
              theme: '#FF3333',
              element: document.getElementById(bangumi.bangumi_name),
              screenshot: true,
              video: {
                url: episode,
                pic: bangumi.cover,
              },
            };

            if (this.$store.state.danmaku_api) {
              option.danmaku = {
                id: md5(bangumi.bangumi_name) + this.$route.params.episode,
                api: this.$store.state.danmaku_api,
              };
            }
            if (this.$dplayer) {
              this.$dplayer.switchVideo(option.video, option.danmaku);
            } else {
              this.$dplayer = new DPlayer(Object.assign({}, option));
            }
          });
          break;
        }
      }
    },
  },
};
</script>
<style scoped>
.lightGray {
  color: lightgray !important;
}

.card__actions {
  display: block;
}
</style>
