const express = require("express");
const app = express();
const request = require("request");
const keys = require("./keys");
const redirect_uri = keys.googleCallbackURL;
const client_id = keys.googleClientID;
const client_secret = keys.googleClientSecret;
const testrequest = 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=' + redirect_uri +
    '&prompt=consent&response_type=code&client_id=' + client_id + '&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&access_type=offline'

app.get('/', (req, res) => {

    res.send("<a href=" + testrequest + ">" + testrequest + "</a>")
})
app.get('/oauth20/democallback/', (req, res) => {
    var grant_type = 'authorization_code';
    var code = req.query.code;

    var values = "grant_type=" + grant_type +
        "&code=" + code +
        "&redirect_uri=" + redirect_uri +
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
                console.log(auth)
                request({
                    url: 'https://www.googleapis.com/calendar/v3/calendars/immaisoncrosby@gmail.com/events',
                    headers: {
                        'Authorization': auth
                    }
                }, function(err, response, body) {
                    body = JSON.parse(body);
                    res.send(body)
                })

            }
            else {
                res.send(err)
            }


        })
})
app.listen(process.env.PORT);
