<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6">
        <md-stats-widget icon="content_copy" backgroundColor="orange" title="Used Space">
          <div slot="content">49/50
            <small>GB</small>
          </div>
          <div slot="footer"><i class="material-icons text-danger">warning</i>
            <router-link to="Dashboard">Get More Space...</router-link>
          </div>
        </md-stats-widget>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <md-stats-widget icon="warning" backgroundColor="green" title="Revenue">
          <div slot="content">$34,245</div>
          <div slot="footer"><i class="material-icons">date_range</i> Last 24 Hours</div>
        </md-stats-widget>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <md-stats-widget icon="info_outline" backgroundColor="red" title="Fixed Issues">
          <div slot="content">75</div>
          <div slot="footer"><i class="material-icons">local_offer</i> Tracked from Github</div>
        </md-stats-widget>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <md-stats-widget faIcon="fa-twitter" backgroundColor="blue" title="Followers">
          <div slot="content">+245</div>
          <div slot="footer"><i class="material-icons">update</i> Just Updated</div>
        </md-stats-widget>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <md-chart-widget type="Line" backgroundColor="green" title="Daily Sales" id="dailySalesChart"
                         :options="dailySalesChart.options" :data="dailySalesChart.data">
          <div slot="subTitle"><span class="text-success"><i class="fa fa-long-arrow-up"></i> 55%</span> increase in
            today sales.
          </div>
          <div slot="footer"><i class="material-icons">access_time</i> updated 4 minutes ago</div>
        </md-chart-widget>
      </div>
      <div class="col-md-4">
        <md-chart-widget type="Bar" backgroundColor="orange" title="Email Subscriptions" id="emailsSubscriptionChart"
                         :options="emailsSubscriptionChart.options" :data="emailsSubscriptionChart.data">
          <div slot="subTitle">Last Campaign Performance</div>
          <div slot="footer"><i class="material-icons">access_time</i> campaign sent 2 days ago</div>
        </md-chart-widget>
      </div>
      <div class="col-md-4">
        <md-chart-widget type="Line" backgroundColor="red" title="Completed Tasks" id="completedTasksChart"
                         :options="completedTasksChart.options" :data="completedTasksChart.data">
          <div slot="subTitle">Last Campaign Performance</div>
          <div slot="footer"><i class="material-icons">access_time</i> campaign sent 2 days ago</div>
        </md-chart-widget>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
      </div>
      <div class="col-lg-6 col-md-12">
        <md-card title="Employees Stats" category="New Employees on 15th September, 2016" backgroundColor="orange">
        </md-card>
      </div>
    </div>
  </div>

</template>

<script>
  import MdNavTabs from '@/core/components/mdTab/nav-tabs'
  import MdTabContent from '@/core/components/mdTab/tab-content'

  export default {
    name: 'dashboard',
    components: {
      MdTabContent,
      MdNavTabs
    },

    data () {
      const lineSmooth = this.$Chartist.Interpolation.cardinal({tension: 0})
      return {
        tabs: [
          {id: 'home', name: 'Home', icon: 'bug_report', active: true},
          {id: 'website', name: 'Website', icon: 'code', active: false},
          {id: 'server', name: 'Server', icon: 'cloud', active: false}
        ],
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38]
            ]
          },
          options: {
            lineSmooth: lineSmooth,
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
          }
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

            ]
          },
          options: {
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
          }
        },
        completedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
            ]
          },
          options: {
            lineSmooth: lineSmooth,
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
          }
        }
      }
    },

    methods: {
      onTabClick (tab) {
        console.log(`onTabClick: `, tab)
        // console.log(`tabs: `, this.tabs)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
