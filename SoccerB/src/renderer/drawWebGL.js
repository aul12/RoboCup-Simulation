var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, (WIDTH + 0.41) / HEIGHT, 0.1, 1000 );
var canvas = document.getElementById("canvasField");
var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
var loader = new THREE.ColladaLoader();

var renderRunning = false;

console.warn = function(){
    //Muhahah!
};

$("#canvasField").click(function(event){
    var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = ( (event.clientX) / ((WIDTH)*SCALE) ) * 2 - 1;
    mouse.y = - ( event.clientY / (HEIGHT*SCALE) ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var pos = raycaster.ray.intersectPlane(planeZ);

    ball.x = pos.x + WIDTH/2;
    ball.y = pos.y + HEIGHT/2;

    ball.v.x = 0;
    ball.v.y = 0;

    lackOfProgressCounter = 0;
});

renderer.setSize(WIDTH*SCALE, HEIGHT*SCALE);

renderer.setClearColor( 0xffffff, 1);

camera.position.x = 0;
camera.position.y = -0.90;
camera.position.z = 0.90;

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var light = new THREE.AmbientLight(0xA4A4A4);
scene.add( light );

var ballTexture = THREE.ImageUtils.loadTexture('../res/textureBall.png');
var ballMaterial = new THREE.MeshPhongMaterial({map: ballTexture});
var ballGeometry = new THREE.SphereGeometry(0.037);
var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
ballMesh.position.z = 0.037;
scene.add(ballMesh);

var fieldTexture = THREE.ImageUtils.loadTexture('../res/textureField.png');
var fieldGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, 0);
var fieldMaterial = new THREE.MeshBasicMaterial({map: fieldTexture});
var fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
scene.add(fieldMesh);

var groundGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, -0.1);
var groundMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.z = -0.05;
scene.add(groundMesh);


var goalYellowMesh, goalBlueMesh;
loader.load('../res/GoalYellow.dae', function (result) {
    goalYellowMesh = result.scene;
    goalYellowMesh.position.set(0.30 - WIDTH/2, 0.605 - HEIGHT/2, 0);
    goalYellowMesh.scale.set(0.0254, 0.0254, 0.0254);
    goalYellowMesh.rotation.z = Math.PI * 0.5;
    goalYellowMesh.visible = true;
    scene.add(goalYellowMesh);
});
loader.load('../res/GoalBlue.dae', function (result) {
    goalBlueMesh = result.scene;
    goalBlueMesh.position.set(WIDTH-0.30 - WIDTH/2, 1.205 - HEIGHT/2, 0);
    goalBlueMesh.scale.set(0.0254, 0.0254, 0.0254);
    goalBlueMesh.rotation.z = Math.PI * 1.5;
    goalBlueMesh.visible = true;
    scene.add(goalBlueMesh);
});

var robotMesh = [0,0,0,0];
loader.load('../res/Robot.dae', function (result) {
    robotMesh[0] = result.scene;
    robotMesh[0].scale.set(0.0254, 0.0254, 0.0254);
    robotMesh[0].position.set(0,0,0.05);
    robotMesh[0].visible = true;
    scene.add(robotMesh[0]);
});
loader.load('../res/Robot.dae', function (result) {
    robotMesh[1] = result.scene;
    robotMesh[1].scale.set(0.0254, 0.0254, 0.0254);
    robotMesh[1].position.set(0,0,0.05);
    robotMesh[1].visible = true;
    scene.add(robotMesh[1]);
});
loader.load('../res/Robot.dae', function (result) {
    robotMesh[2] = result.scene;
    robotMesh[2].scale.set(0.0254, 0.0254, 0.0254);
    robotMesh[2].position.set(0,0,0.05);
    robotMesh[2].visible = true;
    scene.add(robotMesh[2]);
});
loader.load('../res/Robot.dae', function (result) {
    robotMesh[3] = result.scene;
    robotMesh[3].scale.set(0.0254, 0.0254, 0.0254);
    robotMesh[3].position.set(0,0,0.05);
    robotMesh[3].visible = true;
    scene.add(robotMesh[3]);
});




function render() {
    renderRunning = true;
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
         camera.position.x = robotMesh[POVRobot].position.x + (POVRobot>=2?-4:4);
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