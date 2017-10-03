<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-content">
          <div class="row">
            <div class="col-md-12 col-lg-12">
              <md-button class="md-info" href="/resource/calendar.ics">ICS Calendar </md-button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-xs-12 col-lg-12 col-sm-12">
              <div v-if="!tabData" class="col-md-2 col-md-offset-5">
                <md-spinner class="tim-note" md-indeterminate></md-spinner>
              </div>
              <div v-else v-for="(bangumis, key) in tabData" :key="key">
                <p v-html="bangumiToHtml(key,tabData[key])"></p></div>
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
        tabData: false
      }
    },
    created () {
      this.$http.get('api/cal').then(
        res => {
          this.tabData = res.body.data
          for (let key in res.body.data) {
            if (res.body.data.hasOwnProperty(key)) {
              this.tabData[key] = res.body.data[key].sort(x => -x.status)
            }
          }
        },
        res => {
          console.log(res.body)
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
        return `<h3>${day}</h3>${str.join(' / ')}`
      }
    }
  }
</script>

<style lang="scss">
</style>
