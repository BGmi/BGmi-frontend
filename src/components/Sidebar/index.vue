<template>
  <v-navigation-drawer v-model=visible fixed app>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-avatar>
            <img src="../../../static/images/logo144.jpg">
          </v-avatar>
        </v-list-tile-content>
      </v-list-tile>
      <item title="Bangumi" icon="video_library" to="/"></item>
      <!-- <item title="Old Bangumi" icon="collections" to="/old"></item> -->
      <item title="Bangumi Files" icon="folder" href="/bangumi/"></item>
      <item title="Calendar" icon="event" to="/calendar"></item>
      <item title="Resource" icon="rss_feed" to="/resource"></item>
      <v-divider></v-divider>
      <item title="Subscribe" icon="subscriptions" to="/subscribe" />
      <v-divider></v-divider>
      <item title="About" icon="info" to="/about" />
      <item title="Based On BGmi" href="https://github.com/BGmi/BGmi" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import Item from './item'

  export default {
    name: 'sidebar',
    data () {
      return {
        visible: this.value
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
    },
    components: {
      Item
    },
    watch: {
      visible (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.visible = val
      }
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">

</style>
