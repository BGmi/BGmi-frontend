<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-content">
              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                  <div class="tim-typo">
                    <a href="/resource/feed.xml">
                      <md-button>
                        <h5>Rss Feed</h5>
                      </md-button>
                    </a>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                  <div class="tim-typo">
                    <a href="/resource/calendar.ics">
                      <md-button>
                        <h5>ICS Calendar for mobile phone</h5>
                      </md-button>
                    </a>
                  </div>
                </div>
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
    name: 'resource',
    components: {},
    created () { },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
