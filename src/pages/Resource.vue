<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <a href="/resource/feed.xml" target="_blank"> Rss Feed </a>
      </v-flex>
      <v-flex xs12>
        <a href="/resource/calendar.ics" target="_blank">
          ICS Calendar for mobile phone
        </a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Resource',
  data() {
    return {};
  },
};
</script>

<style scoped></style>
