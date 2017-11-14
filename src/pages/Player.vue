<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header" data-background-color="purple">
              <h5 class="title">{{$route.params.bangumi_name}}</h5>
            </div>
            <div class="card-content">
              <div class="row">
                <div class="col-md-12">
                  <div class="dplayer-container">
                    <div :id="bangumi.bangumi_name">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <router-link :to="`/player/${bangumi.bangumi_name}/${key}`"
                               v-for="(value, key) in bangumi.player" :key="key">
                    <md-button @click="changeEpisode(key)">
                      {{key}}
                    </md-button>
                  </router-link>
                  <a :href="`/bangumi/${bangumi.bangumi_name}/`">
                    <md-button>{{`/bangumi/${bangumi.bangumi_name}/`}}</md-button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DPlayer from 'dplayer'
  import md5 from 'md5'
  import 'dplayer/dist/DPlayer.min.css'

  export default {
    data () {
      return {
        bangumi: {},
        danmakuApi: ''
      }
    },
    methods: {
      changeEpisode (episode) {
        this.init(this.$store.state.bangumi)
      },
      init (data) {
        for (let bangumi of data) {
          if (bangumi.bangumi_name === this.$route.params.bangumi_name) {
            this.bangumi = bangumi
            this.$nextTick(
              () => {
                let episode = `/bangumi${bangumi.player[this.$route.params.episode].path}`
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
      this.$http.get('api/index').then(
        res => {
          this.$store.commit('bangumiIndex', res.body.data)
          this.init(res.body.data)
        })
    }
  }
</script>
<style>
  .dplayer-icon svg {
    height: 24px !important;
  }
</style>
