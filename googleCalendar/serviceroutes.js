const request = require("request");
const base64url = require("base64url");
var crypto = require('crypto');
const keys = require("../keys");
module.exports = app => {

    app.get('/oauth20/clientcredential/fetchevents', (req, res) => {
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
                        url: 'https://www.googleapis.com/calendar/v3/calendars/egeotechnical@egeotechnical-199216.iam.gserviceaccount.com/events',
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

}
