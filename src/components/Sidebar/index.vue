<template>
  <div class="sidebar" data-color="blue">
    <div class="logo">
      <a href="/" target="_self">
        <img class="center-block img-circle" src="/static/images/logo144.jpg" alt="/">
      </a>
    </div>
    <div class="sidebar-wrapper">
      <ul class="nav">
        <item title="Bangumi" icon="video_library" to="/"></item>
        <item title="Old Bangumi" icon="collections" to="/old"></item>
        <item title="Bangumi Files" icon="folder" href="/bangumi/"></item>
        <item title="Calendar" icon="event" to="/calendar"></item>
        <item title="Resource" icon="rss_feed" to="/resource"></item>
        <li>
          <hr>
        </li>
        <item title="Subscribe" icon="subscriptions" to="/subscribe"></item>
        <li>
          <hr>
        </li>
        <item title="About" icon="info" to="/about"></item>
        <item title="Based On BGmi" href="https://github.com/BGmi/BGmi"></item>
      </ul>
    </div>
    <div class="sidebar-background"></div>
  </div>
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
    background-image: url('/static/images/sidebar-2.jpg')
  }

  a {
    text-decoration: none
  }
</style>
