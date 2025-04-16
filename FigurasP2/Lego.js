import * as THREE from '../libs/three.module.js'; // Importa la librería Three.js
import * as CSG from '../libs/three-bvh-csg.js'; // Importa la librería para operaciones CSG (Constructive Solid Geometry)

class Lego extends THREE.Object3D { // Define una clase que extiende de Object3D
  constructor(gui, titleGui) {
    super(); // Llama al constructor de la clase padre

    // Define un material con sombreado plano, doble cara y opacidad del 50%
    this.material = new THREE.MeshNormalMaterial({ 
      flatShading: true, 
      side: THREE.DoubleSide, 
      transparent: false, 
      opacity: 0.5 
    });

    this.createGUI(gui, titleGui); // Crea la interfaz gráfica de usuario
  
    // Crear un botón con el texto "LEGO"
    //const boton1 = this.createBotón("LEGO", { x: 0, y: 0, z: 0 }, { x: 0.1, y: 0.1, z: 0.1 });
    //this.add(boton1);  

}


  createBotón() {
    // Material para la geometría
    this.material = new THREE.MeshNormalMaterial({ flatShading: true });

    // Crear la letra L
    const formaL = new THREE.Shape();
    formaL.moveTo(0, 0);
    formaL.lineTo(0.5, 0);
    formaL.lineTo(0.5, 0.25);
    formaL.lineTo(0.25, 0.25);
    formaL.lineTo(0.25, 1);
    formaL.lineTo(0, 1);
    const geometryL = new THREE.ExtrudeGeometry(formaL, { steps: 10, depth: 0.1, curveSegments: 10 });
    const brushL = new CSG.Brush(geometryL, this.material);

    // Crear la letra E
    const formaE = new THREE.Shape();
    formaE.moveTo(0, 0);
    formaE.lineTo(0.5, 0);
    formaE.lineTo(0.5, 0.2);
    formaE.lineTo(0.2, 0.2);
    formaE.lineTo(0.2, 0.45);
    formaE.lineTo(0.5, 0.45);
    formaE.lineTo(0.5, 0.55);
    formaE.lineTo(0.2, 0.55);
    formaE.lineTo(0.2, 0.8);
    formaE.lineTo(0.5, 0.8);
    formaE.lineTo(0.5, 1);
    formaE.lineTo(0, 1);
    const geometryE = new THREE.ExtrudeGeometry(formaE, { steps: 10, depth: 0.1, curveSegments: 10 });
    geometryE.translate(0.75, 0, 0); // Desplazar la letra E
    const brushE = new CSG.Brush(geometryE, this.material);

    // Crear la letra G
    const formaG = new THREE.Shape();
    formaG.moveTo(0, 0);
    formaG.lineTo(0.5, 0);
    formaG.lineTo(0.5, 0.2);
    formaG.lineTo(0.5, 0.55);
    formaG.lineTo(0.35, 0.55);
    formaG.lineTo(0.35, 0.45);
    formaG.lineTo(0.42, 0.45);
    formaG.lineTo(0.42, 0.15);
    formaG.lineTo(0.1, 0.15);
    formaG.lineTo(0.1, 0.85);
    formaG.lineTo(0.5, 0.85);
    formaG.lineTo(0.5, 1);
    formaG.lineTo(0, 1);
    const geometryG = new THREE.ExtrudeGeometry(formaG, { steps: 10, depth: 0.1, curveSegments: 10 });
    geometryG.translate(1.5, 0, 0); // Desplazar la letra G
    const brushG = new CSG.Brush(geometryG, this.material);

    // Crear la letra O
    const formaO = new THREE.Shape();
    formaO.moveTo(0, 0);
    formaO.lineTo(0.5, 0);
    formaO.lineTo(0.5, 1);
    formaO.lineTo(0, 1);
    const holeO = new THREE.Path();
    holeO.moveTo(0.1, 0.15);
    holeO.lineTo(0.4, 0.15);
    holeO.lineTo(0.4, 0.85);
    holeO.lineTo(0.1, 0.85);
    holeO.lineTo(0.1, 0.15);
    formaO.holes.push(holeO);
    const geometryO = new THREE.ExtrudeGeometry(formaO, { steps: 10, depth: 0.1, curveSegments: 10 });
    geometryO.translate(2.25, 0, 0); // Desplazar la letra O
    const brushO = new CSG.Brush(geometryO, this.material);

    // Combinar las letras con el evaluator
    const evaluator = new CSG.Evaluator();
    let combined = evaluator.evaluate(brushL, brushE, CSG.ADDITION);
    combined = evaluator.evaluate(combined, brushG, CSG.ADDITION);
    combined = evaluator.evaluate(combined, brushO, CSG.ADDITION);

    // Crear el botón base
    const boton_geometry = new THREE.CylinderGeometry(1.8, 1.8, 1, 100);
    boton_geometry.translate(1.35, -0.4, -0.5);
    boton_geometry.rotateX(Math.PI / 2);
    const boton = new CSG.Brush(boton_geometry, this.material);

    // Combinar las letras con el botón base
    const lego = evaluator.evaluate(combined, boton, CSG.ADDITION);

    // Aplicar transformaciones
    lego.position.set(-0.065, 0, 0.025);
    lego.rotateX(-Math.PI / 2);
    lego.scale.set(0.05, 0.05, 0.05); // Escala fija

    return lego; // Retornar el botón
  }

  
  createGUI(gui, titleGui) {
    // Controles de la GUI
    this.guiControls = {
      resolucion: 10 // Valor inicial para la resolución
    };
  }

  update() {
    // Método vacío para actualizaciones (si es necesario)
  }
}

export { Lego }; // Exporta la clase para usarla en otros archivos