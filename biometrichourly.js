const emailSender = require('./util/mailsender');
const canadaBiometric = require ('./util/canadabiometric');

module.exports.getHourlyStatus = (event, context, callback) => {
    console.log("RUNS EVERY HOUR :: CURRENT EXECUTION :: " + new Date().toLocaleTimeString());

    let apiResult = canadaBiometric.canadaBiometricStatus ();    
    apiResult.then (data => {
      console.log("Data from site " + data); 
      if (!data || data.trim() === "" || data.trim().toUpperCase().search("DISRUPTIONS") == -1 ) {
        emailSender.sendEmail( "Book Appointment now - Not seeing any biometric disruptions" );
      } else {
          console.log ("still cancelled");
      }
       
    });

}