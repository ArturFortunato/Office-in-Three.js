var camera, scene, render;
var geometry, material, mesh;
var controls;
var currentCamera = 1;
var table_obj = [];
var lamp_obj = [];
var acceleration = 0;
var velocity = 0;
var clock = new THREE.Clock();
var delta = 0;
var VELOCITY_MAX = 15;
var axis = new THREE.Vector3(0, 1, 0);
var direction = 1;
var rotate_wheels = false;
var chair = new THREE.Object3D();
var angle = null;

var up = false;
var down = false;
var left = false;
var right = false;

function addPlane(){
    var geometry = new THREE.PlaneGeometry( 20, 20 , 20 );
    var material = new THREE.MeshBasicMaterial( {color: 0xa9a9a9, side: THREE.DoubleSide, wireframe: true} );
    var plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI / 2);
    plane.position.set(0, -2, 0);
    
    scene.add(plane);
}

function animate(){
    
    requestAnimationFrame(animate);
    render();   
}

function createScene(){

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));

    addPlane();
    createSeat();
    createTable();
    createLamp();
}

function createCamera(){

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.3, 1000);

    camera.position.x = 8;
    camera.position.y = 8;
    camera.position.z = 8;
    camera.lookAt(scene.position);  
}

function render(){
    refreshChairPosition();
    renderer.render(scene, camera);
}

function onResize(){

    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerHeight > 0 && window.innerWidth > 0){
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
    }
}

function refreshChairPosition() {
    delta = clock.getDelta();
    canTranslate = true;
    if((up || down) && rotate_wheels)
        canTranslate = rotateWheels();
    if (left || right)
        rotateChair();
    else if(canTranslate)
        translateChair();
}

function rotateChair() { //Direction: 1 --> clockwise; -1 --> counter-clockwise
    chair.children[0].rotateOnAxis(axis, direction * Math.PI / 180);
    rotate_wheels = true;
}

function rotateWheels() {
    if(angle === null) {
        angle = (new THREE.Vector3(chair.children[0].matrixWorld.elements[2], 0, chair.children[0].matrixWorld.elements[0])).angleTo(new THREE.Vector3(chair.children[2].matrixWorld.elements[2], 0, chair.children[2].matrixWorld.elements[0]));    
    }
    for(i = 0; i < 6; i++) {
        chair.children[2].children[i].rotateOnAxis(new THREE.Vector3(0, 1, 0), direction * Math.PI / 10);
    }
    angle -= (angle > 0) ? (Math.PI / 10) : - (Math.PI / 10);
    if(angle <= 0) {
        rotate_wheels = false;
        angle = null;
        return true;
    }
    return false;
}

function translateChair() {
    previous_velocity = velocity;
    velocity += acceleration * delta;
    if (velocity * previous_velocity < 0) {
        velocity = 0;
        acceleration = 0;
        up = false;
        down = false;
    }
    else if (Math.abs(velocity) >= VELOCITY_MAX) {

        acceleration = 0;
    }   
    chair.translateOnAxis(new THREE.Vector3(chair.children[0].matrixWorld.elements[8], 0, chair.children[0].matrixWorld.elements[0]), velocity * delta + 0.5 * acceleration * delta * delta);
}

function onKeyDown(event) {
    var code = event.keyCode;
    if(event.type === "keydown") {
        switch(code) {
            case 73: //UP
                if(!left && !down && !right) {
                    acceleration = -5; 
                    up = true;
                }
                break;
            case 74: //LEFT
                if(!up && !down && !right) {
                    direction = 1;
                    left = true;
                }
                break;
            case 75: //DOWN
                if(!left && !up && !right) {
                    acceleration = 5; 
                    down = true;
                }
                break;
            case 76: //RIGHT
                if(!left && !down && !up) {
                    direction = -1; 
                    right = true;
                }
                break;
        }
    }
}

function onKeyUp(event){
    switch(event.keyCode){
        case 73: //UP
            if(up) {
                acceleration = 5;
                up = false;
            }
            break;
        case 74: //LEFT
            if(left)
                left = false;
            break;
        case 75: //DOWN
            if (down) {
                acceleration = -5;
                down = false;
            }
            break;
        case 76: //RIGHT
            if(right)
                right = false;
            break;
        case 65: //a ou A
            scene.traverse(function (node){
                if(node instanceof THREE.Mesh){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 49: //1
            camera.position.x = 8;
            camera.position.y = 8;
            camera.position.z = 8;
            camera.lookAt(scene.position);
            break;
        case 50: //2
            camera.position.x = 0;
            camera.position.y = 2;
            camera.position.z = -12;
            camera.lookAt(scene.position);
            break;
        case 51: //3   
            camera.position.x = -10;
            camera.position.y = 2;
            camera.position.z = 0;
            camera.lookAt(scene.position);
            break;
    }
}

function init(){

    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);    

    createScene();
    createCamera();
    render();

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);

    window.addEventListener('keypress', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    

    controls = new THREE.OrbitControls(camera, renderer.domELement);
}