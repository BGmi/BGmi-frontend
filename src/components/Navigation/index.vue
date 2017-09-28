<template>

  <md-whiteframe md-tag="md-toolbar" class="top-header" md-elevation="10">
    <h2 class="md-title" style="flex: 1">{{$route.name}}</h2>
    <md-button class="md-icon-button hidden-lg hidden-md" type="button" data-toggle="collapse"
               @click="toggleSideBar">
      <md-icon>menu</md-icon>
    </md-button>

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
<style lang="scss">

</style>
