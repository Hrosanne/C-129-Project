var song = "";
var leftWrist_x = 0;
var leftWrist_y = 0;
var rightWrist_x = 0;
var rightWrist_y = 0;
var scoreLeftWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score - Left Wrist = "+scoreLeftWrist);
        leftWrist_x = results[0].pose.leftWrist.x ;
        leftWrist_y = results[0].pose.leftWrist.y ;
        rightWrist_x = results[0].pose.rightWrist.x ; 
        rightWrist_y = results[0].pose.rightWrist.y ; 
        console.log("Left Wrist X = "+leftWrist_x+"; Left Wrist Y = "+leftWrist_y);
        console.log("Right Wrist X = "+rightWrist_x+"; Right Wrist Y = "+rightWrist_y);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2){
    circle(leftWrist_x,leftWrist_y,20);
    numberLeftWrist_Y = Number(leftWrist_y);
    removeDecimal = floor(numberLeftWrist_Y);
    volume = removeDecimal/500;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}