<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header" data-background-color="purple">
              <h5 class="title">{{$route.params.bangumi_name}}</h5>
              <!--<p class="category">Created using Roboto Font Family</p>-->
            </div>
            <div class="card-content">
              <div class="row">
                <div class="col-md-12">
                  <div class="dplayer-container">
                    <div :id="bangumi.bangumi_name"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <router-link :to="`/player/${bangumi.bangumi_name}/${key}`"
                               v-for="(value, key) in bangumi.player" :key="key">
                    <md-button>
                      {{key}}
                    </md-button>
                  </router-link>
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
        bangumi: {}
      }
    },
    methods: {
      init (data) {
        for (let bangumi of data) {
          if (bangumi.bangumi_name === this.$route.params.bangumi_name) {
            this.bangumi = bangumi
            this.$nextTick(
              () => {
                /* eslint-disable no-unused-vars */
                let dp = new DPlayer({
                  theme: '#FF3333',
                  element: document.getElementById(bangumi.bangumi_name),
                  screenshot: true,
                  video: {
                    url: `/bangumi${bangumi.player[this.$route.params.episode].path}`,
                    pic: this.$store.state.coverRoot + bangumi.cover
                  },
                  danmaku: {
                    id: md5(bangumi.bangumi_name) + this.$route.params.episode,
                    api: 'https://api.prprpr.me/dplayer/'
                  }
                })
              }
            )
            break
          }
        }
      }
    },
    created () {
      if (!this.$store.state.bangumi.length) {
        this.$http.get('api/index').then(
          res => {
            this.$store.commit('init', res.body)
            this.init(res.body.data)
          })
      } else {
        this.init(this.$store.state.bangumi)
      }
    },
    mounted () {
      /* eslint-disable no-unused-vars */
    }
  }
</script>
<style>
  .dplayer-icon svg {
    height: 24px !important;
  }
</style>
