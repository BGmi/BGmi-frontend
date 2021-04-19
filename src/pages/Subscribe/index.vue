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
            <bangumi-card :bangumi.sync="bangumi" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
  </v-tabs>
  <!--
  <div>
    <div class="row" v-if="!bangumiCalendar">
      <div class="col-md-2 col-md-offset-5">
        <md-spinner class="tim-note" md-indeterminate></md-spinner>
      </div>
    </div>
    <md-tabs v-else md-fixed>
      <md-tab v-for="key in weekKey " :key="key" :id="key" :md-label="key">
        <md-layout :md-gutter="8">
          <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="33" md-flex-large="25"
                     md-flex-xlarge="20"
                     v-for="(bangumi, subKey) in bangumiCalendar[key.toLowerCase()]"
                     :key="subKey">
            <bangumi-card :bangumi.sync="bangumi"></bangumi-card>
          </md-layout>
        </md-layout>
      </md-tab>
    </md-tabs>
  </div> -->
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
      weekKey: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
