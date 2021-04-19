<template>
  <v-container>
    <v-row>
      <v-col xs="10">
        <div class="display-1">BGmi:</div>
        <p class="subheading">version: {{ $store.state.bgmiVersion }}</p>
        <p>
          BGmi HTTP Service 基于
          <a href="https://github.com/BGmi/BGmi" target="_blank">BGmi</a>
          构建。<br />
        </p>
        其中，BGmi 的数据来源于
        <a href="https://bangumi.moe" target="_blank"
          >萌番组 <sup>大好きだよ</sup> </a
        >/
        <a href="https://mikanani.me/" target="_blank"
          >蜜柑计划 - Mikan Project</a
        >/
        <a href="http://share.dmhy.org/" target="_blank">動漫花園資源網</a>

        <br />
        <br />
        <div class="display-1">BGmi-frontend:</div>
        <p class="subheading">version: {{ version }}</p>

        <h3>致谢</h3>
        <ul>
          <li>
            <a href="https://bangumi.moe" target="_blank">萌番组</a><br />
          </li>
          <li>
            <a href="https://mikanani.me/" target="_blank">蜜柑计划</a>
          </li>
          <li>
            <a href="https://aria2.github.io" target="_blank">aria2</a>
          </li>
          <li>
            <a href="https://github.com/DIYgod/DPlayer" target="_blank"
              >DPlayer</a
            >
          </li>
        </ul>
        <!-- <hr> -->
        <br />
        <h3>
          BGmi Creator:
          <a href="https://github.com/RicterZ" target="_blank"
            >github/RicterZ
          </a>
        </h3>
        <h3>
          Contributors:
          <a href="https://github.com/BGmi/BGmi/graphs/contributors"
            >github/BGmi/BGmi/contributors</a
          >
        </h3>
        <!-- <hr> -->
        <br />
        <h3>Bug Report</h3>
        <ul>
          <li>
            <a href="https://github.com/BGmi/BGmi/issues">BGmi Bug Report</a>
          </li>
          <li>
            <a href="https://github.com/BGmi/BGmi-frontend/issues"
              >BGmi-frontend Bug Report</a
            >
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'about',
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
    };
  },
});
</script>
<style></style>
