<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6 col-xs-12 col-lg-4 col-sm-6" v-for="(bg, key) in bangumi" :key="key">
              <md-card md-theme="white">
                <md-card-media>
                  <div class="bangumi-cover" :style="{backgroundImage:`url('${imgRoot}${bg.cover}')`} "></div>
                </md-card-media>

                <md-card-header>
                  <div class="md-title">{{bg.bangumi_name + (bg.status === 2 ? '(new)' : '')}}
                  </div>
                </md-card-header>

                <md-card-actions>
                  <div class="button-container">
                    <md-button v-if="!isEmpty(bg.player)" @click="$router.push(`/player/${bg.bangumi_name}/${value}`)"
                               v-for="value in Object.keys(bg.player).reverse()" :key="value">
                      {{value}}
                    </md-button>
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
      isEmpty (obj) {
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            return false
          }
        }
        return true
      },
      onTabClick (tab) {
        console.log(`onTabClick: `, tab)
      }
    },
    created () {
      if (!this.$store.state.bangumi.length) {
        this.$http.get('api/index').then(
          res => {
            this.bangumi = res.body.data
            //            for (let obj of this.bangumi) {
            //              obj.player = Object.keys(obj.player).sort(function (a, b) {
            //                return -a + b
            //              })
            //            }
          })
      } else {
        this.bangumi = this.$store.state.bangumi
      }
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
    min-height: 36px;
    margin: 6px 8px;
    padding: 0 16px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
    background: none;
    border: 0;
    border-radius: 2px;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    color: currentColor;
    font-family: inherit;
    font-size: 14px;
    font-style: inherit;
    font-variant: inherit;
    font-weight: 500;
    letter-spacing: inherit;
    line-height: 36px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    vertical-align: top;
    white-space: nowrap;
  }
</style>
