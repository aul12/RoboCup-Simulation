var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
var canvas = document.getElementById("canvasField");
var renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(WIDTH*SCALE, HEIGHT*SCALE);


camera.position.x = 0;
camera.position.y = -150;
camera.position.z = 150;

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(100, 100, 250);
scene.add(pointLight);

var ballTexture = THREE.ImageUtils.loadTexture('res/ball.png');
var ballMaterial = new THREE.MeshPhongMaterial({map: ballTexture});
var ballGeometry = new THREE.SphereGeometry(3.7);
var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
ballMesh.position.z = 3.7;
scene.add(ballMesh);

var fieldTexture = THREE.ImageUtils.loadTexture('res/field.png');
var fieldGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, 0);
var fieldMaterial = new THREE.MeshBasicMaterial({map: fieldTexture});
var fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
scene.add(fieldMesh);

var goalYellowTexture = THREE.ImageUtils.loadTexture('res/textureGoalYellow.png');
var goalYellowGeometry = new THREE.BoxGeometry(10, 60, 10);
var goalYellowMaterial = new THREE.MeshPhongMaterial({map: goalYellowTexture});
var goalYellowMesh = new THREE.Mesh(goalYellowGeometry, goalYellowMaterial);
goalYellowMesh.position.set(25 - WIDTH/2, 90.5 - HEIGHT/2, 5);
scene.add(goalYellowMesh);

var goalBlueTexture = THREE.ImageUtils.loadTexture('res/textureGoalBlue.png');
var goalBlueGeometry = new THREE.BoxGeometry(10, 60, 10);
var goalBlueMaterial = new THREE.MeshPhongMaterial({map: goalBlueTexture});
var goalBlueMesh = new THREE.Mesh(goalBlueGeometry, goalBlueMaterial);
goalBlueMesh.position.set(WIDTH-25 - WIDTH/2, 90.5 - HEIGHT/2, 5);
scene.add(goalBlueMesh);

var robotGeometry = new THREE.CylinderGeometry(ROBOT_SIZE, ROBOT_SIZE, 16, 16);
var robotMaterial = new THREE.MeshPhongMaterial({color: 0x000000});

var robotMesh = [new THREE.Mesh(robotGeometry, robotMaterial),
                    new THREE.Mesh(robotGeometry, robotMaterial),
                    new THREE.Mesh(robotGeometry, robotMaterial),
                    new THREE.Mesh(robotGeometry, robotMaterial)];

for(var c=0; c<4; c++){
    robotMesh[c].rotation.x = Math.PI/2;
    robotMesh[c].position.z = 8;
    scene.add(robotMesh[c]);
}

function render() {
    requestAnimationFrame( render );

    for(var c=0; c<4; c++) {
        if(ROBOT_ENABLE[c]){
            robotMesh[c].visible = true;
            robotMesh[c].position.x = robot[c].x - WIDTH / 2;
            robotMesh[c].position.y = robot[c].y - HEIGHT / 2;
            robotMesh[c].rotation.y = robot[c].rotation / 180 * Math.PI;
        }else{
            robotMesh[c].visible = false;
        }

    }

    if(running){
        ballMesh.position.x = ball.x - WIDTH/2;
        ballMesh.position.y = ball.y - HEIGHT/2;
        ballMesh.rotation.x += ball.speed.x;
        ballMesh.rotation.y += ball.speed.y;
    }
    renderer.render( scene, camera );
}

function draw(){

}

function initDraw(){


    render();
}