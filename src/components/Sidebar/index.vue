<template>
  <v-navigation-drawer app v-model="visible">
    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-avatar>
            <img alt="logo" :src="`${publicPath}static/logo144.jpg`" />
          </v-avatar>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>BGmi</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <item :icon="icons.mdiLibraryVideo" title="Bangumi" to="/" />
      <!-- <item title="Old Bangumi" icon="collections" to="/old"></item> -->
      <item href="/bangumi/" :icon="icons.mdiFolder" title="Bangumi Files" />
      <item :icon="icons.mdiCalendar" title="Calendar" to="/calendar" />
      <item :icon="icons.mdiRss" title="Resource" to="/resource" />
      <v-divider></v-divider>
      <item
        :icon="icons.mdiYoutubeSubscription"
        title="Subscribe"
        to="/subscribe"
      />
      <v-divider></v-divider>
      <item :icon="icons.mdiInformation" title="About" to="/about" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiFolder,
  mdiCalendar,
  mdiRss,
  mdiYoutubeSubscription,
  mdiInformation,
  mdiOpenInNew,
  mdiPlayBoxMultiple,
} from '@mdi/js';

import Item from './item';

export default {
  name: 'sidebar',
  data() {
    return {
      icons: {
        mdiCalendar,
        mdiRss,
        mdiYoutubeSubscription,
        mdiInformation,
        mdiOpenInNew,
        mdiLibraryVideo: mdiPlayBoxMultiple,
        mdiFolder,
      },
      visible: this.value,
      publicPath: process.env.BASE_URL,
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  components: {
    Item,
  },
  watch: {
    visible(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.visible = val;
    },
  },
};
</script>

<style></style>
