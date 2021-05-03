<template>
  <v-app id="inspire">
    <sidebar v-model="drawer" />
    <v-app-bar
      app
      :class="{ 'elevation-0': $route.name === 'Subscribe' }"
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>BGmi - {{ $route.name }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <notifications />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar/index.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },

  data() {
    return {
      drawer: null,
      token: '',
      sidebarToggled: false,
    };
  },

  computed: {
    navOpened() {
      return this.sidebarToggled;
    },
  },
  watch: {},
  methods: {
    toggleSideBar() {
      this.sidebarToggled = !this.sidebarToggled;
    },
    onCloseLayerClick() {
      this.toggleSideBar();
    },
  },
};
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
  background: #44a4fc !important;
  border-left: 5px solid #187fe7 !important;
}

#inspire .vue-notification.warn {
  background: #ffb648 !important;
  border-left-color: #f48a06 !important;
}

#inspire .vue-notification.error {
  background: #e54d42 !important;
  border-left-color: #b82e24 !important;
}

#inspire .vue-notification.success {
  background: #68cd86 !important;
  border-left-color: #42a85f !important;
}
</style>
