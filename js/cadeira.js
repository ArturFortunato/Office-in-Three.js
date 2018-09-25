var camera, scene, render;
var geometry, material, mesh;
var controls;

function addSeatWheelSuport(obj, x, y, z, axis, degree){    
    geometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);    
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    
    if(axis == 'x')
        mesh.rotateX(Math.PI / 2); //Rotating mesh by 90 degree in X axis. 
    else if(axis == 'z')  
        mesh.rotateZ(Math.PI / 2); //Rotating mesh by 90 degree in Y axis. 

    if (degree == 1)
        mesh.rotateX(-0.40);
    else if (degree == 2)
        mesh.rotateX(0.40);

    obj.add(mesh);
}

function addSeatLiftCylinder(obj, x, y, z){
    geometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addSeatBack(obj, x, y, z){
    geometry = new THREE.CubeGeometry(3, 3.5, 0.1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotateX(Math.PI/20);

    obj.add(mesh);
}

function addSeatBase(obj, x, y, z){
    geometry = new THREE.CubeGeometry(3, 0.1, 3);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function createSeat(){

    var topPart = new THREE.Object3D();
    var downPart = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    //top part of the chair (back and base seat§)
    addSeatBase(topPart, 0, 0, 0);
    addSeatBack(topPart, 0, 1.70, 1.72);

    //down part of the chair (legs and wheels)
    addSeatLiftCylinder(downPart, 0, -0.75, 0);
    addSeatWheelSuport(downPart, 0, -1.40, -0.60, 'x', 0);
    addSeatWheelSuport(downPart, -0.53, -1.40, -0.18, 'z', 1);
    addSeatWheelSuport(downPart, 0, -1.40, 0.60, 'x', 0);
    addSeatWheelSuport(downPart, 0.53, -1.40, -0.18, 'z', 2);
    addSeatWheelSuport(downPart, 0.60, -1.40, 0, 'z', 0);

    scene.add(topPart);
    scene.add(downPart);
    
}

function render(){
    renderer.render(scene, camera);
}

function createCamera(){

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;
    camera.lookAt(scene.position);
}

function createScene(){

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(1));

    createSeat();
    
}
 
function animate(){
    
    requestAnimationFrame(animate);
    render();   
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
