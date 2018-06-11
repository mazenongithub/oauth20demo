const request = require("request");
const base64url = require("base64url");
var crypto = require('crypto');
const keys = require("../keys");
module.exports = app => {

    app.get('/googlecalendar/showallmyevents', (req, res) => {
        var private_key = keys.googleprivatekey;
        res.send(private_key)

    })

    app.get('/googlecalendar/:eventid/showmyevent', (req, res) => {
        var private_key = keys.googleprivatekey;
        var iat = Math.round(new Date() / 1000);
        var exp = iat + 3600;
        // data from your file would go here
        var baseheader = { "alg": "RS256", "typ": "JWT" };
        baseheader = JSON.stringify(baseheader);
        baseheader = base64url(baseheader);
        var claimSet = {
            "iss": "egeotechnical@egeotechnical-199216.iam.gserviceaccount.com",
            "scope": "https://www.googleapis.com/auth/calendar",
            "aud": "https://accounts.google.com/o/oauth2/token",
            "exp": exp,
            "iat": iat
        }
        claimSet = JSON.stringify(claimSet);
        claimSet = base64url(claimSet)
        const sign = crypto.createSign('RSA-SHA256');
        //console.log(baseheader + "." + claimSet)
        sign.update(baseheader + "." + claimSet);
        var mysignature = sign.sign(keys.googleprivatekey, 'base64');
        mysignature = encodeURIComponent(mysignature)
        var jwt = baseheader + "." + claimSet + "." + mysignature;
        var grant_type = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer';
        var values = "grant_type=" + grant_type +
            "&assertion=" + jwt;

        request.post({
                url: 'https://accounts.google.com/o/oauth2/token',
                body: values,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },
            function(err, httpResponse, body) {
                if (!err) {

                    body = JSON.parse(body);
                    var access_token = body.access_token;
                    var auth = "Bearer " + access_token
                    var eventid = req.params.eventid;
                    console.log(eventid)
                    request({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/events/' + eventid,
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

    app.post('/googlecalendar/insertevent', (req, res) => {
        var private_key = keys.googleprivatekey;
        var iat = Math.round(new Date() / 1000);
        var exp = iat + 3600;
        // data from your file would go here
        var baseheader = { "alg": "RS256", "typ": "JWT" };
        baseheader = JSON.stringify(baseheader);
        baseheader = base64url(baseheader);
        var claimSet = {
            "iss": "egeotechnical@egeotechnical-199216.iam.gserviceaccount.com",
            "scope": "https://www.googleapis.com/auth/calendar",
            "aud": "https://accounts.google.com/o/oauth2/token",
            "exp": exp,
            "iat": iat
        }
        claimSet = JSON.stringify(claimSet);
        claimSet = base64url(claimSet)
        const sign = crypto.createSign('RSA-SHA256');
        //console.log(baseheader + "." + claimSet)
        sign.update(baseheader + "." + claimSet);
        var mysignature = sign.sign(keys.googleprivatekey, 'base64');
        mysignature = encodeURIComponent(mysignature)
        var jwt = baseheader + "." + claimSet + "." + mysignature;
        var grant_type = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer';
        var values = "grant_type=" + grant_type +
            "&assertion=" + jwt;

        request.post({
                url: 'https://accounts.google.com/o/oauth2/token',
                body: values,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },
            function(err, httpResponse, body) {
                if (!err) {
                    var summary = req.body.summary;
                    var description = req.body.description;
                    var start = req.body.start;
                    var end = req.body.end;

                    var employee = req.body.employee;
                    body = JSON.parse(body);
                    var access_token = body.access_token;
                    var auth = "Bearer " + access_token
                    var event = {
                        summary: summary,
                        description: description,
                        start: {
                            dateTime: start
                            //dateTime: "2018-06-07T19:00:00-07:00"
                        },
                        end: {
                            dateTime: end
                        },
                        attendees: [{
                            email: employee,
                            responseStatus: "needsAction"
                        }],
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
                    console.log(event)
                    request.post({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/events',
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

    app.post('/googlecalendar/updatevent', (req, res) => {
        var summary = req.body.summary;
        var description = req.body.description;
        var start = req.body.start;
        var end = req.body.end;
        var employee = req.body.employee;
        var eventid = req.body.eventid;

        var private_key = keys.googleprivatekey;
        var iat = Math.round(new Date() / 1000);
        var exp = iat + 3600;
        // data from your file would go here
        var baseheader = { "alg": "RS256", "typ": "JWT" };
        baseheader = JSON.stringify(baseheader);
        baseheader = base64url(baseheader);
        var claimSet = {
            "iss": "egeotechnical@egeotechnical-199216.iam.gserviceaccount.com",
            "scope": "https://www.googleapis.com/auth/calendar",
            "aud": "https://accounts.google.com/o/oauth2/token",
            "exp": exp,
            "iat": iat
        }
        claimSet = JSON.stringify(claimSet);
        claimSet = base64url(claimSet)
        const sign = crypto.createSign('RSA-SHA256');
        //console.log(baseheader + "." + claimSet)
        sign.update(baseheader + "." + claimSet);
        var mysignature = sign.sign(keys.googleprivatekey, 'base64');
        mysignature = encodeURIComponent(mysignature)
        var jwt = baseheader + "." + claimSet + "." + mysignature;
        var grant_type = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer';
        var values = "grant_type=" + grant_type +
            "&assertion=" + jwt;

        request.post({
                url: 'https://accounts.google.com/o/oauth2/token',
                body: values,
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
                        summary: summary,
                        description: description,
                        start: {
                            dateTime: start
                            //dateTime: "2018-06-07T19:00:00-07:00"
                        },
                        end: {
                            dateTime: end
                        },
                        attendees: [{
                            email: employee,
                            responseStatus: "needsAction"
                        }],
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
                    request.put({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/events/' + eventid,
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

    app.post('/googlecalendar/insertevent', (req, res) => {
        var summary = req.body.summary;
        var description = req.body.description;
        var start = req.body.start;
        var end = req.body.end;
        var employee = req.body.employee;
        var eventid = req.body.eventid;

        var private_key = keys.googleprivatekey;
        var iat = Math.round(new Date() / 1000);
        var exp = iat + 3600;
        // data from your file would go here
        var baseheader = { "alg": "RS256", "typ": "JWT" };
        baseheader = JSON.stringify(baseheader);
        baseheader = base64url(baseheader);
        var claimSet = {
            "iss": "egeotechnical@egeotechnical-199216.iam.gserviceaccount.com",
            "scope": "https://www.googleapis.com/auth/calendar",
            "aud": "https://accounts.google.com/o/oauth2/token",
            "exp": exp,
            "iat": iat
        }
        claimSet = JSON.stringify(claimSet);
        claimSet = base64url(claimSet)
        const sign = crypto.createSign('RSA-SHA256');
        //console.log(baseheader + "." + claimSet)
        sign.update(baseheader + "." + claimSet);
        var mysignature = sign.sign(keys.googleprivatekey, 'base64');
        mysignature = encodeURIComponent(mysignature)
        var jwt = baseheader + "." + claimSet + "." + mysignature;
        var grant_type = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer';
        var values = "grant_type=" + grant_type +
            "&assertion=" + jwt;

        request.post({
                url: 'https://accounts.google.com/o/oauth2/token',
                body: values,
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
                        summary: summary,
                        description: description,
                        start: {
                            dateTime: start
                            //dateTime: "2018-06-07T19:00:00-07:00"
                        },
                        end: {
                            dateTime: end
                        },
                        attendees: [{
                            email: employee,
                            responseStatus: "needsAction"
                        }],
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
                    request.put({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/events/' + eventid,
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

    app.get('/googlecalendar/:eventid/deletevent', (req, res) => {
        var private_key = keys.googleprivatekey;
        var iat = Math.round(new Date() / 1000);
        var exp = iat + 3600;
        // data from your file would go here
        var baseheader = { "alg": "RS256", "typ": "JWT" };
        baseheader = JSON.stringify(baseheader);
        baseheader = base64url(baseheader);
        var claimSet = {
            "iss": "egeotechnical@egeotechnical-199216.iam.gserviceaccount.com",
            "scope": "https://www.googleapis.com/auth/calendar",
            "aud": "https://accounts.google.com/o/oauth2/token",
            "exp": exp,
            "iat": iat
        }
        claimSet = JSON.stringify(claimSet);
        claimSet = base64url(claimSet)
        const sign = crypto.createSign('RSA-SHA256');
        //console.log(baseheader + "." + claimSet)
        sign.update(baseheader + "." + claimSet);
        var mysignature = sign.sign(keys.googleprivatekey, 'base64');
        mysignature = encodeURIComponent(mysignature)
        var jwt = baseheader + "." + claimSet + "." + mysignature;
        var grant_type = 'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer';
        var values = "grant_type=" + grant_type +
            "&assertion=" + jwt;

        request.post({
                url: 'https://accounts.google.com/o/oauth2/token',
                body: values,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },
            function(err, httpResponse, body) {
                if (!err) {

                    body = JSON.parse(body);
                    var access_token = body.access_token;
                    var auth = "Bearer " + access_token
                    var eventid = req.params.eventid;
                    request.delete({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/events/' + eventid,
                        headers: {
                            'Authorization': auth
                        }

                    }, function(err, response, body) {
                        if (!err) {

                            res.send(response)

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




} // End of Export
