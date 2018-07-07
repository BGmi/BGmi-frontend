<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 lg10 xl8>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              {{bangumi.bangumi_name}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip right>
              <v-btn slot="activator" icon large :href="dirPath"
                     target="_blank">
                <v-icon large>folder_open</v-icon>
              </v-btn>
              <span>Bangumi Files</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <div class="dplayer-container">
              <div :id="bangumi.bangumi_name">
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <router-link tag="v-btn"
                         :class="{lightGray:hasWatched(bangumi.bangumi_name,key),
                                  'btn--flat':parseInt($route.params.episode.toString())!==parseInt(key.toString())}"
                         :to="`/player/${$route.params.category}/${normalizePath(bangumi.bangumi_name)}/${key}`"
                         v-for="(key, index) in episodes" :key="index">
              {{key}}
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      timeout="5000"
      top
      vertical
    >
      如果不能正常播放视频,可能是因为这个视频的编码方式暂时不受浏览器支持,请使用其他播放器播放.
      <v-btn
        color="blue"
        @click="snackbar = false"
        flat
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import DPlayer from 'dplayer'
import md5 from 'md5'
import 'dplayer/dist/DPlayer.min.css'
import { hasWatched, normalizePath } from '../utils'
import path from 'path'

export default {
  data () {
    return {
      snackbar: false,
      bangumi: {},
      videoFileUrl: '',
      danmakuApi: ''
    }
  },
  watch: {
    '$route.params.episode' () {
      this.init()
    }
  },
  methods: {
    normalizePath,
    hasWatched,
    init () {
      let cb = (bangumi) => {
        this.initData(bangumi)
      }
      this.$store.dispatch('getBangumi', { category: this.$route.params.category, cb })
    },
    initData (data) {
      for (let bangumi of data) {
        if (normalizePath(bangumi.bangumi_name) === this.$route.params.bangumi_name) {
          this.bangumi = bangumi
          this.$store.commit('saveHistory', {
            bangumi_name: bangumi.bangumi_name,
            episode: this.$route.params.episode
          })
          this.$nextTick(
            () => {
              let episode = `/bangumi${bangumi.player[this.$route.params.episode].path}`
              /* */
              let filePath = bangumi.player[this.$route.params.episode].path.toLowerCase()
              if (filePath.indexOf('hevc') !== -1 || filePath.indexOf('x265')) {
                this.snackbar = true
              }
              this.videoFileUrl = episode
              if (episode.toLowerCase().includes('hevc') || episode.toLowerCase().includes('x265')) {
                this.$notifications.notify({
                  type: 'danger',
                  icon: 'notifications',
                  message: 'this episode may be encoded as x265, which is not currently supported by browsers.',
                  placement: {
                    from: 'top',
                    align: 'right'
                  }
                })
              }

              const option = {
                theme: '#FF3333',
                element: document.getElementById(bangumi.bangumi_name),
                screenshot: true,
                video: {
                  url: episode,
                  pic: bangumi.cover
                }
              }

              if (data.danmaku_api) {
                option.danmaku = {
                  id: md5(bangumi.bangumi_name) + this.$route.params.episode,
                  api: 'https://api.prprpr.me/dplayer/'
                }
              }
              /* eslint-disable no-unused-vars */
              let dp = new DPlayer(option)
            }
          )
          break
        }
      }
    }
  },
  created () {
    this.init()
  },
  computed: {
    dirPath () {
      return path.dirname(this.videoFileUrl) + '/'
    },
    episodes () {
      if (!this.bangumi.hasOwnProperty('player')) return []
      return Object.keys(this.bangumi.player).reverse()
    }
  }
}
</script>
<style>
  .lightGray {
    color: lightgray !important;
  }
</style>
