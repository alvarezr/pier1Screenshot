var BrowserStack = require('browserstack'),
 _ = require('lodash'),
 browser = require('./lib/browsers'),
 basePath = './public/screenshots/',
 request = require('request'),
 fs = require('fs'),
 JobsQueue = [],
 retryInterval = 20000,
 browserStackCredentials = {
    username: '',
    password: ''
 },
 download = function(uri, file, callback) {
     console.log(uri, file);
     request.head(uri, function(err, res, body) {
         console.log('content-type:', res.headers['content-type']);
         console.log('content-length:', res.headers['content-length']);
         
         var r = request(uri).pipe(fs.createWriteStream(basePath + file));
         r.on('close', callback);
         r.on('error', callback);
        
    });
 },
 _client = BrowserStack.createScreenshotClient(browserStackCredentials);

_.forEach(browser.getList(),function(value, key, array){
    _client.generateScreenshots(value, function(err, job){
         if (!err) {
            JobsQueue.push(job.job_id);
            if (key === array.length - 1){
                processScreenShot();
            }

         }else{
             console.warn(err);
         }
    });    
});

function processScreenShot(){
    _.forEach(JobsQueue,function(job){
       return getScreenshotsInfo(job);
    });

    if(JobsQueue.length){
        setTimeout(function (){
            console.log('retrying...');
            processScreenShot();
        }, retryInterval);
    }else{
        console.log('done...');
    }
}

function getScreenshotsInfo(currentJobId){   
    _client.getJob(currentJobId, function(err, job) {
        if (!err) {
            if(job.state == 'done'){
                //remove job from queue
                JobsQueue.splice(currentJobId, 1);
                _.forEach(job.screenshots, function(screen){
                    // split url  
                    if(screen.image_url){
                        let img_src = randomId() + '_' + _.last(screen.image_url.split('/'));
                        download(screen.image_url, img_src, function(e) {}); 
                    }                  
                });

                if(!JobsQueue.length){
                    return false;
                }
                return true;
            }else{
                return false;
            }
        }else{
          console.log(err)
        }    
    });
}

function randomId(){
    let d = new Date();
    return d.valueOf() + Math.random().toString(16).substr(2,9);
}



   