var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
var ec2 = new AWS.EC2();
var sns = new AWS.SNS();

function ec2Operations() {
    SNSoperations('lambda is triggered', 'lambda step1');
    ec2StopInstance();
}

function ec2StopInstance() {
    SNSoperations('Instance is stoping', 'lambda step2');
    var params = {
        InstanceIds: [
            "i-0d1ca6f966fef0c59"
        ]
    };
    ec2.stopInstances(params, function (err, data) {
        if (err) {
            console.log('error in stopping the instance', err, err.stack); // an error occurred
            SNSoperations('eror in stoping instance', 'error1');
        }
        else {

            console.log('successfully stopped' + data);

            ec2.waitFor('instanceStopped', params, function (err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                }

                else {
                    ec2DetachVol();
                    console.log(data);           // successful response
                }

            });


        }          // successful response

    });

}


function ec2DetachVol() {
    SNSoperations('instance is stopped & volume is detaching', 'lambda step3');
    var params = {
        VolumeId: "vol-0b41f58593f6f6e19"
    };
    ec2.detachVolume(params, function (err, data) {
        if (err) {
            console.log('error in detaching', err, err.stack); // an error occurred
            SNSoperations('error in detaching volume', 'error2');
        }

        else {
            console.log('detached successfully' + data);
            setTimeout(function () {
                ec2AttachVol();
            }, 30000)

        }        // successful response

    });
}

function ec2AttachVol() {
    SNSoperations('volume is detached & attaching', 'lambda step4');
    var params = {
        Device: "/dev/sda1",
        InstanceId: "i-0d1ca6f966fef0c59",
        VolumeId: "vol-00ace8c9ed12a5087"
    };
    ec2.attachVolume(params, function (err, data) {
        if (err) {
            console.log('error in attaching volume', err, err.stack); // an error occurred
            SNSoperations('error in attaching volume', 'error3');
        }
        else {
            console.log('attached successfully' + data);
            setTimeout(function () {
                ec2StartInstance();
            }, 30000)    // successful response
        }
    });
}

function ec2StartInstance() {
    SNSoperations('volume is attached & instance is starting', 'lambda step5');
    var params = {
        InstanceIds: [
            "i-0d1ca6f966fef0c59"
        ]
    };
    ec2.startInstances(params, function (err, data) {
        if (err) {
            console.log('error in starting the instance', err, err.stack); // an error occurred
            SNSoperations('error in starting instance', 'error4');
        }
        else {

            console.log('successfully started' + data);
            SNSoperations('Instance started', 'lambda step6');
        }          // successful response

    });

}

function SNSoperations(msg, sub) {

    var params = {
        Message: msg, /* required */
        Subject: sub,
        TopicArn: 'arn:aws:sns:us-east-1:636972721882:LambdaTopic'
    };

    sns.publish(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });

}
module.exports.handler = ec2Operations;