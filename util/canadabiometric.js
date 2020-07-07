var rp = require('request-promise');
var cheerio = require('cheerio');
var emailSender = require('../util/mailsender');


var canadaBiometricStatus = function () {
    var options = {
        uri: 'https://www.cic.gc.ca/english/information/where-to-give-biometrics.asp',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    return rp(options)
        .then(function ($) {
            return $('.alert-warning').children().first().text().trim();
        })
            .catch(function (err) {
                emailSender.sendEmail( "Something wrong with the automation job" );
        });
}


module.exports = {
    canadaBiometricStatus : canadaBiometricStatus
}