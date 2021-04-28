<template>
  <v-list-item
    :to="to"
    :href="href"
    exact="exact"
  >
    <!-- <router-link tag="li" v-if="to" :to="to" active-class="active" exact="exact"> -->
    <v-list-item-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item>{{ title }}</v-list-item>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    icon: { default: '', type: String },
    title: { default: '', type: String },
    href: { default: '', type: String },
    to: { default: '', type: String },
  },
});
</script>
<style></style>
