<template>
  <v-container
    fill-height
    fluid
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        md6
        sm10
        xs12
      >
        <v-card class="elevation-12">
          <v-toolbar app
                     color="primary"
                     dark
          >
            <v-toolbar-title>Auth</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <label/>
              <v-text-field
                v-model="token"
                label="token"
                type="text"
                @keyup.enter.native="onClose()"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <!--<v-switch v-model="rememberMe" label="remember me"></v-switch>-->
            <v-select
              :items="rememberMeTimeItems"
              item-text="time"
              item-value="value"
              label="Remember Me"
              v-model="rememberMe"
            />
            <v-spacer/>
            <v-btn
              @click="onClose()"
              color=primary
            >Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AskForToken',
  data () {
    let rememberMe = '1y'
    if (this.$cookies.isKey('rememberMe')) {
      rememberMe =
        this.$cookies.get('rememberMe') === 'false'
          ? false
          : this.$cookies.get('rememberMe')
    }
    let redirectTo: string = '/'
    if (this.$route.query.redirect) {
      if (Array.isArray(this.$route.query.redirect)) {
        redirectTo = this.$route.query.redirect[0] || ''
      } else {
        redirectTo = this.$route.query.redirect
      }
    }
    return {
      redirectTo,
      rememberMe,
      rememberMeTimeItems: [
        {
          time: 'No',
          value: false
        },
        {
          time: '1 year',
          value: '1y'
        },
        {
          time: '1 month',
          value: '1m'
        },
        {
          time: '1 week',
          value: '7d'
        },
        {
          time: '1 day',
          value: '1d'
        }
      ],
      token: ''
    }
  },

  created () {
    if (this.$cookies.isKey('auth')) {
      this.token = this.$cookies.get('auth')
      this.tryAuth()
    }
  },
  methods: {
    tryAuth () {
      this.$http.post('auth', { token: this.token }).then(
        () => {
          this.$store.commit('login', this.token)
          this.$http.defaults.headers['bgmi-token'] = `${ this.token }`
          if (this.rememberMe) {
            this.$cookies.set('auth', this.token, this.rememberMe)
          }
          this.$cookies.set('rememberMe', this.rememberMe)
          this.$nextTick(() => {
            this.$router.push(this.redirectTo)
          })
        },
        () => {
          this.$notify({
            type: 'error',
            text: 'auth wrong'
          })
        }
      )
    },
    onClose () {
      this.tryAuth()
    }
  }
})
</script>
