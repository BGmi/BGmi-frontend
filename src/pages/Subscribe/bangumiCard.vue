<template>
  <v-card>
    <v-card-media
      :src=imgSrc
      height="100px"
    ></v-card-media>
    <v-card-text>
      <p class="category text-black headline">{{bangumi.name}}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :class="{'md-primary':!bangumi.status,'md-accent':bangumi.status}"
        @click.stop.prevent="add()"
        class="md-raised "
        color=info
        v-if='!bangumi.status'
      >
        add
      </v-btn>
      <v-btn
        @click.stop.prevent="expandDetail()"
        class="md-raised"
        color=success
        v-else-if="!expand"
      >
        <div>detail</div>
      </v-btn>
      <v-btn
        @click="pack"
        class="md-raised"
        v-else
      >
        pack
      </v-btn>
    </v-card-actions>
    <!-- dialog -->
    <v-dialog v-model="expand">
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>Filter</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label=Status
              type="number"
              v-model="bangumi.status"
            ></v-text-field>
            <v-text-field
              label=Include
              v-model="filter.include"
            ></v-text-field>
            <v-text-field
              label=Regex
              v-model="filter.regex"
            ></v-text-field>
            <v-text-field
              label=Exclude
              v-model="filter.exclude"
            ></v-text-field>
            <v-text-field
              label=Episode
              type="number"
              v-model="mark"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text v-show="showSubtitle">
          <v-checkbox
            :key=key
            :label="key"
            :value="key"
            v-for="key in filter.subtitle_group"
            v-model="followed"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showSubtitle=!showSubtitle">
            显示字幕组
          </v-btn>
          <v-btn
            @click="del()"
            color=error
          >
            delete
          </v-btn>
          <v-btn
            @click="save()"
            color=primary
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="500px"
      v-model="dialog5"
    >
      <v-card>
        <v-card-title>
          确认删除?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click.stop="onClose('not-ok')"
            color="primary"
            flat
          >Cancel
          </v-btn>
          <v-btn
            @click.stop="onClose('ok')"
            color="primary"
            flat
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog end -->
  </v-card>
</template>
<script>
let imgRoot = './bangumi/cover/'

export default {
  data () {
    return {
      dialog5: false,
      showSubtitle: false,
      imgRoot,
      expand: false,
      filter: {
        name: this.bangumi.name,
        regex: '',
        followed: [],
        subtitle_group: [],
        exclude: '',
        bangumi_name: '',
        include: ''
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
      const obj = { name: this.bangumi.name }
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
      this.$http.post('status', {
        name: this.bangumi.name,
        status: this.bangumi.status
      }).then(
        res => {
          console.log(res.data.message)
        }
      )
    },
    save () {
      let p = []
      if (!this.script) {
        p = [this.$http.post('filter', this.filter_args),
          this.$http.post('mark', {
            name: this.bangumi.name,
            episode: this.mark
          })]
      } else {
        p = [
          this.$http.post('mark', {
            name: this.bangumi.name,
            episode: this.mark
          })]
      }
      this.expand = false
      Promise.all(p)
        .then(
          res => {
            this.expand = false
            this.$notify({
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
        this.$http.post('filter', { name: this.bangumi.name }).then(
          res => {
            this.fetchFilter(res.data.data)
          }
        )
      } else {
        this.expand = true
        this.script = true
      }
    },
    add () {
      this.$store.commit('clearBangumiIndex')
      const action = 'add'
      this.$http.post(`${action}`, { name: this.bangumi.name }).then(
        res => {
          // this.expand = true
          this.bangumi.status = 1
          this.$notify({
            type: res.data.status,
            message: res.data.message,
            placement: {
              from: 'top',
              align: 'right'
            }
          })
        },
        res => {
          //            this.bangumi.status = 1
          this.$notify({
            type: 'danger',
            message: res.data.message,
            placement: {
              from: 'top',
              align: 'right'
            }
          })
        })
    },
    onClose (type) {
      this.dialog5 = false
      if (type === 'ok') {
        this.$store.commit('clearBangumiIndex')
        this.expand = false
        const action = 'delete'
        this.$http.post(`${action}`, { name: this.bangumi.name }).then(
          res => {
            this.bangumi.status = 0
            this.$notify({
              type: res.data.status,
              message: res.data.message,
              placement: {
                from: 'top',
                align: 'right'
              }
            })
          },
          res => {
            //              this.bangumi.status = 0
            this.$notify({
              type: 'danger',
              message: res.data.message,
              placement: {
                from: 'top',
                align: 'right'
              }
            })
          })
      }
    },
    del () {
      this.dialog5 = true
    }
  }
}
</script>
<style scoped>
.headline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
