var camera, scene, render;
var geometry, material, mesh;
var controls;
var chair_obj = [];
var table_obj = [];
var lamp_obj = [];
var acceleration = 1.2;
var velocity = 0.01;
var chair_pos = new THREE.Vector3();
var clock = new THREE.Clock();
var delta = 0;

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
    scene.add(new THREE.AxesHelper(1));

    addPlane();
    createSeat();
    createTable();
    createLamp();
}

function createCamera(){

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.x = 8;
    camera.position.y = 8;
    camera.position.z = 8;
    camera.lookAt(scene.position);
}

function render(){
    renderer.render(scene, camera);
}

function onResize(){

    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerHeight > 0 && window.innerWidth > 0){
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
    }
}

function onKeyDown(event){
    var code = event.keyCode;

    switch(code){
        case 16: //Left
            delta = clock.getDelta();
            chair_pos.addScalar(velocity*delta + 0.5*acceleration*delta*delta);
            for(var i = 0; i < chair_obj.length; i++){
                chair_obj[i].translateX(-(velocity*delta + 0.5*acceleration*delta*delta));
                console.log(chair_pos.x + ',' + chair_pos.y + ',' + chair_pos.z);
            }
            delta = 0;
            break;
        case 38: //Up
            break;
        case 39: //Right
            break;
        case 40: //Down
            break;
        case 65: //a
        case 97: //A
            scene.traverse(function (node){
                if(node instanceof THREE.Mesh){
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        default: break;
    }

    render();
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

    controls = new THREE.OrbitControls(camera, renderer.domELement);
}