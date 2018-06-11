const express = require("express");
const app = express();
const request = require("request");
const base64url = require("base64url");
var crypto = require('crypto');
const keys = require("./keys");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const insert_uri = keys.googlecalenderinserturi;
const fetchevents_uri = keys.googlecalenderfetchevents;
const update_uri = keys.googlecalenderupdate;
const findevent_uri = keys.googlecalenderfindevent;
const eventdelete_uri = keys.googlecalendereventdelete;
const client_id = keys.googleClientID;
const client_secret = keys.googleClientSecret;
const inserturi = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + insert_uri +
    '&prompt=consent&response_type=code&client_id=' + client_id + '&scope=https://www.googleapis.com/auth/calendar&access_type=offline'

const fetchevents = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + fetchevents_uri +
    '&prompt=consent&response_type=code&client_id=' + client_id + '&scope=https://www.googleapis.com/auth/calendar&access_type=offline'

const updateuri = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + update_uri +
    '&prompt=consent&response_type=code&client_id=' + client_id + '&scope=https://www.googleapis.com/auth/calendar&access_type=offline'

const findeventuri = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + findevent_uri +
    '&prompt=consent&response_type=code&client_id=' + client_id + '&scope=https://www.googleapis.com/auth/calendar&access_type=offline'

const eventdeleteuri = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + eventdelete_uri +
    '&prompt=consent&response_type=code&client_id=' + client_id + '&scope=https://www.googleapis.com/auth/calendar&access_type=offline'
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://www.egeotechnical.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.get('/', (req, res) => {

    res.send("<ul><li><a href=" + inserturi + "> Insert An Event  </a></li>" +
        "<li><a href=" + fetchevents + "> Show All my Events </a></li>" +
        "<li><a href=" + updateuri + "> Update Event </a></li>" +
        "<li><a href=" + findeventuri + "> Find Event </a>" +
        "<li><a href=" + eventdeleteuri + "> Delete Event </a></ul>")
})

require('./googleCalendar/eventroutes')(app);
app.listen(process.env.PORT);
