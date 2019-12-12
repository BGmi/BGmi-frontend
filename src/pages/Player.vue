<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 lg10 xl8>
        <v-card>
          <v-app-bar app dark color="primary">
            <v-toolbar-title>
              {{ bangumi.bangumi_name }}
            </v-toolbar-title>
            <v-spacer/>
            <v-tooltip right>
              <v-btn slot="activator" icon large :href="dirPath"
                     target="_blank">
                <v-icon large>folder_open</v-icon>
              </v-btn>
              <span>Bangumi Files</span>
            </v-tooltip>
          </v-app-bar>
          <v-card-text>
            <div class="dplayer-container">
              <div :id="bangumi.bangumi_name"/>
            </div>
          </v-card-text>
          <v-card-actions>
            <router-link tag="v-btn"
                         :class="{lightGray:hasWatched(bangumi.bangumi_name,key),
                                  'btn--flat':parseInt($route.params.episode.toString())!==parseInt(key.toString())}"
                         :to="`/player/${$route.params.category}/${normalizePath(bangumi.bangumi_name)}/${key}`"
                         v-for="(key, index) in episodes" :key="index">
              {{ key }}
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
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
      bangumi: {},
      videoFileUrl: '',
      $dplayer: null,
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
      const cb = (bangumi) => {
        this.initData(bangumi)
      }
      this.$store.dispatch('getBangumi', {
        category: this.$route.params.category,
        cb
      })
    },
    initData (data) {
      for (const bangumi of data) {
        if (normalizePath(bangumi.bangumi_name) === this.$route.params.bangumi_name) {
          this.bangumi = bangumi
          this.$store.commit('saveHistory', {
            bangumi_name: bangumi.bangumi_name,
            episode: this.$route.params.episode
          })
          this.$nextTick(
            () => {
              const episode = `/bangumi${bangumi.player[this.$route.params.episode].path}`
              /* */
              const filePath = bangumi.player[this.$route.params.episode].path.toLowerCase()
              if (filePath.includes('hevc') || filePath.includes('x265')) {
                this.$notify({
                  type: 'warn',
                  text: '如果不能正常播放视频,可能是因为这个视频的编码方式暂时不受浏览器支持,请使用其他播放器播放.'
                })
              }
              this.videoFileUrl = episode

              const option = {
                theme: '#FF3333',
                element: document.getElementById(bangumi.bangumi_name),
                screenshot: true,
                video: {
                  url: episode,
                  pic: bangumi.cover
                }
              }

              if (this.$store.state.danmaku_api) {
                option.danmaku = {
                  id: md5(bangumi.bangumi_name) + this.$route.params.episode,
                  api: this.$store.state.danmaku_api
                }
              }
              if (this.$dplayer) {
                this.$dplayer.switchVideo(option.video, option.danmaku)
              } else {
                this.$dplayer = new DPlayer(Object.assign({}, option))
              }
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
      if (!Object.prototype.hasOwnProperty.call(this.bangumi, 'player')) return []
      return Object.keys(this.bangumi.player).reverse()
    }
  }
}
</script>
<style scoped>
.lightGray {
  color: lightgray !important;
}

.card__actions {
  display: block;
}
</style>
