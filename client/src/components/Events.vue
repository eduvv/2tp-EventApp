<template>
  <div class="events">
    <v-btn>Add new event</v-btn>
    <v-layout row justify-center>
      <v-flex xs6>
        <v-expansion-panel>
            <v-expansion-panel-content v-for="(event,i) in events" :key="i">
              <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
              <div slot="header">{{ event.name }} | {{event.date}} | <i>{{ event.shortDesc }}</i></div>
              <v-card>
                <v-card-text>
                  {{event.longDesc}}
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </div>
  
</template>

<script>
import EventService from '@/services/EventsService'
// const EventService = require('@/services/EventService')
export default {
  name: 'events',
  data () {
    return {
      events: []
    }
  },
  mounted () {
    this.getEvents()
  },
  methods: {
    async getEvents () {
      const response = await EventService.getEvents()
      var _events = response.data
      // var dateSortAsc = function (date1, date2) {
      //   // This is a comparison function that will result in dates being sorted in
      //   // ASCENDING order. As you can see, JavaScript's native comparison operators
      //   // can be used to compare dates. This was news to me.
      //   if (date1 > date2) return 1
      //   if (date1 < date2) return -1
      //   return 0
      // }

      // _events.sort(dateSortAsc)
      this.events = _events
    }
  }
}
</script>
