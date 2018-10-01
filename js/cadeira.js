var topPart, downPart;

function addSeatWheelSuport(obj, x, y, z, axis, degree){
    geometry = new THREE.CylinderGeometry(0.10, 0.10, 1, 8);    
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    
    if(axis === 'x')
        mesh.rotateX(Math.PI / 2); //Rotating mesh by 90 degree in X axis. 
    else if(axis === 'z')  
        mesh.rotateZ(Math.PI / 2); //Rotating mesh by 90 degree in Y axis. 

    if (degree === 1)
        mesh.rotateX(-0.40);
    else if (degree === 2)
        mesh.rotateX(0.40);
    else if (degree === 3)
        mesh.rotateZ(0.70);
    else if (degree === 4)
        mesh.rotateZ(-0.70);

    obj.add(mesh);
}

function addSeatWheels(obj, x, y, z){
    geometry = new THREE.TorusGeometry(0.10, 0.10, 10, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotateY(Math.PI / 2);
    obj.add(mesh);
}

function addSeatLiftCylinderBase(obj, x, y, z){
    geometry = new THREE.CylinderGeometry(0.30, 0.30, 0.20, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addSeatLiftCylinder(obj, x, y, z){
    geometry = new THREE.CylinderGeometry(0.15, 0.15, 1.50, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

//Creates the horizontal arm support
function addSeatArms_1(obj, x, y, z){
    geometry = new THREE.CubeGeometry(1.8, 0.15, 0.20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotateY(Math.PI/2);
    mesh.rotateZ(Math.PI/50);
    
    obj.add(mesh);
}

//Creates the vertical arm support
function addSeatArms_2(obj, x, y, z){
    geometry = new THREE.CubeGeometry(0.85, 0.20, 0.20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotateZ(Math.PI/2);
    
    obj.add(mesh);
}

function addSeatBack(obj, x, y, z){
    geometry = new THREE.CubeGeometry(3, 3.50, 0.10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotateX(Math.PI/20);

    obj.add(mesh);
}

function addSeatBase(obj, x, y, z){
    geometry = new THREE.CubeGeometry(3, 0.10, 3);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function createSeat(){

    topPart = new THREE.Object3D();
    downPart = new THREE.Object3D();
    wheels = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({color: 0xeee8aa, wireframe: true});

    //top part of the chair (back, base seat and arms)
    addSeatBase(topPart, 0, 0, 0);
    addSeatBack(topPart, 0, 1.70, 1.72);
    addSeatArms_1(topPart, -1.60, 0.80, 0.70); //Horizontal arm support
    addSeatArms_2(topPart, -1.60, 0.38, -0.10); //Vertical arm support
    addSeatArms_1(topPart, 1.60, 0.80, 0.70); //Horizontal arm support
    addSeatArms_2(topPart, 1.60, 0.38, -0.10); //Vertical arm support

    //down part of the chair (legs and wheels)
    addSeatLiftCylinder(downPart, 0, -0.75, 0);
    addSeatLiftCylinderBase(downPart, 0, -1.50, 0);
    addSeatWheelSuport(downPart, 0, -1.50, -0.70, 'x', 0);
    addSeatWheelSuport(downPart, -0.65, -1.50, -0.25, 'z', 1);
    addSeatWheelSuport(downPart, -0.45, -1.50, 0.55, 'x', 3);
    addSeatWheelSuport(downPart, 0.65, -1.50, -0.25, 'z', 2);
    addSeatWheelSuport(downPart, 0.45, -1.50, 0.55, 'x', 4);
    addSeatWheels(wheels, 0.70, -1.80, 0.85);
    addSeatWheels(wheels, -0.70, -1.80, 0.85);
    addSeatWheels(wheels, 0, -1.80, -1.10);
    addSeatWheels(wheels, -1.05, -1.80, -0.40);
    addSeatWheels(wheels, 1.05, -1.80, -0.40);
    addSeatWheels(wheels, 1.05, -1.80, -0.40);


    scene.add(topPart);
    scene.updateMatrixWorld(true);
    scene.add(downPart);
    scene.updateMatrixWorld(true);
    scene.add(wheels);
    scene.updateMatrixWorld(true);
    
    chair_obj.push(topPart);
    chair_obj.push(downPart);
    chair_obj.push(wheels);
}
