<template>
  <div class="content">
    <div class="container-fluid">
      <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
        <md-dialog-title>Lorem ipsum dolor sit amet</md-dialog-title>

        <md-dialog-content>Nemo, nobis necessitatibus ut illo, ducimus ex.</md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="closeDialog('dialog1')">Cancel</md-button>
          <md-button class="md-primary" @click="closeDialog('dialog1')">Ok</md-button>
        </md-dialog-actions>
      </md-dialog>
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
                    <div :id="bangumi.bangumi_name"></div>
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
      changeEpisode (episode) {
        this.init(this.$store.state.bangumi)
      },
      init (data) {
        for (let bangumi of data) {
          if (bangumi.bangumi_name === this.$route.params.bangumi_name) {
            this.bangumi = bangumi
            console.log(bangumi.cover)
            this.$nextTick(
              () => {
                const option = {
                  theme: '#FF3333',
                  element: document.getElementById(bangumi.bangumi_name),
                  screenshot: true,
                  video: {
                    url: `/bangumi${bangumi.player[this.$route.params.episode].path}`,
                    pic: bangumi.cover.substr(1)
                  },
                  danmaku: {
                    id: md5(bangumi.bangumi_name) + this.$route.params.episode,
                    api: 'https://api.prprpr.me/dplayer/'
                  }
                }
                /* eslint-disable no-unused-vars */
                let dp = new DPlayer(option)
//                dp.on('error', () => {
//                  this.$notifications.notify({
//                    type: 'danger',
//                    message: 'This episode has not been fully downloaded or html5 does not support ' +
//                    'this video encoding, please download to the local.',
//                    placement: {
//                      from: 'top',
//                      align: 'right'
//                    }
//                  })
//                })
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
