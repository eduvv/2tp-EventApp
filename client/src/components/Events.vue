<template>
  <div class="events">
    <v-btn color="primary" dark @click.stop="dialog = true">Add Event</v-btn>
    <v-layout row justify-center>
      <v-flex xs6>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(event,i) in events" :key="i">
            <v-btn icon data-toggle="modal" data-target="#showSelectedGamers">
              <v-icon>edit</v-icon>
            </v-btn>
            <div slot="header">{{ event.name }} | {{event.date}} |
              <i>{{ event.shortDesc }}</i>
            </div>
            <v-card>
              <v-card-text>
                {{event.longDesc}}
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              Add new event
            </v-card-title>
            <v-card-text>
              <!-- name    volgnummer -->
              <v-layout row justify-center>
                <v-flex xs10>
                  <v-text-field v-model=newEvent.name label="Event name" placeholder="ToThePoint Meeting" required></v-text-field>
                </v-flex>
                <v-flex xs2 ml-1>
                  <v-text-field v-model=newEvent.num label="volgnr" placeholder="15" prefix="#" type="number"></v-text-field>
                </v-flex>
              </v-layout>
              <!-- date -->
              <v-flex xs12>
                <v-menu :close-on-content-click="false" v-model="dateMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                  <v-text-field v-model="computedDateFormatted" slot="activator" label="Date (read only text field)" hint="DD/MM/YYYT" persistent-hint prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model=newEvent.date no-title @input="dateMenu = false" required></v-date-picker>
                </v-menu>
              </v-flex>
              <!-- location / address / shortDesc / longDesc -->
              <v-text-field v-model=newEvent.location label="Location" placeholder="Cronos hoofdkantoor" required></v-text-field>
              <v-text-field v-model=newEvent.address label="Address" placeholder="Veldkant 33, #### Kontich" required></v-text-field>
              <v-text-field label="Short Description" placeholder="Weekelijkse meeting van 2TP" multi-line v-model=newEvent.shortDesc required></v-text-field>
              <v-text-field label="Full Description" placeholder="Topic dat in deze meeting besproken zal worden is..." multi-line v-model=newEvent.longDesc required></v-text-field>
              <v-text-field v-model=newEvent.registerURL label="register@" placeholder="http://eventapp.com/register"></v-text-field>
              <v-text-field v-model=newEvent.externalURL label="company website" placeholder="http://mycompany.com"></v-text-field>
              <v-text-field v-model=newEvent.logo label="logo" placeholder="http://mycompany.com/company.png"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
              <v-btn color="primary" flat v-on:click="saveEvent(newEvent)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import EventService from "@/services/EventsService";
// import { EventBus } from './event-bus.js';
// const EventService = require('@/services/EventService')
export default {
  name: "events",
  data() {
    return {
      newEvent: {
        shortDesc: "",
        longDesc: "",
        name: "",
        date: "",
        location: "",
        address: "",
        registerURL: "",
        externalURL: "",
        logo: "",
        num: ""
      },
      dialog: false,
      events: [],
      dateMenu: false
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.newEvent.date);
    }
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      const response = await EventService.getEvents();
      var _events = response.data;
      _events.forEach(element => {
        // https://stackoverflow.com/questions/10607935/convert-returned-string-yyyymmdd-to-date?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        var dateString = element.date;
        var year = dateString.substring(0, 4);
        var month = dateString.substring(4, 6);
        var day = dateString.substring(6, 8);
        element.date = new Date(year, month - 1, day).toLocaleDateString();
      });
      this.events = _events;
    },
    async saveEvent() {
      console.log("save called");
      const response = await EventService.saveEvent(this.newEvent);
      console.log(response);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
  }
};
</script>
