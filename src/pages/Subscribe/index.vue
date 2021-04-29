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
              v-bind="bangumi"
              :status.sync="bangumi.status"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import BangumiCard from './bangumiCard';

export default {
  name: 'Subscribe',
  components: {
    BangumiCard,
  },
  data() {
    return {
      bangumiCalendar: false,
      weekKey: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Unknown'],
      latestBgmiVersion: '',
      bgmiVersion: '',
    };
  },
  mounted() {
    this.$store.dispatch('getCalendar', (cal) => {
      this.bangumiCalendar = cal;
      this.latestBgmiVersion = this.$store.state.latestBgmiVersion;
      this.bgmiVersion = this.$store.state.bgmiVersion;
      this.$nextTick(() => {
        if (this.bgmiVersion < this.latestBgmiVersion) {
          this.$notify({
            type: 'danger',
            //              icon: 'notifications',
            text: `Please upgrade your BGmi to ${this.latestBgmiVersion}`,
            placement: {
              from: 'top',
              align: 'center',
            },
          });
        }
      });
    });
  },
};
</script>
<style scoped></style>
