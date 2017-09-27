<template>
  <md-whiteframe md-elevation="10">
    <!--<md-toolbar>-->
    <!--<md-button :to="$route.path" style="flex: 1">-->
    <!--<b>-->
    <!--{{$route.name}}-->
    <!--</b>-->

    <!--</md-button>-->
    <!--&lt;!&ndash;<router-link >&ndash;&gt;-->
    <!--&lt;!&ndash;<h3 class="md-title">&ndash;&gt;-->
    <!--&lt;!&ndash;&ndash;&gt;-->
    <!--&lt;!&ndash;</h3>&ndash;&gt;-->
    <!--&lt;!&ndash;</router-link>&ndash;&gt;-->

    <!--<button class="navbar-toggle" type="button" data-toggle="collapse" @click="toggleSideBar">-->
    <!--<span class="sr-only">Toggle navigation</span>-->
    <!--<span class="icon-bar"></span>-->
    <!--<span class="icon-bar"></span>-->
    <!--<span class="icon-bar"></span>-->
    <!--</button>-->
    <!--</md-toolbar>-->
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
  //  import NavbarRight from './navbar-right'

  export default {
    components: {
      //   NavbarRight
    },
    methods: {
      toggleSideBar () {
        this.$emit('toggleSideBar')
      }
    }
  }
</script>
<style scoped lang="scss">
  /*nav {*/
  /*background: black;*/
  /*}*/
</style>
