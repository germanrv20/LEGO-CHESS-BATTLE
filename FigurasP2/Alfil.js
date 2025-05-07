import * as THREE from '../libs/three.module.js'; // Importa la librería Three.js
import * as CSG from '../libs/three-bvh-csg.js'; // Importa la librería para operaciones CSG (Constructive Solid Geometry)
import { Pieza } from './Pieza.js'; // Importar clase base

class Alfil extends Pieza {
  
  constructor(color, fila, columna, di) {

    super("Alfil", color, fila, columna, di); // Asigna null en lugar de id aquí    
    this.createFigura(); // Llama al método para crear la figura
    this.moverA(fila, columna ); // Posicionar en el tablero 3D
    
  }

  movimientosValidos(tablero) {
    const movimientos = [];
    const fila = this.fila;
    const columna = this.columna;
  
    // Direcciones diagonales: arriba-izquierda, arriba-derecha, abajo-izquierda, abajo-derecha
    const direcciones = [
      [-1, -1], // Arriba izquierda
      [-1, 1],  // Arriba derecha
      [1, -1],  // Abajo izquierda
      [1, 1]    // Abajo derecha
    ];
  
    // Comprobar todas las direcciones diagonales
    for (const [dFila, dColumna] of direcciones) {
      let i = fila + dFila;
      let j = columna + dColumna;
  
      // Mover en la dirección de la diagonal
      while (i >= 0 && i < 8 && j >= 0 && j < 8) {
        const pieza = tablero[i][j];
  
        // Si la casilla está vacía, es un movimiento válido
        if (pieza === null) {
          movimientos.push({ fila: i, columna: j });
        } else {
          // Si hay una pieza del color contrario, se puede capturar
          if (pieza.color !== this.color) {
            movimientos.push({ fila: i, columna: j });
          }
          break; // Si hay una pieza, no podemos seguir moviéndonos en esa dirección
        }
  
        // Avanzar a la siguiente casilla en la diagonal
        i += dFila;
        j += dColumna;
      }
    }
  
    return movimientos;
  }
  
  

  createFigura() {

    // Material para los objetos 3D
    let colorpieza;

    if (this.color === "negro") {
      colorpieza = 0x5c5c5c; // Negro
    } else {
      colorpieza = 0xffffff; // Blanco por defecto
    }

    const material = new THREE.MeshStandardMaterial({ color: colorpieza });

    //********************** BASE DE LA FIGURA ***************************

    // Dibujamos la base principal que será un rectángulo

    var rectangulo_geom = new THREE.BoxGeometry(1, 0.40, 1); // Crea un rectángulo
    var rectangulo = new CSG.Brush(rectangulo_geom, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo); // Añade el rectángulo a la escena


    // Cilindro 1
    var cilindro_geom = new THREE.CylinderGeometry(0.35, 0.5, 0.25, 50, 1);
    cilindro_geom.translate(0, 0.3, 0);
    var cilindro1 = new CSG.Brush(cilindro_geom, material);
    //this.add(cilindro1); // Añade el cilindro a la escena

    // Cilindro 2
    var cilindro_geom2 = new THREE.CylinderGeometry(0.25, 0.35, 1, 50, 1);
    cilindro_geom2.translate(0, 0.91, 0);
    var cilindro2 = new CSG.Brush(cilindro_geom2, material);
    //this.add(cilindro2); // Añade el cilindro a la escena

    // Cilindro 3
    var cilindro_geom3 = new THREE.CylinderGeometry(0.33, 0.33, 0.15, 50, 1);
    cilindro_geom3.translate(0, 1.4, 0);
    var cilindro3 = new CSG.Brush(cilindro_geom3, material);
    //this.add(cilindro3); // Añade el cilindro a la escena

    var rectangulo_corte_geom = new THREE.BoxGeometry(0.05, 0.5, 0.5);
    rectangulo_corte_geom.rotateZ(-Math.PI / 4); // Rota el rectángulo
    rectangulo_corte_geom.translate(0.2, 1.85, 0);
    var rectangulo_corte = new CSG.Brush(rectangulo_corte_geom, material);
    //this.add(rectangulo_corte); // Añade el rectángulo a la escena

    // Rectangulo para la parte superior
    var esfera_geom = new THREE.SphereGeometry(0.25, 100, 100, 1); // Crea un rectángulo
    esfera_geom.translate(0, 1.55, 0); // Traslada el rectángulo
    var esfera = new CSG.Brush(esfera_geom, material); // Crea un mesh con el rectángulo y el material
    //this.add(esfera); // Añade el rectángulo a la escena

    // Cono para la parte superior
    var cono_geom = new THREE.CylinderGeometry(0, 0.2, 0.3, 100, 1);
    cono_geom.translate(0, 1.85, 0);
    var cono = new CSG.Brush(cono_geom, material);
    //this.add(cono); // Añade el cono a la escena

    var boton1 = this.createBotón();
    boton1.geometry.scale(1, 1.5, 1);
    boton1.geometry.translate(0, 1.99, 0);
    //this.add(boton1);

    var evaluator = new CSG.Evaluator();
    var tmp = evaluator.evaluate(rectangulo, cilindro1, CSG.ADDITION);
    var tmp2 = evaluator.evaluate(tmp, cilindro2, CSG.ADDITION);
    var tmp3 = evaluator.evaluate(tmp2, cilindro3, CSG.ADDITION);
    var tmp4 = evaluator.evaluate(tmp3, esfera, CSG.ADDITION);
    var tmp5 = evaluator.evaluate(tmp4, cono, CSG.ADDITION);
    var tmp6 = evaluator.evaluate(tmp5, rectangulo_corte, CSG.SUBTRACTION);
    var alfil_final = evaluator.evaluate(tmp6, boton1, CSG.ADDITION);

    const Objeto = new THREE.Mesh(alfil_final.geometry, material);
    alfil_final.geometry.translate(0 , 0.4, - 2); // Traslada el resultado final
    this.add(Objeto); // Añade el resultado a la escena

    //alfil_final.geometry.translate(0, 0, -1.5); // Traslada el resultado a la posición deseada


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

export { Alfil }; // Exporta la clase para usarla en otros archivos