<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-content">

              <!--<div class="container">-->
              <div class="row">
                <div class="col-md-12">
                  <div class="row" v-if="!configs">
                    <div class="col-md-2 col-md-offset-5">
                      <md-spinner class="tim-note" md-indeterminate></md-spinner>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" v-for="(config, key) in configs" :key="key">
                    <div class="row">
                      <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <md-input-container>
                          <label>{{config.name}}</label>
                          <md-input :disabled="!configs[key].writable" v-model="config.value"></md-input>
                        </md-input-container>
                      </div>
                      <div class="row">

                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                          <md-checkbox id="my-test2" v-if="configs[key].writable" :value="config.value===originConfigs[key].value" :disabled="config.value===originConfigs[key].value" name="my-test2" @input="submit(config.name, config.value)" class="md-primary">
                          </md-checkbox>
                        </div>
                      </div>
                    </div>
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
    name: 'config',
    components: {},
    mounted () {
      this.$http.get(`config`).then(
        res => {
          this.configs = res.body.data
          this.originConfigs = JSON.parse(JSON.stringify(this.configs))
        },
        res => {
        })
      // get all config and writable config
    },

    data () {
      return {
        configs: false,
        originConfigs: []
      }
    },
    methods: {
      submit (name, value) {
        const vm = this
        this.$http.post(`config`, {name, value}).then(
          res => {
            vm.configs = res.body.data
            vm.originConfigs = JSON.parse(JSON.stringify(vm.configs))
            this.$notifications.notify({
              type: res.body.status,
              message: res.body.message,
              placement: {
                from: 'top',
                align: 'right'
              }
            })
          },
          res => {
            this.configs = res.body.data
            this.$notifications.notify({
              type: 'danger',
              message: res.body.message,
              placement: {
                from: 'top',
                align: 'right'
              }
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
