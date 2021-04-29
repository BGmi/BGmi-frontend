<template>
  <v-tabs
    background-color="indigo"
    dark
    fixed-tabs
  >
    <v-tab
      v-for="key in weekKey"
      :id="key"
      :key="`tab-header-${key}`"
      ripple
    >
      {{ key }}
    </v-tab>
    <v-tab-item
      v-for="key in weekKey"
      :key="`tab-item-${key}`"
    >
      <v-container
        fill-height
        grid-list-lg
        text-xs-center
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            v-for="(bangumi, subKey) in bangumiCalendar[key.toLowerCase()]"
            :key="subKey"
            xs12
            sm6
            md4
            lg3
          >
            <bangumi-card
              :id="bangumi.id"
              :name="bangumi.name"
              :cover="bangumi.cover"
              :episode="bangumi.episode"
              :status.sync="bangumi.status"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import Vue from 'vue';

import BangumiCard from './bangumi_card.vue';
import { Calendar, Bangumi } from '@/typings/calendar';

export default Vue.extend({
  name: 'Subscribe',
  components: {
    BangumiCard,
  },
  data() {
    return {
      bangumiCalendar: null as (Calendar | null),
      weekKey: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Unknown'],
      latestBgmiVersion: '',
      bgmiVersion: '',
    };
  },
  mounted() {
    this.$store.dispatch('getCalendar', (cal: Calendar) => {
      for (const e of Object.values(cal)) {
        e.sort((a: Bangumi) => { return !a.status ? 1 : -1; });
      }
      this.bangumiCalendar = cal;
      this.latestBgmiVersion = this.$store.state.latestBgmiVersion;
      this.bgmiVersion = this.$store.state.bgmiVersion;
      this.$nextTick(() => {
        if (this.bgmiVersion < this.latestBgmiVersion) {
          this.$notify({
            type: 'danger',
            text: `Please upgrade your BGmi to ${this.latestBgmiVersion}`,
          });
        }
      });
    });
  },
});
</script>
<style scoped></style>
