import * as THREE from '../libs/three.module.js';
import * as CSG from '../libs/three-bvh-csg.js';

class Peon extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    // 🛠 Definir el material
    const material = new THREE.MeshNormalMaterial();
    // Dibujamos la base principal que será un rectángulo

    var base = new THREE.BoxGeometry(1, 1, 0.40); // Crea un rectángulo
    base.rotateX(Math.PI / 2); // Rota el rectángulo


    const shape = new THREE.Shape();
    shape.lineTo(-1, 0);
    shape.lineTo(-1, 0.4);
    shape.lineTo(-0.8, 0.4);
    shape.quadraticCurveTo(-1.1, 0.8, -0.8, 1);
    shape.lineTo(-0.7, 1.2);
    shape.quadraticCurveTo(-0.2, 1.9, -0.6, 2.5);
    shape.lineTo(-0.6, 2.8);
    shape.lineTo(-0.4, 2.8);
    shape.lineTo(-0.4, 3);
    shape.lineTo(0, 3);

    const shapeCabeza = new THREE.Shape();
    shapeCabeza.lineTo(-0.25, 0);
    shapeCabeza.quadraticCurveTo(-0.5, 0, -0.5, 0.18); 
    shapeCabeza.lineTo(-0.5, 0.6);                    
    shapeCabeza.quadraticCurveTo(-0.5, 0.8, -0.25, 0.8); 
    shapeCabeza.lineTo(0, 0.8);                        



    // Extraer los puntos de la forma
    var points = shape.extractPoints(6).shape;

    // Convertir a Vector3 para LatheGeometry
    this.lathePoints = points.map(p => new THREE.Vector3(p.x, p.y, 0));

    // Crear la geometría de revolución
    var cuerpo = new THREE.LatheGeometry(this.lathePoints, 32, 0, Math.PI * 2);
    cuerpo.translate(0, 0.2, 0);
    cuerpo.scale(0.45, 0.45, 0.45); // Escalar el cuerpo
    var cabeza = new THREE.LatheGeometry(shapeCabeza.extractPoints(6).shape, 32, 0, Math.PI * 2);
    cabeza.translate(0, 3.2, 0);
    cabeza.scale(0.45, 0.45, 0.45);
    // Aplicar CS4
    const baseGeometryBrush = new CSG.Brush(base);
    const cuerpoGeometryBrush = new CSG.Brush(cuerpo);
    const cabezaGeometryBrush = new CSG.Brush(cabeza);

    const evaluador = new CSG.Evaluator();
    const temp1 = evaluador.evaluate(cabezaGeometryBrush, cuerpoGeometryBrush, CSG.ADDITION);
    const temp2 = evaluador.evaluate(temp1, baseGeometryBrush, CSG.ADDITION);


    // Crear un Mesh con la geometría resultante y aplicar el material
    const Objeto = new THREE.Mesh(temp2.geometry, material);
    this.add(Objeto);

  }

  update() {
    // Método de actualización si es necesario
  }

}

export { Peon };