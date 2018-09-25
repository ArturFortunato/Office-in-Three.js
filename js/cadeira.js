function addSeatWheelSuport(obj, x, y, z, axis, degree){
    geometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    
    if(axis == 'x')
        mesh.rotateX(Math.PI / 2); //Rotating mesh by 90 degree in X axis. 
    if(axis == 'z')  
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

    //var seat = new THREE.Object3D();

    var topPart = new THREE.Object3D();
    var downPart = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    addSeatBase(topPart, 0, 0, 0);
    addSeatBack(topPart, 0, 1.70, 1.72);//1.45, 1.8
    addSeatLiftCylinder(downPart, 0, -0.75, 0);
    addSeatWheelSuport(downPart, 0, -1.40, -0.60, 'x', 0);
    addSeatWheelSuport(downPart, -0.53, -1.40, -0.18, 'z', 1);
    addSeatWheelSuport(downPart, 0, -1.40, 0.60, 'x', 0);
    addSeatWheelSuport(downPart, 0.53, -1.40, -0.18, 'z', 2);
    //addSeatWheelSuport(downPart, 0.60, -1.40, 0, 'z', 0);

    scene.add(topPart);
    scene.add(downPart);
    
}