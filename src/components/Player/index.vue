<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6">
      </div>

    </div>
    <div class="row">

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
  export default {
    name: 'dashboard',
    components: {},

    data () {
      return {}
    },

    methods: {
      onTabClick (tab) {
        console.log(`onTabClick: `, tab)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
