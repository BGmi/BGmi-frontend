<template>
  <v-container fluid
               fill-height>
    <v-layout justify-center>
      <v-flex>
        <v-card md-theme="white"
                style="overflow: hidden">
          <v-card-text>

            <div v-if="!tabData"
                 class="col-md-2 col-md-offset-5">
              <md-spinner class="tim-note"
                          md-indeterminate />
            </div>
            <div v-else
                 v-for="(day, index) in weekday"
                 :key="index">
              <h3 class="week">{{ day }}</h3>

              <span v-for="(bangumi, i) in tabData[day]"
                    :key="i"
                    v-if="!bangumi.status">
                {{ bangumi.name }}
                <span v-if="i<tabData[day].length-1">/</span>
              </span>
              <b v-else>
                {{ bangumi.name }}
                <span v-if="i<tabData[day].length-1">/</span>
              </b>
              <br>
              <br>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Calendar',
  components: {},
  data () {
    return {
      tabData: false,
      weekday: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    }
  },
  created () {
    this.$store.dispatch('getCalendar', (cal) => {
      this.tabData = cal
    })
  },
  methods: {

  }
}
</script>

<style>
  .week {
    text-transform: capitalize;
    font-family: Roboto, "Noto Sans", Noto, sans-serif;
  }
</style>
