<template>
  <v-navigation-drawer v-model=visible fixed app>
    <v-list>
      <v-list-tile to=/>
      <v-list-tile-action>
        <v-avatar>
          <img src="../../../static/images/logo144.jpg">
        </v-avatar>
        <!-- <router-link tag="li" v-if="to" :to="to" active-class="active" exact="exact"> -->
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>BGmi</v-list-tile-title>
      </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
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

<style>

</style>
