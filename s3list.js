var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var s3 = new AWS.S3();

function s3Operations() {

    var params = {};
    s3.listBuckets(params, function(err, data) {
      if (err) 
      {console.log(err, err.stack); // an error occurred
      }
      else     
    {
        console.log(data);           // successful response
    }
     
    });

}



module.exports.handler = s3Operations;