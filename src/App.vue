<template>
  <div id="app">

    <div class="wrapper" :class="{ 'nav-open' : navOpened }">
      <sidebar :open="navOpened"></sidebar>
      <md-notifications></md-notifications>
      <div class="main-panel">
        <navigation @toggleSideBar="toggleSideBar"></navigation>
        <router-view></router-view>
        <!-- <md-footer></md-footer> -->
        <div class="close-layer" v-if="navOpened" @click="onCloseLayerClick"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation'
  import MdFooter from '@/components/Footer'
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'app',
    components: {
      Navigation,
      MdFooter,
      Sidebar
    },

    data () {
      return {
        prompt: {
          title: 'What\'s your name?',
          ok: 'Done',
          cancel: 'Cancel',
          id: 'name',
          name: 'name',
          placeholder: 'Type your name...',
          maxlength: 30,
          value: ''
        },
        token: '',
        sidebarToggled: false
      }
    },

    computed: {
      navOpened () {
        return this.sidebarToggled
      }
    },

    mounted () {
      this.initMaterial()
    },

    updated () {
      this.initMaterial()
    },

//    watch: {
//      '$route' (to, from) {
//        if (to.meta.requiresAuth) {
//          if (!this.$store.state.isLogin) {
//            this.$refs.askToken.open()
//          }
//        }
//      }
//    },

    methods: {
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.$refs[ref].close()
        alert(this.token)
      },
      onOpen () {
        console.log('Opened')
      },
      onClose (type) {
        console.log('Closed', type)
      },
      initMaterial () {
        $.material.init() // eslint-disable-line
      },
      toggleSideBar () {
        this.sidebarToggled = !this.sidebarToggled
      },
      onCloseLayerClick () {
        this.toggleSideBar()
      }
    }
  }
</script>

<style lang="scss">
  div::-webkit-scrollbar {
    display: none
  }

  @import "./assets/sass/md/_variables.scss";

  .table {
    thead {
      th {
        font-weight: $headings-font-weight;
      }
    }
  }

  @media (min-width: 992px) {
    .typo-line {
      padding-left: 140px;
      margin-bottom: 40px;
      position: relative;
      .category {
        transform: translateY(-50%);
        top: 50%;
        left: 0px;
        position: absolute;
      }
    }
  }

  .places-buttons .btn {
    margin-bottom: 30px
  }

  .space-70 {
    height: 70px;
    display: block;
  }

  .sidebar .nav > li.active-pro {
    /*position: absolute;*/
    width: 100%;
    /*bottom: 25px;*/
  }

  .tim-row {
    margin-bottom: 20px;
    padding-top: 50px;
    h3 {
      margin-top: 0;
    }
  }

  .tim-typo {
    padding-left: 25%;
    margin-bottom: 40px;
    position: relative;
    .tim-note {
      bottom: 10px;
      color: #c0c1c2;
      display: block;
      font-weight: 400;
      font-size: 13px;
      line-height: 13px;
      left: 0;
      margin-left: 20px;
      position: absolute;
      width: 260px;
    }
  }
</style>

