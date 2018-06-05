const express = require("express");
const app = express();
const request = require("request");
const base64url = require("base64url");
var crypto = require('crypto');
const keys = require("./keys");
var jwt = require('jsonwebtoken');
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

app.get('/', (req, res) => {

    res.send("<ul><li><a href=" + inserturi + "> Insert An Event  </a></li>" +
        "<li><a href=" + fetchevents + "> Show All my Events </a></li>" +
        "<li><a href=" + updateuri + "> Update Event </a></li>" +
        "<li><a href=" + findeventuri + "> Find Event </a>" +
        "<li><a href=" + eventdeleteuri + "> Delete Event </a></ul>")
})
app.get('/oauth20/inserturi', (req, res) => {
    var grant_type = 'authorization_code';
    var code = req.query.code;

    var values = "grant_type=" + grant_type +
        "&code=" + code +
        "&redirect_uri=" + insert_uri +
        "&client_id=" + client_id +
        "&client_secret=" + client_secret;

    request.post({
            url: 'https://accounts.google.com/o/oauth2/token',
            form: values,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        function(err, httpResponse, body) {
            if (!err) {

                body = JSON.parse(body);
                var access_token = body.access_token;
                var auth = "Bearer " + access_token
                var event = {
                    "end": {
                        "dateTime": "2018-06-04T17:00:00-07:00",
                        "timeZone": "America/Los_Angeles"
                    },
                    "start": {
                        "dateTime": "2018-06-04T09:00:00-07:00",
                        "timeZone": "America/Los_Angeles"
                    }
                }

                event = JSON.stringify(event)
                request.post({
                    url: 'https://www.googleapis.com/calendar/v3/calendars/immaisoncrosby@gmail.com/events',
                    body: event,
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json'
                    }

                }, function(err, response, body) {
                    if (!err) {
                        body = JSON.parse(body);
                        res.send(body)
                    }
                    else {
                        res.send(err)
                    }
                })


            }
            else {
                res.send(err)
            }


        })
})

app.get('/oauth20/fetchevents', (req, res) => {
    var grant_type = 'authorization_code';
    var code = req.query.code;

    var values = "grant_type=" + grant_type +
        "&code=" + code +
        "&redirect_uri=" + fetchevents_uri +
        "&client_id=" + client_id +
        "&client_secret=" + client_secret;

    request.post({
            url: 'https://accounts.google.com/o/oauth2/token',
            form: values,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        function(err, httpResponse, body) {
            if (!err) {

                body = JSON.parse(body);
                var access_token = body.access_token;
                var auth = "Bearer " + access_token;
                request({
                    url: 'https://www.googleapis.com/calendar/v3/calendars/immaisoncrosby@gmail.com/events',
                    headers: {
                        'Authorization': auth
                    }

                }, function(err, response, body) {
                    if (!err) {
                        body = JSON.parse(body);
                        res.send(body)
                    }
                    else {
                        res.send(err)
                    }
                })


            }
            else {
                res.send(err)
            }


        })
})

app.get('/oauth20/updateuri', (req, res) => {
    var grant_type = 'authorization_code';
    var code = req.query.code;

    var values = "grant_type=" + grant_type +
        "&code=" + code +
        "&redirect_uri=" + update_uri +
        "&client_id=" + client_id +
        "&client_secret=" + client_secret;

    request.post({
            url: 'https://accounts.google.com/o/oauth2/token',
            form: values,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        function(err, httpResponse, body) {
            if (!err) {

                body = JSON.parse(body);
                var access_token = body.access_token;
                var auth = "Bearer " + access_token
                var event = {
                    "end": {
                        "dateTime": "2018-06-05T17:00:00-07:00",
                        "timeZone": "America/Los_Angeles"
                    },
                    "start": {
                        "dateTime": "2018-06-05T09:00:00-07:00",
                        "timeZone": "America/Los_Angeles"
                    }
                }
                var eventid = "6j1kou0p8tgni3r60sc0alh4i5";
                event = JSON.stringify(event)
                request.put({
                    url: 'https://www.googleapis.com/calendar/v3/calendars/immaisoncrosby@gmail.com/events/' + eventid,
                    body: event,
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json'
                    }

                }, function(err, response, body) {
                    if (!err) {
                        body = JSON.parse(body);
                        res.send(body)
                    }
                    else {
                        res.send(err)
                    }
                })


            }
            else {
                res.send(err)
            }


        })
})

app.get('/oauth20/findeventuri', (req, res) => {
    var grant_type = 'authorization_code';
    var code = req.query.code;

    var values = "grant_type=" + grant_type +
        "&code=" + code +
        "&redirect_uri=" + findevent_uri +
        "&client_id=" + client_id +
        "&client_secret=" + client_secret;

    request.post({
            url: 'https://accounts.google.com/o/oauth2/token',
            form: values,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        function(err, httpResponse, body) {
            if (!err) {

                body = JSON.parse(body);
                var access_token = body.access_token;
                var auth = "Bearer " + access_token;
                var eventid = '6j1kou0p8tgni3r60sc0alh4i5'
                request({
                    url: 'https://www.googleapis.com/calendar/v3/calendars/immaisoncrosby@gmail.com/events/' + eventid,
                    headers: {
                        'Authorization': auth
                    }

                }, function(err, response, body) {
                    if (!err) {
                        body = JSON.parse(body);
                        res.send(body)
                    }
                    else {
                        res.send(err)
                    }
                })


            }
            else {
                res.send(err)
            }


        })
})

app.get('/oauth20/eventdeleteuri', (req, res) => {
    var grant_type = 'authorization_code';
    var code = req.query.code;

    var values = "grant_type=" + grant_type +
        "&code=" + code +
        "&redirect_uri=" + eventdelete_uri +
        "&client_id=" + client_id +
        "&client_secret=" + client_secret;

    request.post({
            url: 'https://accounts.google.com/o/oauth2/token',
            form: values,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        function(err, httpResponse, body) {
            if (!err) {

                body = JSON.parse(body);
                var access_token = body.access_token;
                var auth = "Bearer " + access_token;
                var eventid = 'r2had1orehon5eth1tsqdqmg4g'
                request.delete({
                    url: 'https://www.googleapis.com/calendar/v3/calendars/immaisoncrosby@gmail.com/events/' + eventid,
                    headers: {
                        'Authorization': auth
                    }

                }, function(err, response, body) {
                    if (!err) {

                        //body = JSON.parse(body);
                        console.log(response, body)
                        res.send(body)
                    }
                    else {
                        console.log(err)
                        res.send(err)
                    }
                })


            }
            else {
                res.send(err)
            }


        })
})

app.get('/oauth20/clientcredential/fetchevents', (req, res) => {
    var iat = Math.round(new Date() / 1000);
    var exp = iat + 3600;
    var sign = crypto.createSign('RSA-SHA256');
    sign.update(keys.googleprivatekey); // data from your file would go here
    var signature = sign.sign(keys.googleprivatekey, 'hex');
    console.log(signature)
    signature = base64url(signature);
    var baseheader = { "alg": "RS256", "typ": "JWT" };
    baseheader = JSON.stringify(baseheader);
    baseheader = base64url(baseheader);
    var myclaim = {
        "iss": "egeotechnical@egeotechnical-199216.iam.gserviceaccount.com",
        "scope": "https://www.googleapis.com/auth/calendar",
        "aud": "https://accounts.google.com/o/oauth2/token",
        "exp": exp,
        "iat": iat,
        "sub": "immaisoncrosby@gmail.com"
    }
    myclaim = JSON.stringify(myclaim);
    myclaim = base64url(myclaim);
    var jwt = baseheader + '.' + myclaim + '.' + signature;


    var grant_type = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer';
    var values = "grant_type=" + grant_type +
        "&assertion=" + jwt;

    request.post({
            url: 'https://accounts.google.com/o/oauth2/token',
            form: values,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        function(err, httpResponse, body) {
            if (!err) {

                res.send(body)
            }
            else {

                res.send(err)
            }

        })
})
app.listen(process.env.PORT);
