var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2();

function ec2Operations() {
    var params = {
        InstanceIds: [
           "i-0c31f4bda85a03544","i-055f71f4b45e90a4e"
        ]
       };
       ec2.stopInstances(params, function(err, data) {
         if (err) 
         {
             console.log(err, err.stack); // an error occurred
         }
         else    
         {

         console.log(data); 
         }          // successful response
        
       });
 

}



module.exports.handler = ec2Operations;