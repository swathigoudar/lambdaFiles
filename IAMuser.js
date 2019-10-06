var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var iam = new AWS.IAM();

function IAMOperations() {

  
 var params = {
  UserName: "Bob"
 };
 iam.createUser(params, function(err, data) {
   if (err) 
   {
       console.log(err, err.stack); // an error occurred
   }
   else    
   {
        console.log(data);           // successful response
   }
   
 });
    
 

}



module.exports.handler = IAMOperations;