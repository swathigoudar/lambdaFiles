var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
var ec2 = new AWS.EC2();
