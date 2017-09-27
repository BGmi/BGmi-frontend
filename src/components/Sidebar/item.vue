<template>
  <router-link tag="li" v-if="to" :to="to" active-class="active" exact="exact">
    <a :href="to">
      <i class="material-icons text-gray">{{icon}}</i>
      <p>{{title}}</p>
    </a>
  </router-link>
  <li v-else>
    <a :href="href" target="_blank">
      <i class="material-icons text-gray">{{icon}}</i>
      <p>{{title}}</p>
    </a>
  </li>
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
  a {
    text-decoration: none !important;
  }
</style>
