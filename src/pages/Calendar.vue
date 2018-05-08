<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex>
        <v-card md-theme="white" style="overflow: hidden">
          <v-card-title>
            <div v-if="!tabData" class="col-md-2 col-md-offset-5">
              <md-spinner class="tim-note" md-indeterminate></md-spinner>
            </div>
            <div v-else v-for="(key, index) in weekday" :key="index">
              <p id="cal" v-html="bangumiToHtml(key,tabData[key])"></p>
            </div>
          </v-card-title>
          <br>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'calendar',
    components: {},
    data () {
      return {
        tabData: false,
        weekday: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      }
    },
    created () {
      this.$store.dispatch('getCalendar', (cal) => {
        this.tabData = cal
      //        for (let key in cal) {
      //          if (cal.hasOwnProperty(key)) {
      //            this.tabData[key] = cal[key].sort(x => -x.status)
      //          }
      //        }
      })
    },
    methods: {
      bangumiToHtml (day, bangumis) {
        let str = []

        for (let bangumi in bangumis) {
          if (bangumis.hasOwnProperty(bangumi)) {
            str.push(bangumis[bangumi].status ? `<b>${bangumis[bangumi].name}</b>` : `${bangumis[bangumi].name}`)
          }
        }

        return `<h3 class="week">${day}</h3>${str.join(' / ')}`
      }
    }
  }
</script>

<style>
.week {
  text-transform: capitalize;
  font-family: Roboto, "Noto Sans", Noto, sans-serif;
}
</style>
