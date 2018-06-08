const request = require("request");
const base64url = require("base64url");
var crypto = require('crypto');
const keys = require("../keys");
module.exports = app => {

    app.get('/mycalender/showaccesscontrol', (req, res) => {
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
                    var auth = "Bearer " + access_token;
                    request({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/acl',
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
    }) //End of Route

    app.get('/googlecalendar/insertacl', (req, res) => {
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
                    var access = {
                        kind: "calendar#aclRule",
                        etag: "00000000000000000000",
                        id: "user:gus.gfk@gmail.com",
                        scope: {
                            type: "user",
                            value: "gus.gfk@gmail.com"
                        },
                        role: "writer"
                    }


                    access = JSON.stringify(access)
                    request.post({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/acl',
                        body: access,
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

    app.get('/googlecalendar/showallmyevents', (req, res) => {
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

                    request({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/events',
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

    app.get('/googlecalendar/showmyevent', (req, res) => {
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
                    var eventid = "4n145klns8nq4098072na8labo";
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

    app.get('/googlecalendar/insertevent', (req, res) => {
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

    app.get('/googlecalendar/updatevent', (req, res) => {
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
                    var eventid = "1a4dk3hnqsckr55711ql3tepus"
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

    app.get('/googlecalendar/deletevent', (req, res) => {
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
                    var eventid = "1a4dk3hnqsckr55711ql3tepus"
                    request.delete({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/events/' + eventid,
                        headers: {
                            'Authorization': auth
                        }

                    }, function(err, response, body) {
                        if (!err) {

                            //body = JSON.parse(body);
                            console.log(response, body)

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


    app.get('/googlecalender/deleteacl', (req, res) => {
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
                    var auth = "Bearer " + access_token;
                    request.delete({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/np4qfs6med0m5qpiv00peg48bk@group.calendar.google.com/acl/user:mazen@egeotechnical.com',
                        headers: {
                            'Authorization': auth
                        }

                    }, function(err, response, body) {
                        if (!err) {

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
    }) //End of Route

    app.get('/mycalender/metadata', (req, res) => {
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
                    var auth = "Bearer " + access_token;
                    request({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/egeotechnical@egeotechnical-199216.iam.gserviceaccount.com',
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
    }) //End of Route



    app.get('/mycalender/showcalendarlist', (req, res) => {
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
                    var auth = "Bearer " + access_token;
                    request({
                        url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
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
    }) //End of Route

    app.get('/googlecalendar/createcalendar', (req, res) => {
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
                    var calendar = {
                        "summary": "GFK & Associates",
                        "timeZone": "America/Los_Angeles"
                    }
                    calendar = JSON.stringify(calendar)
                    request.post({
                        url: 'https://www.googleapis.com/calendar/v3/calendars',
                        body: calendar,
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

} // End of Export
