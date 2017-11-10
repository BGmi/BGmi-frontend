<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6 col-xs-12 col-lg-4 col-sm-6" v-for="(bg, key) in bangumi" :key="key">
              <md-card md-theme="white">
                <md-card-media>
                  <div class="bangumi-cover" :style="{backgroundImage:`url('${bg.cover}')`} "></div>
                </md-card-media>

                <md-card-header>
                  <div class="md-title">{{bg.bangumi_name + (bg.status === 2 ? '(new)' : '')}}</div>
                  <div class="md-subhead">latest:{{bg.episode}}</div>
                </md-card-header>

                <md-card-actions>
                  <div class="button-container">
                    <md-button v-if="!isEmpty(bg.player)" @click="$router.push(`/player/${bg.bangumi_name}/${value}`)"
                               v-for="value in Object.keys(bg.player).reverse().slice(0, 4)" :key="value">
                      {{value}}
                    </md-button>
                    <!--<div class="md-button" style="max-width: 0"></div>-->
                  </div>
                </md-card-actions>
              </md-card>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bangumi',
    components: {},

    data () {
      return {
        bangumi: []
      }
    },

    methods: {
      isEmpty (obj) {
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            return false
          }
        }
        return true
      }
    },
    mounted () {
      this.$http.get('api/index').then(
        res => {
          this.bangumi = res.body.data
        })
    }
  }
</script>

<style lang="scss" scoped>
  .bangumi-cover {
    height: 260px;
    background-size: cover;
    background-position: center center;
  }

  .md-title {
    white-space: nowrap;
  }

  .button-container {
    min-width: 88px;
    min-height: 40px;
    line-height: 40px;
    white-space: nowrap;
  }
</style>
