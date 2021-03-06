const express = require("express");
const app = express();
const keys = require("../keys");
const client_id = keys.googleClientID;
const client_secret = keys.googleClientSecret;
const request = require("request");
const fetchevents_uri = keys.googlecalenderfetchevents;
const update_uri = keys.googlecalenderupdate;
const findevent_uri = keys.googlecalenderfindevent;
const eventdelete_uri = keys.googlecalendereventdelete;
module.exports = app => {
    app.get('/oauth20/inserturi', (req, res) => {
        const insert_uri = keys.googlecalenderinserturi;
        const inserturi = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + insert_uri +
            '&prompt=consent&response_type=code&client_id=' + client_id + '&scope=https://www.googleapis.com/auth/calendar&access_type=offline'
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
                        status: "confirmed",
                        summary: "Project No. 1776 - Title",
                        description: "Complete insert route for google calender",
                        start: {
                            dateTime: "2018-06-07T19:00:00-07:00"
                        },
                        end: {
                            dateTime: "2018-06-07T20:00:00-07:00"
                        },
                        visibility: "private",
                        extendedProperties: {
                            private: {
                                everyoneDeclinedDismissed: "-1"
                            }
                        },
                        guestsCanInviteOthers: false,
                        reminders: {
                            useDefault: true
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
                        url: 'https://www.googleapis.com/calendar/v3/calendars/immaisoncrosby@gmail.com/acl',
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
                        url: 'https://www.googleapis.com/calendar/v3/calendars/user:immaisoncrosby@gmail.com/events/' + eventid,
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

}
