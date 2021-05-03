<template>
  <v-container
    fill-height
    grid-list-lg
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="(bg, key) in bangumi"
        :key="key"
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <div
            style="position: absolute; z-index: 1; width: 100%"
            class="red accent-1 white--text"
          >
            <center><span v-if="bg.status === 2">NEW</span></center>
          </div>
          <v-img
            :src="`.${bg.cover}`"
            height="200px"
          />
          <v-card-title>
            <p class="headline">
              {{ bg.bangumi_name }}
            </p>
          </v-card-title>
          <v-card-subtitle>
            <span v-if="bg.episode > 0">最新: 第{{ bg.episode }}集</span>
            <span v-else>暂无更新</span>
            <span
              v-if="bg.episode > 0 &&parseInt(Object.keys(bg.player).reverse()[0]) !== bg.episode"
            >，正在下载</span>
          </v-card-subtitle>
          <v-card-actions>
            <div class="mx-auto">
              <v-btn
                v-for="value in Object.keys(bg.player).reverse().slice(0, 1)"
                :key="value"
                style="margin-right: 8px"
                :class="{ gray: hasWatched(bg.bangumi_name, value) }"
                @click="
                  $router.push(
                    `/player/${category}/${normalizePath(
                      bg.bangumi_name
                    )}/${value}`
                  )
                "
              >
                第{{ value }}集
              </v-btn>
              <v-menu
                v-if="!isEmpty(bg.player)"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-if="Object.keys(bg.player).length > 1"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    ...
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(value, index) in Object.keys(bg.player)
                      .reverse()
                      .slice(1)"
                    :key="index"
                    @click="
                      $router.push(
                        `/player/${category}/${normalizePath(
                          bg.bangumi_name
                        )}/${value}`
                      )
                    "
                  >
                    <v-list-item-title>第{{ value }}集</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn
                v-else
                disabled
              >
                暂无剧集
              </v-btn>
            </div>
          </v-card-actions>
          <br>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import isEmpty from 'lodash/isEmpty';

import { hasWatched, normalizePath } from '@/utils';

export default {
  name: 'Bangumi',
  components: {},
  props: {
    category: {
      default: 'index',
      type: String,
      required: true,
    },
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

<style scoped lang="less">
.headline:not(:hover) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#inspire.application .gray.btn {
  color: lightgray;
}
</style>
