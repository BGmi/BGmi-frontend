<template>
  <div class="card card-profile">
    <p class="img-container">
      <img :src="src"/>
      <md-spinner :md-progress="0" :md-size="150" md-indeterminate v-if="loading"></md-spinner>
    </p>
    <div class="content"><p class="category text-black">{{bangumi.name}}</p>

      <md-button class="md-raised" :class="{'md-primary':!bangumi.status,'md-accent':bangumi.status}"
                 @click="changeStatus()">
        <div v-if='!bangumi.status'>add</div>
        <div v-else>delete</div>
      </md-button>

    </div>
  </div>
</template>
<script>
  let imgRoot = ''
  if (process.env.NODE_ENV === 'development') {
    imgRoot = 'http://localhost:8888/bangumi/cover/'
  } else {
    imgRoot = '/bangumi/cover/'
  }

  export default {
    data () {
      return {
        imgRoot,
        loading: true,
        src: ''
      }
    },
    computed: {
      imgSrc () {
        return `${this.imgRoot}${this.bangumi.cover}`
      }
    },
    props: {
      bangumi: {
        type: Object,
        required: true
      }
    },
    mounted () {
      const newImg = new Image()
      newImg.onload = () => {
        this.loading = false
        this.src = newImg.src
      }
      newImg.src = this.imgSrc
    },
    methods: {
      changeStatus () {
        let action = ''
        if (!this.bangumi.status) {
          action = 'add'
        } else {
          action = 'delete'
        }
        this.$http.post(`api/${action}`, {name: this.bangumi.name}).then(
          res => {
            this.bangumi.status = action === 'add' ? 1 : null
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
            this.bangumi.status = action === 'add' ? 1 : null
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
<style scoped lang="scss">

  .img-container {
    max-width: 100%;
    height: 0;
    padding-bottom: 50%;
    overflow: hidden;
  }

  .img-container img {
    width: 100%;
  }


</style>
