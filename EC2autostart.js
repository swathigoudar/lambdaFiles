var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var sns = new AWS.SNS();
var ec2 = new AWS.EC2();


function ec2Operations() {
    SNSOperations('ec2 instance stopped, lambda wil try to autostart the instance', 'lambda will be called')
    var params = {
        InstanceIds: [
           "i-01dfe3b400bd53ab71"
        ]
       };
       ec2.startInstances(params, function(err, data) {
         if (err) 
         {
             console.log(err, err.stack); // an error occurred
             SNSOperations('failed', 'start failed');
         }
         else    
         {

         console.log('successfully started' + data); 
         SNSOperations('instance started successfully','instance started');
         }          // successful response
        
       });
 

}

function SNSOperations(msg, sub) {

  
    var params = {
        Message: msg, /* required */
       
        
        Subject: sub,
        
        TopicArn: 'arn:aws:sns:us-east-1:636972721882:LambdaTopic'
      };
      sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    
 

}



module.exports.handler = ec2Operations;