<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-content">
              <div class="tim-typo">
                <h2>关于</h2>
              </div>

              <div class="tim-typo">
                <h3>BGmi</h3>
                <p>version: {{$store.state.bgmiVersion}}</p>

                <p> BGmi HTTP Service 基于 <a href="https://github.com/BGmi/BGmi"
                                            target="_blank">BGmi</a> 构建。<br>
                </p>
                其中，BGmi 的数据来源于
                <a href="https://bangumi.moe" target="_blank">萌番组<sup>大好きだよ</sup></a>
                或者
                <a href="https://mikanani.me/" target="_blank">蜜柑计划 - Mikan Project</a>。
              </div>

              <div class="tim-typo">
                <h3>BGmi-frontend</h3>
                <p>version: {{version}}</p>
              </div>


              <div class="tim-typo">
                <h3>致谢</h3>
                <ul>
                  <li>
                    <a href="https://bangumi.moe" target="_blank">萌番组</a><br>
                  </li>
                  <li>
                    <a href="https://mikanani.me/"
                       target="_blank">蜜柑计划</a>
                  </li>
                  <li>
                    <a href="https://aria2.github.io"
                       target="_blank">aria2</a>
                  </li>
                  <li>
                    <a href="https://github.com/DIYgod/DPlayer"
                       target="_blank">DPlayer</a>
                  </li>
                </ul>
              </div>

              <div class="tim-typo">
                <h3>BGmi Creator</h3>
                <a href="https://github.com/RicterZ" target="_blank">github/RicterZ</a>
              </div>

              <div class="tim-typo">
                <h3>Contributors</h3>
                <a href="https://github.com/BGmi/BGmi/graphs/contributors">github/BGmi/BGmi/contributors</a>
              </div>

              <div class="tim-typo">
                <h3>Bug Report</h3>
                <ul>
                  <li>
                    <a href="https://github.com/BGmi/BGmi/issues">BGmi Bug Report</a>

                  </li>
                  <li>
                    <a href="https://github.com/BGmi/BGmi-frontend/issues">BGmi-frontend Bug Report</a>

                  </li>
                  <li>
                    <a href="https://github.com/BGmi/BGmi/issues">Don't know which one</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'about',
    data () {
      return {
        version: process.env.VERSION
      }
    }
  }
</script>
<style lang="scss">

</style>
