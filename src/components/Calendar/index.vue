<template>

  <div class="container">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-content">
              <div id="typography">
                <div class="title">
                  <md-button class="md-info" href="/calendar.ics">ICS Calendar
                  </md-button>
                </div>
                <div class="row" v-if="!tabData">
                  <div class="col-md-2 col-md-offset-5">
                    <md-spinner class="tim-note" md-indeterminate></md-spinner>
                  </div>
                </div>
                <div v-for="(bangumis, key) in tabData" :key="key"><p
                  v-html="bangumiToHtml(key,tabData[key])"></p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'subscribe',
    components: {},
    data () {
      return {
        tabs: [
          {id: 'home', name: 'Home', icon: 'bug_report', active: true},
          {id: 'website', name: 'Website', icon: 'code', active: false},
          {id: 'server', name: 'Server', icon: 'cloud', active: false}
        ],
        tabData: false
      }
    },
    created () {
      this.$http.get('api/cal').then(
        res => {
          this.tabData = res.body
          for (let key in res.body) {
            this.tabData[key] = res.body[key].sort(x => -x.status)
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
        return `<p><h3 class="tim-note">${day}</h3>${str.join(' / ')}</p>`
      }
    }
  }
</script>

<style lang="scss">
</style>
