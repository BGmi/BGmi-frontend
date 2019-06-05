<template>
  <v-navigation-drawer app fixed v-model=visible>
    <v-list>
      <v-list-tile to='/'>
        <v-list-tile-action>
          <v-avatar>
            <img alt="logo" src="../../assets/logo144.jpg">
          </v-avatar>
          <!-- <router-link tag="li" v-if="to" :to="to" active-class="active" exact="exact"> -->
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>BGmi</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <item icon="video_library" title="Bangumi" to="/"></item>
      <!-- <item title="Old Bangumi" icon="collections" to="/old"></item> -->
      <item href="/bangumi/" icon="folder" title="Bangumi Files"></item>
      <item icon="event" title="Calendar" to="/calendar"></item>
      <item icon="rss_feed" title="Resource" to="/resource"></item>
      <v-divider></v-divider>
      <item icon="subscriptions" title="Subscribe" to="/subscribe"/>
      <v-divider></v-divider>
      <item icon="info" title="About" to="/about"/>
      <item href="https://github.com/BGmi/BGmi" title="Based On BGmi"/>
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
  methods: {},
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

<style>

</style>
