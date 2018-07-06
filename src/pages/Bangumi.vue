<template>
  <v-container fill-height grid-list-lg text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(bg, key) in bangumi" :key="key" xs12 sm6 md4 lg3>
        <v-card md-theme="white" style="overflow: hidden">
          <v-card-media :src='`.${bg.cover}`' height="200px">
            <!-- <div class="bangumi-cover" :style="{backgroundImage:`url('.${bg.cover}')`} "></div> -->
          </v-card-media>

          <v-card-title>
            <div>
              <div class="headline">{{bg.bangumi_name + (bg.status === 2 ? '(new)' : '')}}</div>
              <span class="grey--text">latest:{{bg.episode}}</span>
            </div>
          </v-card-title>

          <v-card-actions class="button-container">
            <v-btn flat v-if="!isEmpty(bg.player)"
                   @click="$router.push(`/player/${category}/${normalizePath(bg.bangumi_name)}/${value}`)"
                   v-for="value in Object.keys(bg.player).reverse().slice(0, 3)"
                   v-bind:class="{gray:hasWatched(bg.bangumi_name,value)}" :key="value"> {{value}}
            </v-btn>
          </v-card-actions>
          <br>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { hasWatched, isEmpty, normalizePath } from '../utils'

export default {
  name: 'bangumi',
  components: {},

  data () {
    return {
      bangumi: []
    }
  },
  props: {
    category: ''
  },
  methods: {
    hasWatched,
    isEmpty,
    normalizePath,
    initData () {
      this.$store.dispatch('getBangumi', {
        category: this.category,
        cb: (bangumi) => {
          this.bangumi = bangumi
        }
      })
    }
  },
  watch: {
    category () {
      this.initData()
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>
  .headline {
    white-space: nowrap;
  }

  .button-container {
    height: 36px;
    /* white-space: nowrap; */
  }

  #inspire.application .gray.btn {
    color: lightgray;
  }
</style>
