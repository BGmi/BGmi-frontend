<template>
  <v-tabs color=indigo dark fixed-tabs>
    <v-tab v-for="key in weekKey " :key="`tab-header-${key}`" :id="key" ripple>
      {{ key }}
    </v-tab>
    <v-tab-item v-for="key in weekKey " :key="`tab-item-${key}`">
      <v-container fill-height grid-list-lg text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="(bangumi, subKey) in bangumiCalendar[key.toLowerCase()]" :key="subKey">
            <bangumi-card :bangumi.sync="bangumi"></bangumi-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
  </v-tabs>
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
              this.$notify({
                type: 'error',
                text: `Please upgrade your BGmi to ${this.latestBgmiVersion}`
              })
            }
          })
      })
    }
  }
</script>
<style scoped>

</style>
