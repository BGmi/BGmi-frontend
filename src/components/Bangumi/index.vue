<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <!--<div class="card">-->
          <!--<div class="card-content">-->
              <div class="row">
                <div class="col-md-6 col-xs-12 col-lg-4 col-sm-6" v-for="(bg, key) in bangumi" :key="key">
                  <md-card md-theme="white">
                    <md-card-media>
                      <div
                        style="background-size: cover; height: 30vh; background-repeat: no-repeat; background-position:center center;"
                        :style="{backgroundImage:`url('${imgRoot}${bg.cover}')`} "></div>
                    </md-card-media>
                    <md-card-header>
                      <div class="md-subhead">{{bg.bangumi_name}}</div>
                    </md-card-header>
                    <md-card-actions>
                      <router-link :to="`/player/${bg.bangumi_name}/${key}`"
                                   v-for="(value, key) in bg.player" :key="key">
                        <md-button>
                          {{key}}
                        </md-button>
                      </router-link>
                    </md-card-actions>
                  </md-card>
                  <br>
                </div>
                <!--</div>-->
                <!--</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let imgRoot = ''
  if (process.env.NODE_ENV === 'development') {
    imgRoot = 'http://localhost:8888/bangumi/cover/'
  } else {
    imgRoot = '/bangumi/cover/'
  }
  export default {
    name: 'bangumi',
    components: {},

    data () {
      return {
        imgRoot,
        bangumi: []
      }
    },

    methods: {
      onTabClick (tab) {
        console.log(`onTabClick: `, tab)
      }
    },
    created () {
      if (!this.$store.state.bangumi.length) {
        this.$http.get('api/index').then(
          res => {
            this.bangumi = res.body.data
          })
      } else {
        this.bangumi = this.$store.state.bangumi
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
