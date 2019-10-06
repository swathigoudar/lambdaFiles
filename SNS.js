var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var sns = new AWS.SNS();




function SNSOperations() {

  
    var params = {
        Message: "I'm lambda function", /* required */
       
        
        Subject: 'Lambda function',
        
        TopicArn: 'arn:aws:sns:us-east-1:636972721882:LambdaTopic'
      };
      sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    
 

}



module.exports.handler = SNSOperations;