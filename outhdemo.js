const express = require("express");
const app = express();
const request = require("request");

app.get('/', (req, res) => {

    res.send("google-site-verification: google1904836aa719f2f4.html")
})
app.get('/oauth20/democallback/', (req, res) => {
    var grant_type = 'authorization_code';
    var code = req.query.code;
    var redirect_uri = 'https%3A%2F%2Fwebdevbootcamp-mazenoncloud9.c9users.io%3A8080%2Foauth20%2Fdemocallback'
    var client_id = '285043410165-qabp92ca9ss0148lbkqvl2icqo6kkvdj.apps.googleusercontent.com'
    var client_secret = 'F-Hnj5cJZoLqqRoxnwyn2laj'
    var values = "grant_type=" + grant_type +
        "&code=" + code +
        "&redirect_uri=" + redirect_uri +
        "&client_id=" + client_id +
        "&client_secret=" + client_secret;
        console.log(values)
    request.post({
            url: 'https://accounts.google.com/o/oauth2/token',
            form: values,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        function(err, httpResponse, body) {
            if (!err) {

                res.send(body);
            }
            else {
                res.send(err)
            }


        })
})
app.listen(process.env.PORT);
