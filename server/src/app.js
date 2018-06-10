const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const firebase = require('firebase')
const config = {
  apiKey: "AIzaSyCHOcQytfwdcFhIGxYelXqNXAM9ZULweMQ",
  authDomain: "eventapp-59bea.firebaseapp.com",
  databaseURL: "https://eventapp-59bea.firebaseio.com",
  projectId: "eventapp-59bea",
  storageBucket: "eventapp-59bea.appspot.com",
  messagingSenderId: "34128718846"
};
firebase.initializeApp(config);
var db = firebase.database();
var ref = db.ref('/events');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/events', (req, res) => {
    db.ref('/events').on("value",(snapshot) => {
      res.send(snapshot.val());
    });
});

app.post('/events', (req, res) => {
  var event = req.body;
  db.ref('/events/').push({
    name: event.name,
    date: event.date,
    num: event.num,
    location: event.location,
    address: event.address,
    shortDesc: event.shortDesc,
    longDesc: event.longDesc,
    registerURL: event.registerURL,
    externalURL: event.externalURL,
    logo: event.logo
  });
  res.send({
    success: true,
    code: 200
  });
});


/* var Event = require('../models/event'); */
/* var testEvent = new Event(
  'ToThePoint meeting',
  '01-01-2018',
  '1',
  'Cronos Hoofdgebouw',
  'Veldkant 33A, 2250 Kontich',
  'Weekelijkse meeting',
  'topic: hoe gaan we nieuwe mensen aanwerven die van een super coole startup komen?',
  'none',
  'none',
  'none'
);
var testEvent2 = new Event(
  'Google Meetup',
  '01-01-2018',
  '1',
  'Cronos Hoofdgebouw',
  'Veldkant 33A, 2250 Kontich',
  'Weekelijkse meeting',
  'topic: hoe gaan we nieuwe mensen aanwerven die van een super coole startup komen?',
  'none',
  'none',
  'none'
);
saveNewEvent(testEvent);
saveNewEvent(testEvent2) */

function saveNewEvent(event){
    db.ref('/events/' + event.name).set({
        name: event.name,
        date: event.date,
        num: event.num,
        location: event.location,
        address: event.address,
        shortDesc: event.shortDesc,
        longDesc: event.longDesc,
        registerURL: event.registerURL,
        externalURL: event.externalURL,
        logo: event.logo
    });
}

app.listen(process.env.PORT || 8081)
console.log('Listening to http://localhost:8081')