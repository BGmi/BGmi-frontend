<template>
  <div>

    <div class="row" v-if="!bangumiCalendar">
      <div class="col-md-2 col-md-offset-5">
        <md-spinner class="tim-note" md-indeterminate></md-spinner>
      </div>
    </div>

    <md-tabs v-else md-fixed>
      <md-tab v-for="(key, value) in weekKey " :key="key" :id="key" :md-label="key">
        <md-layout :md-gutter="8">

          <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex-large="25"
                     md-flex-xlarge="20"
                     v-for="(bangumi,k) in bangumiCalendar[key]"
                     :key="k">
            <bangumi-card :bangumi.sync="bangumi"></bangumi-card>
          </md-layout>
        </md-layout>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
  import BangumiCard from './bangumiCard'

  export default {
    name: 'subscribe',
    components: {
      BangumiCard
    },
    data () {
      return {
        bangumiCalendar: false,
        weekKey: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    created () {
      this.$http.get('api/cal').then(
        res => {
          this.bangumiCalendar = res.body.data
          for (let key in this.weekKey) {
            if (this.bangumiCalendar.hasOwnProperty(key)) {
              this.bangumiCalendar[key] = res.body.data[key].sort(x => -x.status)
            }
          }
        },
        res => {
          console.log(res.body)
        })
    }
  }
</script>
<style scoped lang="scss">

</style>
