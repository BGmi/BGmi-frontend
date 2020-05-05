<template>
  <!--<md-theme md-name="nav">-->
  <v-whiteframe id="my-nav" md-tag="md-toolbar" class="top-header" md-elevation="10">

    <md-dialog ref="dialog1" md-content="">
      <md-dialog-title>update</md-dialog-title>
      <md-dialog-content>
        <md-spinner md-indeterminate v-if="loading"/>
        <div v-else>
          <p>Update bangumi, select download to download new episode</p>
          <md-checkbox @input="saveCheck()" v-model="download">download</md-checkbox>
        </div>
      </md-dialog-content>
      <md-dialog-actions v-if="!loading">
        <md-button class="md-primary" @click="closeDialog('dialog1', false)">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog('dialog1', true)">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!--<router-link to="/" style="flex: 1">-->
    <div style="flex: 1">
      <md-button @click="$router.push('/')">
        <h2 class="md-title">{{ $route.name }}</h2>
      </md-button>
    </div>
    <!--</router-link>-->
    <md-button v-if="$route.name === 'Subscribe'" @click="openDialog('dialog1')">update</md-button>
    <v-button class="md-icon-button hidden-lg hidden-md" type="button" data-toggle="collapse" @click="toggleSideBar">
      <v-icon>menu</v-icon>
    </v-button>
  </v-whiteframe>
  <!--</md-theme>-->
</template>

<script>
export default {
  components: {},
  data () {
    return {
      loading: false,
      download: true
    }
  },
  created () {},
  methods: {
    saveCheck () {
      this.$cookies.set('download', this.download, 30)
    },
    openDialog (ref) {
      this.download = this.$cookies.get('download') === 'true'
      this.$refs[ref].open()
    },
    closeDialog (ref, ok) {
      if (ok) {
        this.loading = true
        this.$http
          .post('update', { name: '', download: this.download })
          .then(res => {
            this.$refs[ref].close()
            this.loading = false
            let message = '<ul>'
            if (res.data.data.downloaded.length) {
              res.data.data.downloaded.forEach(item => {
                message += '<li>' + item.title + '</li>'
              })
              message += '</ul>'
              this.$notify({
                type: 'success',
                text: message
              })
            } else {
              this.$.notify({
                type: 'success',
                text: 'nothing new'
              })
            }
          })
      } else {
        this.$refs[ref].close()
      }
    },
    toggleSideBar () {
      this.$emit('toggleSideBar')
    }
  }
}
</script>
<style>
</style>
