<template>
  <md-whiteframe md-tag="div" class="sidebar" data-color="blue">
    <a href="/" target="_self">
      <div class="logo">
        <img class="center-block img-circle" src="/static/images/logo.jpg" alt="/">
      </div>
    </a>
    <div class="sidebar-wrapper">
      <ul class="nav">
        <item title="Bangumi" icon="video_library" to="/"></item>
        <item title="Calendar" icon="event" to="/calendar"></item>
        <item title="Subscribe" icon="subscriptions" to="/subscribe"></item>
        <!--<item title="Search" icon="search" to="/search"></item>-->
        <!--<item title="Config" icon="settings" to="/config"></item>-->
        <li>
          <hr>
        </li>
        <!--<item title="Feed" icon="rss_feed" href="/resource/feed.xml"></item>-->
        <item title="Resource" icon="rss_feed" to="/resource"></item>
        <li>
          <hr>
        </li>
        <item title="About" icon="help_outline" to="/about"></item>
        <!--<item title="Bug Report" icon="report" href="https://github.com/BGmi/BGmi/issues"></item>-->
        <item title="Based On BGmi" href="https://github.com/BGmi/BGmi"></item>
      </ul>
    </div>
    <div class="sidebar-background"></div>
  </md-whiteframe>
</template>
<script>
  import Item from './item'

  export default {
    name: 'sidebar',
    props: {
      open: Boolean
    },
    methods: {},
    components: {
      Item
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .sidebar-background {
    background-image: url('~images/sidebar-2.jpg')
  }

  a {
    text-decoration: none
  }
</style>
