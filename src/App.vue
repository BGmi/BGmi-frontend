<template>
  <v-app id="inspire">
    <sidebar v-model='drawer' />
    <v-toolbar :class="{'elevation-0': $route.name==='Subscribe'}" color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>BGmi - {{$route.name}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <!-- <transition> -->
        <router-view></router-view>
      <!-- </transition> -->
    </v-content>
  </v-app>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'app',
    components: {
      Navigation,
      Sidebar
    },

    data () {
      return {
        drawer: null,
        token: '',
        sidebarToggled: false
      }
    },

    computed: {
      navOpened () {
        return this.sidebarToggled
      }
    },
    methods: {
      toggleSideBar () {
        this.sidebarToggled = !this.sidebarToggled
      },
      onCloseLayerClick () {
        this.toggleSideBar()
      }
    },
    watch: { }
  }
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>

