var camera, scene, render;
var geometry, material, mesh;
var controls;
var currentCamera = 1;
var chair_obj = [];
var table_obj = [];
var lamp_obj = [];
var acceleration = 0;
var velocity = 0;
var clock = new THREE.Clock();
var delta = 0;
var VELOCITY_MAX = 15;
var axis = new THREE.Vector3(0, 1, 0);
var rotate_bool = 0;
var direction = 1;
var fez_coisas_com_73;
var fez_coisas_com_75;
var canIrefreshMesh = false;

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
    if(rotate_bool)
        rotateChair();
    else
        translateChair();
}

function rotateChair() { //Direction: 1 --> clockwise; -1 --> counter-clockwise
    delta = clock.getDelta();
    for(var i = 0; i < chair_obj.length; i++)
        chair_obj[i].rotateOnAxis(axis, rotate_bool * direction * Math.PI / 180);
}

function translateChair() {
    delta = clock.getDelta();
    previous_velocity = velocity;
    velocity += acceleration * delta;
    if (velocity * previous_velocity < 0) {
        velocity = 0;
        acceleration = 0;
    }
    else if (Math.abs(velocity) >= VELOCITY_MAX)
        acceleration = 0;
    for(var i = 0; i < chair_obj.length; i++){
        chair_obj[i].translateZ(velocity * delta + 0.5 * acceleration * delta * delta);
    }
}

function onKeyDown(event){
    var code = event.keyCode;
    if(event.type === "keydown") {
        switch(code){
            case 74: //Left
                if(acceleration === 0) {
                    rotate_bool = 1;
                    direction = 1;
                }
                break;
            case 73: //Up
                if(rotate_bool === 0 && acceleration === 0 && velocity === 0) {
                    fez_coisas_com_73 = true;
                    acceleration = -5; 
                    translate = true;  
                }
                break;
            case 76: //Right
                if(acceleration === 0) {
                    rotate_bool = 1;
                    direction = -1;
                }
                break;
            case 75: //Down
                if(rotate_bool === 0 && acceleration === 0 && velocity === 0) {
                    fez_coisas_com_75 = true;
                    acceleration = 5;
                    translate = true;
                }
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
            default:
                break;
        }
    }
    render();
}

function onKeyUp(event) {
    switch(event.keyCode) {
        case 73: //UP
            if(fez_coisas_com_73) {
                fez_coisas_com_73 = false;
                acceleration = 5;
            }
            translate = false;
            break;
        case 74: //LEFT
            rotate_bool = 0;
            break;
        case 75: //DOWN
            if(fez_coisas_com_75) {
                fez_coisas_com_75 = false;
                acceleration = -5;
            }
            translate = false;
            break;
        case 76: //RIGHT
            rotate_bool = 0;
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