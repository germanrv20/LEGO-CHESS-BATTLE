import * as THREE from '../libs/three.module.js';
import * as CSG from '../libs/three-bvh-csg.js';
import { Pieza } from './Pieza.js'; // Importar clase base

class Rey extends Pieza {
  constructor(color, fila, columna, di) {
    super("rey", color, fila, columna, di); // Asigna null en lugar de id aquí
    this.createFigura(); // Llama al método para crear la figura
    this.moverA(fila, columna); // Posicionar en el tablero 3D

  }
  createFigura() {
    // 🛠 Definir el material
    const material = new THREE.MeshNormalMaterial();
    // Dibujamos la base principal que será un rectángulo


    var base = new THREE.BoxGeometry(1, 1, 0.40); // Crea un rectángulo
    base.rotateX(Math.PI / 2); // Rota el rectángulo

    var l1 = new THREE.BoxGeometry(0.8, 0.8, 0.2);
    l1.rotateX(Math.PI / 2);
    l1.translate(0, 0.3, 0);

    var piramide1 = new THREE.ConeGeometry(0.57, 0.6, 4);
    piramide1.translate(0, 0.7, 0);
    piramide1.rotateY(Math.PI / 4);

    var piramide2 = new THREE.ConeGeometry(0.4, 0.45, 4);
    piramide2.translate(0, 0.85, 0);
    piramide2.rotateY(Math.PI / 4);

    var zonamedia = new THREE.BoxGeometry(0.3, 0.8, 0.3);
    zonamedia.translate(0, 0.9, 0);


    var zonamedia2 = new THREE.BoxGeometry(0.6, 0.1, 0.6);
    zonamedia2.translate(0, 1.25, 0);

    var zonamedia3 = new THREE.BoxGeometry(0.4, 0.1, 0.4);
    zonamedia3.translate(0, 1.35, 0);

    var piramideInv = new THREE.ConeGeometry(0.3, 0.6, 4);
    piramideInv.rotateX(Math.PI);
    piramideInv.rotateY(Math.PI / 4);
    piramideInv.translate(0, 1.35, 0);

    var zonaAlta = new THREE.BoxGeometry(0.5, 0.1, 0.5);
    zonaAlta.translate(0, 1.7, 0);

    var cilindro = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 15);
    cilindro.translate(0, 1.8, 0);

    var parteAlta2 = new THREE.BoxGeometry(0.2, 0.1, 0.2);
    parteAlta2.translate(0, 1.88, 0);


    var boton = this.createBotón();
    boton.geometry.translate(0, 1.99, 0);


    const baseGeometryBrush = new CSG.Brush(base);
    const L1GeometryBrush = new CSG.Brush(l1);
    const piramide1GeometryBrush = new CSG.Brush(piramide1);
    const piramide2GeometryBrush = new CSG.Brush(piramide2);
    const zonaMediaGeometryBrush = new CSG.Brush(zonamedia);
    const zonaMedia2GeometryBrush = new CSG.Brush(zonamedia2);
    const zonaMedia3GeometryBrush = new CSG.Brush(zonamedia3);
    const piramideInvGeometryBrush = new CSG.Brush(piramideInv);
    const zonaAltaGeometryBrush = new CSG.Brush(zonaAlta);
    const cilindroGeometryBrush = new CSG.Brush(cilindro);
    const parteAlta2GeometryBrush = new CSG.Brush(parteAlta2);





    const evaluador = new CSG.Evaluator();
    const temp1 = evaluador.evaluate(L1GeometryBrush, baseGeometryBrush, CSG.ADDITION);
    const temp2 = evaluador.evaluate(piramide1GeometryBrush, temp1, CSG.ADDITION);
    const temp3 = evaluador.evaluate(piramide2GeometryBrush, temp2, CSG.ADDITION);
    const temp4 = evaluador.evaluate(zonaMediaGeometryBrush, temp3, CSG.ADDITION);
    const temp5 = evaluador.evaluate(zonaMedia2GeometryBrush, temp4, CSG.ADDITION);
    const temp6 = evaluador.evaluate(zonaMedia3GeometryBrush, temp5, CSG.ADDITION);
    const temp7 = evaluador.evaluate(piramideInvGeometryBrush, temp6, CSG.ADDITION);
    const temp8 = evaluador.evaluate(zonaAltaGeometryBrush, temp7, CSG.ADDITION);
    const temp9 = evaluador.evaluate(cilindroGeometryBrush, temp8, CSG.ADDITION);
    const temp10 = evaluador.evaluate(parteAlta2GeometryBrush, temp9, CSG.ADDITION);
    const temp11 = evaluador.evaluate(boton, temp10, CSG.ADDITION);



    // Crear un Mesh con la geometría resultante y aplicar el material
    const Objeto = new THREE.Mesh(temp11.geometry, material);
    Objeto.geometry.translate(0, 0.4, -2); // Escalar el objeto
    this.add(Objeto);

  }




  createBotón() {
    // Crear material para las geometrías
    const material = new THREE.MeshNormalMaterial({ flatShading: true });
    var material2 = new THREE.MeshStandardMaterial({ color: 'grey' });

    // Función auxiliar para crear letras con extrusión
    const createLetter = (shapeCallback, depth = 0.1, translate = { x: 0, y: 0 }) => {
      const shape = new THREE.Shape();
      shapeCallback(shape);
      const geometry = new THREE.ExtrudeGeometry(shape, { steps: 10, depth, curveSegments: 10 });
      geometry.translate(translate.x, translate.y, 0);
      return new CSG.Brush(geometry, material2);
    };

    // Definir las letras y sus configuraciones
    const lettersConfig = [
      {
        callback: (shape) => {
          shape.moveTo(0, 0);
          shape.lineTo(0.5, 0);
          shape.lineTo(0.5, 0.25);
          shape.lineTo(0.25, 0.25);
          shape.lineTo(0.25, 1);
          shape.lineTo(0, 1);
        },
        translate: { x: 0, y: 0 },
      },
      {
        callback: (shape) => {
          shape.moveTo(0, 0);
          shape.lineTo(0.5, 0);
          shape.lineTo(0.5, 0.2);
          shape.lineTo(0.2, 0.2);
          shape.lineTo(0.2, 0.45);
          shape.lineTo(0.5, 0.45);
          shape.lineTo(0.5, 0.55);
          shape.lineTo(0.2, 0.55);
          shape.lineTo(0.2, 0.8);
          shape.lineTo(0.5, 0.8);
          shape.lineTo(0.5, 1);
          shape.lineTo(0, 1);
        },
        translate: { x: 0.75, y: 0 },
      },
      {
        callback: (shape) => {
          shape.moveTo(0, 0);
          shape.lineTo(0.5, 0);
          shape.lineTo(0.5, 0.2);
          shape.lineTo(0.5, 0.55);
          shape.lineTo(0.35, 0.55);
          shape.lineTo(0.35, 0.45);
          shape.lineTo(0.42, 0.45);
          shape.lineTo(0.42, 0.15);
          shape.lineTo(0.1, 0.15);
          shape.lineTo(0.1, 0.85);
          shape.lineTo(0.5, 0.85);
          shape.lineTo(0.5, 1);
          shape.lineTo(0, 1);
        },
        translate: { x: 1.5, y: 0 },
      },
      {
        callback: (shape) => {
          shape.moveTo(0, 0);
          shape.lineTo(0.5, 0);
          shape.lineTo(0.5, 1);
          shape.lineTo(0, 1);
          const hole = new THREE.Path();
          hole.moveTo(0.1, 0.15);
          hole.lineTo(0.4, 0.15);
          hole.lineTo(0.4, 0.85);
          hole.lineTo(0.1, 0.85);
          shape.holes.push(hole);
        },
        translate: { x: 2.25, y: 0 },
      },
    ];

    // Crear las letras usando un bucle
    const evaluator = new CSG.Evaluator();
    let combinedLetters = null;
    for (const config of lettersConfig) {
      const letterBrush = createLetter(config.callback, 0.1, config.translate);
      combinedLetters = combinedLetters
        ? evaluator.evaluate(combinedLetters, letterBrush, CSG.ADDITION)
        : letterBrush;
    }

    // Crear el botón base
    const botonGeometry = new THREE.CylinderGeometry(1.8, 1.8, 1, 100);
    botonGeometry.translate(1.35, -0.4, -0.5);
    botonGeometry.rotateX(Math.PI / 2);
    const botonBase = new CSG.Brush(botonGeometry, material2);

    // Combinar las letras con el botón base
    const finalButton = evaluator.evaluate(combinedLetters, botonBase, CSG.ADDITION);

    // Aplicar transformaciones finales
    finalButton.geometry.rotateX(-Math.PI / 2);
    finalButton.geometry.scale(0.05, 0.05, 0.05);
    finalButton.geometry.translate(-0.065, 0, 0.025);

    return finalButton; // Retornar el botón
  }

  update() {
    // Método de actualización si es necesario
  }

}

export { Rey };