<template>
  <md-whiteframe md-tag="md-toolbar" class="top-header" md-elevation="10">

    <md-dialog ref="dialog1">
      <md-dialog-title>update</md-dialog-title>
      <md-dialog-content>
        <md-spinner md-indeterminate v-if="loading"></md-spinner>
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

    <h2 class="md-title" style="flex: 1">{{$route.name}}</h2>
    <md-button v-if="$route.name=='Subscribe'" @click="openDialog('dialog1')">update</md-button>
    <md-button class="md-icon-button hidden-lg hidden-md" type="button" data-toggle="collapse"
               @click="toggleSideBar">
      <md-icon>menu</md-icon>
    </md-button>
  </md-whiteframe>
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
    created () {
    },
    methods: {
      saveCheck () {
        this.$cookie.set('download', this.download, 30)
      },
      openDialog (ref) {
        this.download = (this.$cookie.get('download') === 'true')
        this.$refs[ref].open()
      },
      closeDialog (ref, ok) {
        if (ok) {
          this.loading = true
          this.$http.post('api/update', {name: '', download: this.download}).then(
            res => {
              this.$refs[ref].close()
              this.loading = false
              let message = '<ul>'
              if (res.body.data.downloaded.length) {
                res.body.data.downloaded.forEach(
                  item => {
                    message += '<li>' + item.title + '</li>'
                  }
                )
                message += '</ul>'
                this.$notifications.notify({
                  type: 'success',
                  message,
                  placement: {
                    from: 'top',
                    align: 'right'
                  }
                })
              } else {
                this.$notifications.notify({
                  type: 'success',
                  message: 'nothing new',
                  placement: {
                    from: 'top',
                    align: 'right'
                  }
                })
              }
            }
          )
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
<style lang="scss">

</style>
