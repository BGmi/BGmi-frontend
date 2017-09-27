<template>
  <md-whiteframe md-elevation="10">
    <md-toolbar>

      <h2 class="md-title" style="flex: 1">{{$route.name}}</h2>
      <md-button class="md-icon-button navbar-toggle hidden-lg hidden-md" type="button" data-toggle="collapse"
                 @click="toggleSideBar">
        <md-icon>menu</md-icon>
      </md-button>
    </md-toolbar>

  </md-whiteframe>
</template>

<script>
  export default {
    components: {},
    methods: {
      toggleSideBar () {
        this.$emit('toggleSideBar')
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
