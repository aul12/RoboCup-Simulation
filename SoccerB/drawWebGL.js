var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
var canvas = document.getElementById("canvasField");
var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
var loader = new THREE.ColladaLoader();

renderer.setSize(WIDTH*SCALE, HEIGHT*SCALE);

renderer.setClearColor( 0xffffff, 1);

camera.position.x = 0;
camera.position.y = -100;
camera.position.z = 100;

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;


var light = new THREE.AmbientLight(0xA4A4A4);
scene.add( light );

var ballTexture = THREE.ImageUtils.loadTexture('res/textureBall.png');
var ballMaterial = new THREE.MeshPhongMaterial({map: ballTexture});
var ballGeometry = new THREE.SphereGeometry(3.7);
var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
ballMesh.position.z = 3.7;
scene.add(ballMesh);

var fieldTexture = THREE.ImageUtils.loadTexture('res/textureField.png');
var fieldGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, 0);
var fieldMaterial = new THREE.MeshBasicMaterial({map: fieldTexture});
var fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
scene.add(fieldMesh);

var groundGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, -10);
var groundMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.z = -5;
scene.add(groundMesh);


var goalYellowMesh, goalBlueMesh;
loader.load('res/GoalYellow.dae', function (result) {
    goalYellowMesh = result.scene;
    goalYellowMesh.position.set(30 - WIDTH/2, 60.5 - HEIGHT/2, 0);
    goalYellowMesh.scale.set(2.54, 2.54, 2.54);
    goalYellowMesh.rotation.z = Math.PI * 0.5;
    goalYellowMesh.visible = true;
    scene.add(goalYellowMesh);
});
loader.load('res/GoalBlue.dae', function (result) {
    goalBlueMesh = result.scene;
    goalBlueMesh.position.set(WIDTH-30 - WIDTH/2, 120.5 - HEIGHT/2, 0);
    goalBlueMesh.scale.set(2.54, 2.54, 2.54);
    goalBlueMesh.rotation.z = Math.PI * 1.5;
    goalBlueMesh.visible = true;
    scene.add(goalBlueMesh);
});

var robotMesh = [0,0,0,0];
loader.load('res/Robot.dae', function (result) {
    robotMesh[0] = result.scene;
    robotMesh[0].scale.set(2.54, 2.54, 2.54);
    robotMesh[0].position.set(0,0,5);
    robotMesh[0].visible = true;
    scene.add(robotMesh[0]);
});
loader.load('res/Robot.dae', function (result) {
    robotMesh[1] = result.scene;
    robotMesh[1].scale.set(2.54, 2.54, 2.54);
    robotMesh[1].position.set(0,0,5);
    robotMesh[1].visible = true;
    scene.add(robotMesh[1]);
});
loader.load('res/Robot.dae', function (result) {
    robotMesh[2] = result.scene;
    robotMesh[2].scale.set(2.54, 2.54, 2.54);
    robotMesh[2].position.set(0,0,5);
    robotMesh[2].visible = true;
    scene.add(robotMesh[2]);
});
loader.load('res/Robot.dae', function (result) {
    robotMesh[3] = result.scene;
    robotMesh[3].scale.set(2.54, 2.54, 2.54);
    robotMesh[3].position.set(0,0,5);
    robotMesh[3].visible = true;
    scene.add(robotMesh[3]);
});


render();

function render() {
    requestAnimationFrame( render );



    for(var c=0; c<4; c++) {
        if(ROBOT_ENABLE[c]){
            robotMesh[c].visible = true;
            robotMesh[c].position.x = robot[c].x - WIDTH / 2;
            robotMesh[c].position.y = robot[c].y - HEIGHT / 2;
            if(c<2)
                robotMesh[c].rotation.z = robot[c].rotation / 180 * Math.PI;
            else
                robotMesh[c].rotation.z = (robot[c].rotation / 180 * Math.PI) + Math.PI;
        }else{
            robotMesh[c].visible = false;
        }
    }

    ballMesh.position.x = ball.x - WIDTH/2;
    ballMesh.position.y = ball.y - HEIGHT/2;

    if(running){

        ballMesh.rotation.y = ball.x / 6 + ball.rotation;
        ballMesh.rotation.z = ball.y / 6 + ball.rotation;
    }

    if(POV){
         camera.position.x = robotMesh[POVRobot].position.x + (robotN>=2?-4:4);
         camera.position.y = robotMesh[POVRobot].position.y;
         camera.position.z = 20;


         camera.rotation.x = Math.PI/2;
         camera.rotation.y = -Math.PI/2 + robotMesh[POVRobot].rotation.z;
         camera.rotation.z = 0;
    }


    renderer.render( scene, camera );
}

function draw(){

}

function initDraw(){



}