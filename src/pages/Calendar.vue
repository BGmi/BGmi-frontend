<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout justify-center>
      <v-flex>
        <v-card
          md-theme="white"
          style="overflow: hidden"
        >
          <div
            v-if="!tabData"
            class="col-md-2 col-md-offset-5"
          />
          <template
            v-for="day in weekday"
            v-else
          >
            <!-- eslint-disable-next-line vue/valid-v-for vue/require-v-for-key -->
            <v-card-title>
              <h3 class="week">
                {{ day }}
              </h3>
            </v-card-title>
            <!-- eslint-disable-next-line vue/valid-v-for -->
            <v-card-text>
              <template
                v-for="(bangumi, index) of tabData[day]"
              >
                <!-- eslint-disable-next-line vue/require-v-for-key -->
                <b v-if="bangumi.status">
                  {{ bangumi.name }}
                </b>
                <!-- fake element `template` can't have :key -->
                <template v-else>
                  {{ bangumi.name }}
                </template>
                <template v-if="index !== tabData[day].length - 1">
                  /
                </template>
              </template>
            </v-card-text>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
/* eslint-disable camelcase */
import Vue from 'vue';

interface CalendarItem {
  cover: string;
  episode: null;
  has_data_source: number;
  id: number;
  name: string;
  status: null | number;
  subject_id: number;
  update_time: string;
}

export default Vue.extend({
  name: 'Calendar',
  components: {},
  data() {
    return {
      tabData: {},
      weekday: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    };
  },
  created() {
    this.$store.dispatch('getCalendar', (cal: Record<string, CalendarItem[]>) => {
      this.tabData = cal;
    });
  },
  methods: {},
});
</script>

<style scoped>
.v-card div.v-card__text {
  color: black;
  font-size: 20px;
}

.week {
  text-transform: capitalize;
  font-family: Roboto, 'Noto Sans', Noto, sans-serif;
}
</style>
