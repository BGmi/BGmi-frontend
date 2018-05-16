<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-content">

              <div class="row">
                <div class="col-md-12 col-xs-12 col-lg-12 col-sm-12">
                  <md-input-container>
                    <label>token</label>
                    <md-input v-model="token" @keyup.enter.native="onClose()"></md-input>
                  </md-input-container>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 col-xs-12 col-lg-12 col-sm-12">
                  <div style="align-content: flex-end" class="col-md-2 col-md-offset-10 col-xs-4 col-xs-offset-8">
                    <md-button @click="onClose()">submit</md-button>
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
    created () {
      if (this.$cookies.isKey('auth')) {
        let token = this.$cookies.get('auth')
        this.$http.post('auth', {token: token}).then(
          res => {
            this.$store.commit('login', token)
            Vue.http.headers.common['bgmi-token'] = `${token}`
            this.$nextTick(
              () => {
                if (this.$route.query.redirect) {
                  this.$router.push(this.$route.query.redirect)
                } else {
                  this.$router.push('/')
                }
              }
            )
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
    },
    methods: {
      onClose () {
        this.$http.post('auth', {token: this.token}).then(
          res => {
            this.$store.commit('login', this.token)
            Vue.http.headers.common['bgmi-token'] = `${this.token}`
            this.$cookies.set('auth', this.token, '1y')
            this.$nextTick(
              () => {
                if (this.$route.query.redirect) {
                  this.$router.push(this.$route.query.redirect)
                } else {
                  this.$router.push('/')
                }
              }
            )
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
