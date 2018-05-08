<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Auth</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <label></label>
              <v-text-field v-model="token" label="token" type="text" @keyup.enter.native="onClose()"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color=primary @click="onClose()">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

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
      // if (this.$cookies.isKey('auth22')) {
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
            this.$cookies.set('auth', this.token)
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
