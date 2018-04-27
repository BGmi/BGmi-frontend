<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-content">
          <div class="row">
            <div class="col-md-12 col-xs-12 col-lg-12 col-sm-12">
              <div v-if="!tabData" class="col-md-2 col-md-offset-5">
                <md-spinner class="tim-note" md-indeterminate></md-spinner>
              </div>
              <div v-else v-for="(key, index) in weekday" :key="key">
                <p id="cal" v-html="bangumiToHtml(key,tabData[key])"></p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

<style lang="scss">
  .week {
    text-transform: capitalize;
    font-family: Roboto, "Noto Sans", Noto, sans-serif;
  }

  /*@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);*/
  /*#cal {*/
  /*font-family: ;*/
  /*}*/
</style>
