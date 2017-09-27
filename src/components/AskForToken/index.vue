<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header" data-background-color="purple"><h4 class="title">Input Your Token</h4>
          </div>
          <div class="card-content">
            <form>
              <div class="row">
                <div class="container">
                  <div class="col-md-12">

                    <md-input-container>
                      <label>bgmi-token</label>
                      <md-input v-model="token"></md-input>
                    </md-input-container>
                  </div>
                </div>

                <div class="row">
                  <div style="align-content: flex-end" class="col-md-2 col-md-offset-10 col-xs-4 col-xs-offset-8">
                    <md-button @click="onClose()" class="md-button">submit</md-button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'AskForToken',
    mounted () {
    },
    data () {
      return {
        token: ''
      }
    },
    methods: {
      onClose () {
        this.$http.post('api/auth', {token: this.token}).then(
          res => {
            this.$store.commit('login', this.token)
            Vue.http.headers.common['bgmi-token'] = `${this.token}`
            this.$cookie.set('auth', res.body.token, 1)

            if (this.$route.query.from) {
              this.$router.push(this.$route.query.from)
            } else {
              this.$router.push('/')
            }
          },
          res => {
            this.$notifications.notify({
              type: 'danger',
              icon: 'notifications',
              message: 'auth wrong',
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
