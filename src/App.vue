<template>
  <div id="app">
    <div class="wrapper" :class="{ 'nav-open' : navOpened }">
      <sidebar :open="navOpened"></sidebar>
      <md-notifications></md-notifications>
      <div class="main-panel">
        <navigation @toggleSideBar="toggleSideBar"></navigation>
        <router-view></router-view>
        <div class="close-layer" v-if="navOpened" @click="onCloseLayerClick"></div>
      </div>
    </div>
  </div>
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
    watch: {
      '$route' () {
        if (this.sidebarToggled) {
          this.toggleSideBar()
        }
      }
    }
  }
</script>

<style lang="scss">

  ::-webkit-scrollbar {
    display: none;
  }

</style>

