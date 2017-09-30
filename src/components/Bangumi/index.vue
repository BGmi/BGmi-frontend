<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-content">
              <div class="row">
                <div class="col-md-4 col-xs-4 col-lg-4 col-sm-4">
                  <md-card v-for="(bg, key) in bangumi" :key="key">
                    <md-card-media>
                      <img :src="`${imgRoot}${bg.cover}`">
                    </md-card-media>
                    <md-card-header>
                      <!--<div class="md-title">{{bg.bangumi_name}}</div>-->
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
  let imgRoot = ''
  if (process.env.NODE_ENV === 'development') {
    imgRoot = 'http://localhost:8888/bangumi/cover/'
  } else {
    imgRoot = '/bangumi/cover/'
  }
  export default {
    name: 'dashboard',
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
      this.$http.get('api/index').then(
        res => {
          this.$store.commit('init', res.body)
          this.bangumi = res.body.data
        })
    }
  }
</script>

<style lang="scss" scoped>

</style>
