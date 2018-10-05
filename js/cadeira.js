var material;

class Chair extends Objeto {

    constructor() {
        super();
    }
}

function createSeat(){
    
    var topPart = new Objeto();
    var downPart = new Objeto();
    var wheels = new Objeto();

    material = new THREE.MeshBasicMaterial({color: 0xeee8aa, wireframe: true});
    
    topPart.addElement(0, 0, 0, new THREE.CubeGeometry(3, 0.10, 3), 0, '');
    topPart.addElement(0, 1.70, 1.55, new THREE.CubeGeometry(3, 3.50, 0.10));

    topPart.addElement(-1.60, 0.80, 0.70, new THREE.CubeGeometry(0.2, 0.15, 1.8));
    topPart.addElement(-1.60, 0.38, -0.10, new THREE.CubeGeometry(0.2, 0.85, .2));
    topPart.addElement(1.60, 0.80, 0.70, new THREE.CubeGeometry(0.2, 0.15, 1.8)); //CORRIGIR
    topPart.addElement(1.60, 0.38, -0.10, new THREE.CubeGeometry(0.2, 0.85, 0.2));
    //chair.rotateMesh(chair.topPart.children[chair.topPart.length - 1].mesh, Math.PI/50, 'z');

    downPart.addElement(0, -0.75, 0, new THREE.CylinderGeometry(0.15, 0.15, 1.50, 10));
    downPart.addElement(0, -1.50, 0, new THREE.CylinderGeometry(0.30, 0.30, 0.20, 10));
    downPart.addElement(0, -1.50, -0.70, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    downPart.addElement(-0.65, -1.50, -0.25, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    //chair.rotateMesh(chair.downPart.children[chair.downPart.length - 1].mesh, -0.40, 'x');
    downPart.addElement(-0.45, -1.50, 0.55, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    //chair.rotateMesh(chair.downPart.children[chair.downPart.length - 1].mesh, 0.70, 'z');
    downPart.addElement(0.65, -1.50, -0.25, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    //chair.rotateMesh(chair.downPart.children[chair.downPart.length - 1].mesh, 0.40, 'x');
    downPart.addElement(0.45, -1.50, 0.55, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    //chair.rotateMesh(chair.downPart.children[chair.downPart.length - 1].mesh, -0.70, 'z');

    //downPart.rotateMesh(downPart, Math.PI, 'y');
    //downPart.rotateMesh(downPart, Math.PI / 2, 'z');

    wheels.addElement(0.70, -1.80, 0.85, new THREE.TorusGeometry(0.10, 0.10, 10, 20));
    wheels.addElement(-0.70, -1.80, 0.85, new THREE.TorusGeometry(0.10, 0.10, 10, 20));
    wheels.addElement(0, -1.80, -1.10, new THREE.TorusGeometry(0.10, 0.10, 10, 20));
    wheels.addElement(-1.05, -1.80, -0.40, new THREE.TorusGeometry(0.10, 0.10, 10, 20));
    wheels.addElement(1.05, -1.80, -0.40, new THREE.TorusGeometry(0.10, 0.10, 10, 20));
    wheels.addElement(1.05, -1.80, -0.40, new THREE.TorusGeometry(0.10, 0.10, 10, 20));   
    wheels.rotateMesh(wheels, Math.PI / 2, 'y');
    chair.add(topPart);
    chair.add(downPart);
    chair.add(wheels);

    scene.add(chair);
}