var camera, scene, render;
var geometry, material, mesh;
var controls;
var currentCamera = 1;

function animate(){
    
    requestAnimationFrame(animate);
    render();   
}

function createScene(){

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));

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
        case 65: //a
        case 97: //A
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