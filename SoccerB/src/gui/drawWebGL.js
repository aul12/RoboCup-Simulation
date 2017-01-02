console.warn = function(){};

var WebGlRenderer = {
    init: function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, (WIDTH + 0.41) / HEIGHT, 0.1, 1000);
        this.canvas = document.getElementById("canvasField");
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
        this.loader = new THREE.ColladaLoader();

        this.renderer.setSize(WIDTH*SCALE, HEIGHT*SCALE);

        this.renderer.setClearColor( 0xffffff, 1);

        this.camera.position.x = 0;
        this.camera.position.y = -0.90;
        this.camera.position.z = 0.90;

        var controls = new THREE.OrbitControls(this.camera,this.renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        var light = new THREE.AmbientLight(0xA4A4A4);
        this.scene.add(light);

        var ballTexture = THREE.ImageUtils.loadTexture('../res/textureBall.png');
        var ballMaterial = new THREE.MeshPhongMaterial({map: ballTexture});
        var ballGeometry = new THREE.SphereGeometry(0.037);
        this.ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
        this.ballMesh.position.z = 0.037;
        this.scene.add(this.ballMesh);

        var fieldTexture = THREE.ImageUtils.loadTexture('../res/textureField.png');
        var fieldGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, 0);
        var fieldMaterial = new THREE.MeshBasicMaterial({map: fieldTexture});
        var fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
        this.scene.add(fieldMesh);

        var groundGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, -0.1);
        var groundMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
        var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.position.z = -0.05;
        this.scene.add(groundMesh);

        this.loader.load('../res/GoalYellow.dae', function (result) {
            this.goalYellowMesh = result.scene;
            goalYellowMesh.position.set(0.30 - WIDTH/2, 0.605 - HEIGHT/2, 0);
            goalYellowMesh.scale.set(0.0254, 0.0254, 0.0254);
            goalYellowMesh.phi.z = Math.PI * 0.5;
            goalYellowMesh.visible = true;
            WebGlRenderer.scene.add(this.goalYellowMesh);
        });
        this.loader.load('../res/GoalBlue.dae', function (result) {
            this.goalBlueMesh = result.scene;
            goalBlueMesh.position.set(WIDTH-0.30 - WIDTH/2, 1.205 - HEIGHT/2, 0);
            goalBlueMesh.scale.set(0.0254, 0.0254, 0.0254);
            goalBlueMesh.phi.z = Math.PI * 1.5;
            goalBlueMesh.visible = true;
            WebGlRenderer.scene.add(this.goalBlueMesh);
        });

        this.robotMesh = [4];
        this.loader.load('../res/Robot.dae', function (result) {
            WebGlRenderer.robotMesh[0] = result.scene;
            WebGlRenderer.robotMesh[0].scale.set(0.0254, 0.0254, 0.0254);
            WebGlRenderer.robotMesh[0].position.set(0,0,0.05);
            WebGlRenderer.robotMesh[0].visible = true;
            WebGlRenderer.scene.add(WebGlRenderer.robotMesh[0]);
        });
        this.loader.load('../res/Robot.dae', function (result) {
            WebGlRenderer.robotMesh[1] = result.scene;
            WebGlRenderer.robotMesh[1].scale.set(0.0254, 0.0254, 0.0254);
            WebGlRenderer.robotMesh[1].position.set(0,0,0.05);
            WebGlRenderer.robotMesh[1].visible = true;
            WebGlRenderer.scene.add(WebGlRenderer.robotMesh[1]);
        });
        this.loader.load('../res/Robot.dae', function (result) {
            WebGlRenderer.robotMesh[2] = result.scene;
            WebGlRenderer.robotMesh[2].scale.set(0.0254, 0.0254, 0.0254);
            WebGlRenderer.robotMesh[2].position.set(0,0,0.05);
            WebGlRenderer.robotMesh[2].visible = true;
            WebGlRenderer.scene.add(WebGlRenderer.robotMesh[2]);
        });
        this.loader.load('../res/Robot.dae', function (result) {
            WebGlRenderer.robotMesh[3] = result.scene;
            WebGlRenderer.robotMesh[3].scale.set(0.0254, 0.0254, 0.0254);
            WebGlRenderer.robotMesh[3].position.set(0,0,0.05);
            WebGlRenderer.robotMesh[3].visible = true;
            WebGlRenderer.scene.add(WebGlRenderer.robotMesh[3]);
        });
    },

    click: function (event) {
        var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

        var rayCaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        mouse.x = ( (event.clientX) / ((WIDTH) * SCALE) ) * 2 - 1;
        mouse.y = -( event.clientY / (HEIGHT * SCALE) ) * 2 + 1;
        rayCaster.setFromCamera(mouse, this.camera);
        var pos = rayCaster.ray.intersectPlane(planeZ);

        ball.x = pos.x + WIDTH / 2;
        ball.y = pos.y + HEIGHT / 2;

        ball.v.x = 0;
        ball.v.y = 0;

        Rules.lackOfProgressCounter = 0;
    },

    render: function () {
        requestAnimationFrame(WebGlRenderer.render);

        for(var c=0; c<4; c++) {
            if(ROBOT_ENABLE[c]){
                WebGlRenderer.robotMesh[c].visible = true;
                WebGlRenderer.robotMesh[c].position.x = robot[c].x - WIDTH / 2;
                WebGlRenderer.robotMesh[c].position.y = robot[c].y - HEIGHT / 2;
                if(c<2)
                    WebGlRenderer.robotMesh[c].phi.z = robot[c].phi / 180 * Math.PI;
                else
                    WebGlRenderer.robotMesh[c].phi.z = (robot[c].phi / 180 * Math.PI) + Math.PI;
            }else{
                WebGlRenderer.robotMesh[c].visible = false;
            }
        }

        WebGlRenderer.ballMesh.position.x = ball.x - WIDTH/2;
        WebGlRenderer.ballMesh.position.y = ball.y - HEIGHT/2;
        WebGlRenderer.ballMesh.phi.y = ball.x / 6 + ball.phi;
        WebGlRenderer.ballMesh.phi.z = ball.y / 6 + ball.phi;

        WebGlRenderer.renderer.render(WebGlRenderer.scene,WebGlRenderer.camera );
    }
};