var material;

class Lamp extends Objeto {}

function createLamp(){
	var lamp = new Lamp();

	material = new THREE.MeshBasicMaterial({color: 0xFFFF33	, wireframe: true});

	lamp.addElement(6, -1.25, 0, new THREE.CylinderGeometry(0.5, 1.60, 1.5, 32));
	lamp.addElement(6, 2.25, 0, new THREE.CylinderGeometry(0.1, 0.1, 6.25, 32));
	lamp.addElement(6, 5.5, 0, new THREE.ConeGeometry(1.6, 1, 32));
	lamp.addElement(5.55, 3.95, 0, new THREE.CylinderGeometry(0.05, 0.05, 0.8, 32));
	lamp.addElement(5.55, 4.15, 0, new THREE.CylinderGeometry(0.015, 0.015, 2.6, 32));
	lamp.addElement(5.55, 2.85, 0, new THREE.CylinderGeometry(0.035, 0.035, 0.125, 32));
	lamp.addElement(6, 5.3, 0, new THREE.SphereGeometry(0.2, 32, 32));

	console.log(lamp);
	scene.add(lamp);
}