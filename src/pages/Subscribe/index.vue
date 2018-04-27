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
                     v-for="(bangumi, subKey) in bangumiCalendar[key.toLowerCase()]"
                     :key="subKey">
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
        weekKey: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        latestBgmiVersion: '',
        bgmiVersion: ''
      }
    },
    mounted () {
      this.$store.dispatch('getCalendar', (cal) => {
        this.bangumiCalendar = cal
        this.latestBgmiVersion = this.$store.state.latestBgmiVersion
        this.bgmiVersion = this.$store.state.bgmiVersion
        this.$nextTick(
          () => {
            if (this.bgmiVersion < this.latestBgmiVersion) {
              this.$notifications.notify({
                type: 'danger',
                //              icon: 'notifications',
                message: `Please upgrade your BGmi to ${this.latestBgmiVersion}`,
                placement: {
                  from: 'top',
                  align: 'center'
                }
              })
            }
          })
      })
    }
  }
</script>
<style scoped lang="scss">

</style>
