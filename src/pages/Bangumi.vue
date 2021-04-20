<template>
  <v-container fill-height grid-list-lg>
    <v-layout row wrap>
      <v-flex v-for="(bg, key) in bangumi" :key="key" xs12 sm6 md4 lg3>
        <v-card md-theme="white" style="overflow: hidden">
          <v-img :src="`.${bg.cover}`" height="200px">
            <!-- <div class="bangumi-cover" :style="{backgroundImage:`url('.${bg.cover}')`} "></div> -->
          </v-img>

          <v-card-title>
            <div>
              <div class="headline">
                {{ bg.bangumi_name + (bg.status === 2 ? '(new)' : '') }}
              </div>
              <span class="grey--text">latest:{{ bg.episode }}</span>
            </div>
          </v-card-title>

          <v-card-actions class="button-container">
            <div v-if="!isEmpty(bg.player)">
              <v-btn
                v-for="value in Object.keys(bg.player).reverse().slice(0, 3)"
                :key="value"
                flat
                :class="{ gray: hasWatched(bg.bangumi_name, value) }"
                @click="
                  $router.push(
                    `/player/${category}/${normalizePath(
                      bg.bangumi_name
                    )}/${value}`
                  )
                "
              >
                {{ value }}
              </v-btn>
            </div>
          </v-card-actions>
          <br />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { hasWatched, normalizePath } from '../utils';
import isEmpty from 'lodash/isEmpty';

export default {
  name: 'Bangumi',
  components: {},
  props: {
    category: { default: 'index', type: String, required: true },
  },

  data() {
    return {
      bangumi: [],
    };
  },
  watch: {
    category() {
      this.initData();
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    hasWatched,
    isEmpty,
    normalizePath,
    initData() {
      this.$store.dispatch('getBangumi', {
        category: this.category,
        cb: (bangumi) => {
          this.bangumi = bangumi;
        },
      });
    },
  },
};
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
