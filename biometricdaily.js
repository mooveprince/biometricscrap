const emailSender = require('./util/mailsender');
const canadaBiometric = require ('./util/canadabiometric');

module.exports.getDailyStatus = (event, context, callback) => {
    console.log("RUNS AT 7 AM :: CURRENT EXECUTION :: " + new Date().toLocaleTimeString());

    let apiResult = canadaBiometric.canadaBiometricStatus ();    
    apiResult.then (data => {
      console.log("Data from site " + data); 
      if (data && (data.toUpperCase().search("DISRUPTIONS") != -1)  ) {
        emailSender.sendEmail( "Still Cancelled - Biometrics service is still disrupted" );
      } else {
        emailSender.sendEmail( "Not Seeing Disruption in the page. Time to book the appointment" );
      }

    });
}