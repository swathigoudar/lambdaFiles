var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
var ec2 = new AWS.EC2();

function ec2Operations() {
    var params = {
        InstanceIds: [
           "i-0766ee7a9ca42ae92"
        ]
       };
       ec2.stopInstances(params, function(err, data) {
         if (err) 
         {
             console.log('error in stopping the instance',err, err.stack); // an error occurred
         }
         else    
         {

         console.log('successfully stopped' + data); 
         setTimeout(function () {
            volDetachOperations();
          }, 30000)

         
         }          // successful response
        
       });
}

function volDetachOperations() {
var params = {
    VolumeId: "vol-068c543e8b2f524bb"
   };
   ec2.detachVolume(params, function(err, data) {
     if (err) 
     {
         console.log('error in detaching', err, err.stack); // an error occurred
   }
   
     else {   
          console.log('detached successfully' + data);  
          setTimeout(function () {
            volAttachOperations();
          }, 30000)
      
    }        // successful response
     
   });
}

function volAttachOperations() {
var params = {
    Device: "/dev/sda1", 
    InstanceId: "i-0766ee7a9ca42ae92", 
    VolumeId: "vol-00ace8c9ed12a5087"
   };
   ec2.attachVolume(params, function(err, data) {
     if (err) {
         console.log('error in attaching volume' , err, err.stack); // an error occurred
     }
     else {
             console.log('attached successfully' + data);       
             setTimeout(function () {
                ec2StartOperations();
              }, 30000)    // successful response
     }
   });
}

function ec2StartOperations() {
    var params = {
        InstanceIds: [
           "i-0766ee7a9ca42ae92"
        ]
       };
       ec2.startInstances(params, function(err, data) {
         if (err) 
         {
             console.log('error in starting the instance',err, err.stack); // an error occurred
         }
         else    
         {

         console.log('successfully started' + data); 
         }          // successful response
        
       });
}


module.exports.handler = ec2Operations;