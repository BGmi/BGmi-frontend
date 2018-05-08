<template>
  <v-list-tile :to=to :href=href exact='exact'>
    <!-- <router-link tag="li" v-if="to" :to="to" active-class="active" exact="exact"> -->
    <v-list-tile-action>
      <v-icon>{{icon}}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{title}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  export default {
    props: {
      icon: String,
      title: String,
      href: String,
      to: String
    }
  }
</script>
<style lang="scss">
// a {
//   text-decoration: none !important;
// }
</style>
