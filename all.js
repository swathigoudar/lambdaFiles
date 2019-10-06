var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var iam = new AWS.IAM();
var s3 = new AWS.S3();
var ec2 = new AWS.EC2();
var sns = new AWS.SNS();


function IAMOperations() {
    SNSOperations('starting IAM operation', 'IAM operation in progress');
 var params = {
  UserName: "bobTheBuilder2"
 };
 iam.createUser(params, function(err, data) {
   if (err) 
   {
       console.log(err, err.stack); // an error occurred
   }
   else    
   {
        console.log("user is successfully created"+ data);           // successful response
        s3Operations();
   }
 });
}

function s3Operations() {
    SNSOperations('IAM operation complete', 'IAM operation complete');
    SNSOperations('starting S3 operation', 'S3 operation in progress');
    var params = {
        Bucket: "techmax20192020soumyahj"
    };
    s3.createBucket(params, function (err, data) {
        if (err) {
            console.log("Error in Creating Bucket->" + err + err.stack);
        }
        else {
            console.log("Success in creating bucket->" + data);
            ec2Operations();
        }

    });

}




function ec2Operations() {
    SNSOperations('S3 operation complete', 'S3 operation complete');
    SNSOperations('starting EC2 operation', 'EC2 operation in progress');
    var params = {
        BlockDeviceMappings: [
           {
          DeviceName: "/dev/sdh", 
          Ebs: {
           VolumeSize: 8
          }
         }
        ], 
        ImageId: "ami-04b9e92b5572fa0d1", 
        InstanceType: "t2.micro", 
        KeyName: "140919", 
        MaxCount: 1, 
        MinCount: 1, 
        SecurityGroupIds: [
           "sg-0099b38c537a6f91d"
        ], 
        SubnetId: "subnet-0b480e6c", 
        TagSpecifications: [
           {
          ResourceType: "instance", 
          Tags: [
             {
            Key: "Purpose", 
            Value: "test"
           }
          ]
         }
        ]
       };
       ec2.runInstances(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log("successfully created" + data);  
         SNSOperations('EC2 complete', 'EC2 complete');         // successful response
         /*
         data = {
         }
         */
       });
    
    }    

function SNSOperations(msg,subject) {
          
  
    var params = {
        Message: msg, /* required */
       
        
        Subject:  subject,
        
        TopicArn: 'arn:aws:sns:us-east-1:636972721882:LambdaTopic'
      };
      sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    
 

}




module.exports.handler = IAMOperations;