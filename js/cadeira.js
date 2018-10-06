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
    
    topPart.addElement(0, 0, 0, new THREE.CubeGeometry(3, 0.10, 3), 0, ''); //Assento
    topPart.addElement(0, 1.70, 1.55, new THREE.CubeGeometry(3, 3.50, 0.10)); //Costas

    topPart.addElement(-1.60, 0.80, 0.70, new THREE.CubeGeometry(0.2, 0.15, 1.8)); //Horizontal, braço esquerdo
    topPart.addElement(-1.60, 0.38, -0.10, new THREE.CubeGeometry(0.2, 0.85, 0.2)); //Vertical, braço esquerdo
    topPart.addElement(1.60, 0.80, 0.70, new THREE.CubeGeometry(0.2, 0.15, 1.8)); //Horizontal, braço direito
    topPart.addElement(1.60, 0.38, -0.10, new THREE.CubeGeometry(0.2, 0.85, 0.2)); //Vertical, braço direito

    downPart.addElement(0, -0.75, 0, new THREE.CylinderGeometry(0.15, 0.15, 1.50, 10));
    downPart.addElement(0, -1.50, 0, new THREE.CylinderGeometry(0.30, 0.30, 0.20, 10));
    downPart.addElement(0, -1.50, -0.70, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    downPart.addElement(-0.65, -1.50, -0.25, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    downPart.addElement(-0.45, -1.50, 0.55, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    downPart.addElement(0.65, -1.50, -0.25, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    downPart.addElement(0.45, -1.50, 0.55, new THREE.CylinderGeometry(0.10, 0.10, 1, 8));
    
    downPart.rotateMesh(downPart.children[2], Math.PI / 2, 'x');

    downPart.rotateMesh(downPart.children[3],  2 * Math.PI / 5, 'y');
    downPart.rotateMesh(downPart.children[3], Math.PI / 2 , 'x');

    downPart.rotateMesh(downPart.children[4], 4 * Math.PI / 5, 'y');
    downPart.rotateMesh(downPart.children[4], Math.PI / 2 , 'x');

    downPart.rotateMesh(downPart.children[5], 8 * Math.PI / 5, 'y');
    downPart.rotateMesh(downPart.children[5], Math.PI / 2 , 'x');

    downPart.rotateMesh(downPart.children[6], 6 * Math.PI / 5, 'y');
    downPart.rotateMesh(downPart.children[6], Math.PI / 2 , 'x');

    wheels.addElement(0.70, -1.80, 0.85, new THREE.TorusGeometry(0.10, 0.10, 10, 20)); //Roda de trás, direita
    wheels.addElement(-0.70, -1.80, 0.85, new THREE.TorusGeometry(0.10, 0.10, 10, 20)); //Roda de trás, esquerda
    wheels.addElement(0, -1.80, -1.10, new THREE.TorusGeometry(0.10, 0.10, 10, 20)); //Roda da frente
    wheels.addElement(-1.05, -1.80, -0.40, new THREE.TorusGeometry(0.10, 0.10, 10, 20)); //Roda da frente, esquerda
    wheels.addElement(1.05, -1.80, -0.40, new THREE.TorusGeometry(0.10, 0.10, 10, 20)); // Roda da frente, direita
    wheels.addElement(1.05, -1.80, -0.40, new THREE.TorusGeometry(0.10, 0.10, 10, 20));  //Roda da frente, direita

    for(i = 0; i < 6; i++)
        wheels.rotateMesh(wheels.children[i], Math.PI / 2, 'y');
    
    chair.add(topPart);
    chair.add(downPart);
    chair.add(wheels);

    scene.add(chair);
}