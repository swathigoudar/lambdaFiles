var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
var s3 = new AWS.S3();
const fs = require('fs');

const fileName = 'contacts.txt';

function uploadFile() {
  fs.readFile(fileName, (err, data) => {
     if (err) {
        console.log('error in uploading file' + err);
     }
     const params = {
         Bucket: 'testbucketswathi', // pass your bucket name
         Key: 'contacts.txt', // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) {
            console.log('error in uploading file' + s3Err);
         }
         else{
         console.log(`File uploaded successfully at ${data.Location}`)
        }
     });
  });
}



module.exports.handler = uploadFile;