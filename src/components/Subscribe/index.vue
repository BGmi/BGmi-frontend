<template>
  <div class="row" v-if="!bangumiCalendar">
    <div class="col-md-2 col-md-offset-5">
      <md-spinner class="tim-note" md-indeterminate></md-spinner>
    </div>
  </div>

  <md-tabs v-else md-fixed>
    <md-tab v-for="(value,key) in bangumiCalendar" :key="key" :id="key" :md-label="key">
      <md-layout :md-gutter="8">

        <md-layout md-flex-xsmall="50" md-flex-small="50" md-flex-medium="33" md-flex-large="25"
                   md-flex-xlarge="20"
                   v-for="(bangumi,key) in value"
                   :key="key">
          <bangumi-card :bangumi.sync="bangumi"></bangumi-card>
        </md-layout>
      </md-layout>
    </md-tab>
  </md-tabs>
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
        bangumiCalendar: false
      }
    },
    created () {
      this.$http.get('api/cal').then(
        res => {
          this.bangumiCalendar = res.body.data
          for (let key in res.body.data) {
            this.bangumiCalendar[key] = res.body.data[key].sort(x => -x.status)
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
