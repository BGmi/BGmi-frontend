<template>
  <div class="card card-profile">
    <md-card-media>
      <div class="bangumi-cover" :style="{backgroundImage:`url('${imgSrc}')`} "></div>
    </md-card-media>
    <div class="content">
      <md-dialog-confirm
        :md-title="`delete ${bangumi.name}`"
        :md-ok-text="`ok`"
        :md-cancel-text="`cancel`"
        :md-content="` `"
        @open="onOpen"
        @close="onClose"
        ref="dialog5">
      </md-dialog-confirm>

      <p class="category text-black">{{bangumi.name}}</p>
      <md-button v-if='!bangumi.status' class="md-raised "
                 :class="{'md-primary':!bangumi.status,'md-accent':bangumi.status}"
                 @click.stop.prevent="add()">
        <div>add</div>
      </md-button>

      <md-button v-else-if="!expand" class="md-raised"
                 @click.stop.prevent="expandDetail()">
        <div>detail</div>
      </md-button>
      <md-button class="md-raised" v-else @click="pack">
        pack
      </md-button>
      <div v-if="expand">
        <div class="row"
        <div class="col-md-12" v-cloak>
          <md-input-container v-if="!script">
            <label>Status</label>
            <md-input type="number" v-model="bangumi.status"/>
          </md-input-container>

          <md-input-container md-clearable v-if="!script">
            <label>Include</label>
            <md-input v-model="filter.include"/>
          </md-input-container>

          <md-input-container md-clearable v-if="!script">
            <label>Regex</label>
            <md-input v-model="filter.regex"/>
          </md-input-container>

          <md-input-container md-clearable v-if="!script">
            <label>Exclude</label>
            <md-input v-model="filter.exclude"/>
          </md-input-container>

          <md-input-container>
            <label>Episode</label>
            <md-input type="number" v-model="mark"/>
          </md-input-container>

          <md-checkbox
            v-for="( key,value) in filter.subtitle_group"
            v-model="followed"
            :key="key"
            :md-value="key">
            {{key}}
          </md-checkbox>
        </div>
        <md-button class="md-raised md-accent" @click="del()">
          delete
        </md-button>
        <md-button class="md-raised" @click="save()">
          save
        </md-button>
      </div>
    </div>
    <br>
  </div>
  </div>
</template>
<script>
  let imgRoot = ''
  // if (process.env.NODE_ENV === 'development') {
  //   imgRoot = 'http://localhost:8888/bangumi/cover/'
  // } else {
  imgRoot = '/bangumi/cover/'
  // }

  export default {
    data () {
      return {
        imgRoot,
        expand: false,
        filter: {
          name: this.bangumi.name,
          regex: 'asd',
          followed: [],
          subtitle_group: [],
          exclude: null,
          bangumi_name: 'NEW GAME!!',
          include: null
        },
        script: false,
        src: '',
        followed: [],
        mark: this.bangumi.episode
      }
    },
    computed: {
      imgSrc () {
        return `${this.imgRoot}${this.bangumi.cover}`
      },
      filter_args () {
        const obj = {name: this.bangumi.name}
        obj.include = this.filter.include
        obj.exclude = this.filter.exclude
        obj.regex = this.filter.regex
        obj.subtitle = this.followed.join(',')
        return obj
      }
    },
    props: {
      bangumi: {
        type: Object,
        required: true
      }
    },
    methods: {
      status () {
        this.$http.post('api/status', {name: this.bangumi.name, status: this.bangumi.status}).then(
          res => {
            console.log(res.body.message)
          }
        )
      },
      save () {
        console.log(this.filter_args)
        let p = []
        if (!this.script) {
          p = [this.$http.post('api/filter', this.filter_args),
            this.$http.post('api/mark', {name: this.bangumi.name, episode: this.mark})]
        } else {
          p = [
            this.$http.post('api/mark', {name: this.bangumi.name, episode: this.mark})]
        }
        Promise.all(p)
          .then(
            res => {
              this.$notifications.notify({
                type: 'success',
                message: 'save filter successfully',
                placement: {
                  from: 'top',
                  align: 'right'
                }
              })
            },
            res => {
            }
          )
      },
      pack () {
        this.expand = false
      },
      fetchFilter (data) {
        this.filter = data
        this.followed = data.followed
        this.expand = true
      },
      expandDetail () {
        if (this.bangumi.id) {
          this.$http.post('api/filter', {name: this.bangumi.name}).then(
            res => {
              this.fetchFilter(res.body.data)
            }
          )
        } else {
          this.expand = true
          this.script = true
        }
      },
      add () {
        const action = 'add'
        this.$http.post(`api/${action}`, {name: this.bangumi.name}).then(
          res => {
            this.bangumi.status = 1
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
//            this.bangumi.status = 1
            this.$notifications.notify({
              type: 'danger',
              message: res.body.message,
              placement: {
                from: 'top',
                align: 'right'
              }
            })
          })
      },
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.$refs[ref].close()
      },
      onOpen () {
        console.log('Opened')
      },
      onClose (type) {
        if (type === 'ok') {
          this.expand = false
          const action = 'delete'
          this.$http.post(`api/${action}`, {name: this.bangumi.name}).then(
            res => {
              this.bangumi.status = 0
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
//              this.bangumi.status = 0
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
      },
      del () {
        this.$refs['dialog5'].open()
      }
    }
  }
</script>
<style scoped lang="scss">
  .card {
    padding: 0 0 20px 0;
  }

  /*.img-container {*/
  /*max-width: 100%;*/
  /*height: 0;*/
  /*padding-bottom: 50%;*/
  /*overflow: hidden;*/
  /*}*/

  .bangumi-cover {
    height: 120px;
    background-size: cover;
    background-position: center center;
  }

  .img-container img {
    width: 100%;
  }

  [v-cloak] {
    display: none;
  }
</style>
