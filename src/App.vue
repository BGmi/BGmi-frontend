<template>
  <v-app id="inspire">
    <sidebar v-model='drawer' />
    <v-toolbar :class="{'elevation-0': $route.name==='Subscribe'}" color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>BGmi - {{ $route.name }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <notifications/>
      <!-- <transition> -->
      <router-view/>
      <!-- </transition> -->
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'App',
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

#inspire .vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 16px;

  color: #ffffff !important;
  background: #44A4FC !important;
  border-left: 5px solid #187FE7 !important;
}

#inspire .vue-notification.warn {
  background: #ffb648 !important;
  border-left-color: #f48a06 !important;
}

#inspire .vue-notification.error {
  background: #E54D42 !important;
  border-left-color: #B82E24 !important;
}

#inspire .vue-notification.success {
  background: #68CD86 !important;
  border-left-color: #42A85F !important;
}

</style>
