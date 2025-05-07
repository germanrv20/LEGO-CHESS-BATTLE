import * as THREE from '../libs/three.module.js'; // Importa la librería Three.js
import * as CSG from '../libs/three-bvh-csg.js'; // Importa la librería para operaciones CSG (Constructive Solid Geometry)
import { Pieza } from './Pieza.js'; // Importar clase base

class Torre extends Pieza {
  constructor( color, fila, columna,di) {

    super("Torre", color, fila, columna,di); // Asigna null en lugar de id aquí   
    this.createFigura(); // Llama al método para crear la figura
    this.moverA(fila, columna ); // Posicionar en el tablero 3D
   
  }


  movimientosValidos(tablero) {
    const movimientos = [];
    const fila = this.fila;
    const columna = this.columna;
  
    // Movimiento hacia arriba (arriba de la torre)
    for (let i = fila - 1; i >= 0; i--) {
      if (tablero[i][columna] === null) {
        movimientos.push({ fila: i, columna });
      } else {
        if (tablero[i][columna].color !== this.color) {
          movimientos.push({ fila: i, columna });
        }
        break; // Si hay una pieza, no puedes seguir moviéndote en esta dirección
      }
    }
  
    // Movimiento hacia abajo (abajo de la torre)
    for (let i = fila + 1; i < 8; i++) {
      if (tablero[i][columna] === null) {
        movimientos.push({ fila: i, columna });
      } else {
        if (tablero[i][columna].color !== this.color) {
          movimientos.push({ fila: i, columna });
        }
        break; // Si hay una pieza, no puedes seguir moviéndote en esta dirección
      }
    }
  
    // Movimiento hacia la izquierda (izquierda de la torre)
    for (let j = columna - 1; j >= 0; j--) {
      if (tablero[fila][j] === null) {
        movimientos.push({ fila, columna: j });
      } else {
        if (tablero[fila][j].color !== this.color) {
          movimientos.push({ fila, columna: j });
        }
        break; // Si hay una pieza, no puedes seguir moviéndote en esta dirección
      }
    }
  
    // Movimiento hacia la derecha (derecha de la torre)
    for (let j = columna + 1; j < 8; j++) {
      if (tablero[fila][j] === null) {
        movimientos.push({ fila, columna: j });
      } else {
        if (tablero[fila][j].color !== this.color) {
          movimientos.push({ fila, columna: j });
        }
        break; // Si hay una pieza, no puedes seguir moviéndote en esta dirección
      }
    }
  
    return movimientos;
  }
  

  createFigura() {
    
   
    /******************************************************************************/
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

    var rectangulo_geom =  new THREE.BoxGeometry(1, 0.40, 1); // Crea un rectángulo
    var rectangulo = new CSG.Brush(rectangulo_geom, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo); // Añade el rectángulo a la escena


    // Cilindro 1
    var cilindro_geom = new THREE.CylinderGeometry(0.4,0.5,0.25,50,1);
    cilindro_geom.translate(0,0.3,0);
    var cilindro1 = new CSG.Brush(cilindro_geom, material);
    //this.add(cilindro1); // Añade el cilindro a la escena

    // Cilindro 2
    var cilindro_geom2 = new THREE.CylinderGeometry(0.35,0.4,1,50,1);
    cilindro_geom2.translate(0,0.91,0);
    var cilindro2 = new CSG.Brush(cilindro_geom2, material);
    //this.add(cilindro2); // Añade el cilindro a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom2 =  new THREE.BoxGeometry(0.8, 0.20, 0.8); // Crea un rectángulo
    rectangulo_geom2.translate(0,1.5,0); // Traslada el rectángulo
    var rectangulo2 = new CSG.Brush(rectangulo_geom2, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo2); // Añade el rectángulo a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom3 =  new THREE.BoxGeometry(0.8, 0.20, 0.8); // Crea un rectángulo
    rectangulo_geom3.translate(0,1.7,0); // Traslada el rectángulo
    var rectangulo3 = new CSG.Brush(rectangulo_geom3, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo3); // Añade el rectángulo a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom4 =  new THREE.BoxGeometry(0.15, 0.20, 0.8); // Crea un rectángulo
    rectangulo_geom4.translate(-0.18,1.7,0); // Traslada el rectángulo
    var rectangulo4 = new CSG.Brush(rectangulo_geom4, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo4); // Añade el rectángulo a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom5 =  new THREE.BoxGeometry(0.15, 0.20, 0.8); // Crea un rectángulo
    rectangulo_geom5.translate(0.17,1.7,0); // Traslada el rectángulo
    var rectangulo5 = new CSG.Brush(rectangulo_geom5, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo5); // Añade el rectángulo a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom6 =  new THREE.BoxGeometry(0.8, 0.20, 0.15); // Crea un rectángulo
    rectangulo_geom6.translate(0,1.7,-0.17); // Traslada el rectángulo
    var rectangulo6 = new CSG.Brush(rectangulo_geom6, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo6); // Añade el rectángulo a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom7 =  new THREE.BoxGeometry(0.8, 0.20, 0.15); // Crea un rectángulo
    rectangulo_geom7.translate(0,1.7,0.17); // Traslada el rectángulo
    var rectangulo7 = new CSG.Brush(rectangulo_geom7, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo7); // Añade el rectángulo a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom4 =  new THREE.BoxGeometry(0.15, 0.20, 0.8); // Crea un rectángulo
    rectangulo_geom4.translate(-0.17,1.7,0); // Traslada el rectángulo
    var rectangulo4 = new CSG.Brush(rectangulo_geom4, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo4); // Añade el rectángulo a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom8 =  new THREE.BoxGeometry(0.25, 0.2, 0.25); // Crea un rectángulo
    rectangulo_geom8.translate(0,1.7,0); // Traslada el rectángulo
    var rectangulo8 = new CSG.Brush(rectangulo_geom8, material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo8); // Añade el rectángulo a la escena
        
    var boton1 = this.createBotón();
    boton1.scale.set(0.5, 0.5, 0.5); // Rota el botón 180 grados
    boton1.geometry.translate(0.32, 1.85, 0.32); // Traslada el botón a la posición deseada
    //this.add(boton1); // Añade el botón a la escena

    var boton2 = this.createBotón();
    boton2.scale.set(0.9, 0.9, 0.9); // Rota el botón 180 grados
    boton2.geometry.translate(-0.32, 1.85, 0.32); // Traslada el botón a la posición deseada
    //this.add(boton2); // Añade el botón a la escena

    var boton3 = this.createBotón();
    boton3.scale.set(0.9, 0.9, 0.9); // Rota el botón 180 grados
    boton3.geometry.translate(-0.32, 1.85, -0.32); // Traslada el botón a la posición deseada
    //this.add(boton3); // Añade el botón a la escena

    var boton4 = this.createBotón();
    boton4.scale.set(0.9, 0.9, 0.9); // Rota el botón 180 grados
    boton4.geometry.translate(0.32, 1.85, -0.32); // Traslada el botón a la posición deseada
    //this.add(boton4); // Añade el botón a la escena


    var evaluator = new CSG.Evaluator();
    var tmp = evaluator.evaluate(rectangulo3, rectangulo4, CSG.SUBTRACTION); // Resta el cilindro 1 al rectángulo
    var tmp2 = evaluator.evaluate(tmp, rectangulo5, CSG.SUBTRACTION); // Resta el cilindro 2 al resultado
    var tmp3 = evaluator.evaluate(tmp2, rectangulo6, CSG.SUBTRACTION); // Resta el cilindro 3 al resultado
    var tmp4 = evaluator.evaluate(tmp3, rectangulo7, CSG.SUBTRACTION); // Resta el cilindro 4 al resultado
    var tmp5 = evaluator.evaluate(tmp4, rectangulo8, CSG.SUBTRACTION); // Resta el cilindro 5 al resultado
    var tmp6 = evaluator.evaluate(tmp5, rectangulo2, CSG.ADDITION); // Resta el cilindro 6 al resultado
    var tmp7 = evaluator.evaluate(tmp6, cilindro1, CSG.ADDITION); // Resta el cilindro 7 al resultado
    var tmp8 = evaluator.evaluate(tmp7, cilindro2, CSG.ADDITION); // Resta el cilindro 8 al resultado
    var tmp9 = evaluator.evaluate(tmp8, rectangulo, CSG.ADDITION); // Resta el cilindro 9 al resultado
    var tmp10 = evaluator.evaluate(tmp9, boton1, CSG.ADDITION); // Resta el cilindro 10 al resultado
    var tmp11 = evaluator.evaluate(tmp10, boton2, CSG.ADDITION); // Resta el cilindro 11 al resultado
    var tmp12 = evaluator.evaluate(tmp11, boton3, CSG.ADDITION); // Resta el cilindro 12 al resultado
    var torre = evaluator.evaluate(tmp12, boton4, CSG.ADDITION); // Resta el cilindro 13 al resultado

    const Objeto = new THREE.Mesh(torre.geometry, material);

    torre.geometry.translate(0 , 0.4, - 2); // Traslada el resultado final
    this.add(Objeto); // Añade el resultado final a la escena




    
    //realiza las operaciones CSG para restar los cilindros del rectángulo
    //var evaluator = new CSG.Evaluator();
    //var tmp = evaluator.evaluate(rectangulo, cilindro1, CSG.ADDITION); // Resta el cilindro 1 al rectángulo
    //var tmp2 = evaluator.evaluate(tmp, cilindro2, CSG.ADDITION); // Resta el cilindro 2 al resultado
    //var tmp3 = evaluator.evaluate(tmp2, rectangulo2, CSG.ADDITION); // Resta el cilindro 3 al resultado
    //var tmp4 = evaluator.evaluate(tmp3, boton1, CSG.ADDITION); // Resta el cilindro 4 al resultado
    //var tmp5 = evaluator.evaluate(tmp4, boton2, CSG.ADDITION); // Resta el cilindro 5 al resultado
    //var tmp6 = evaluator.evaluate(tmp5, boton3, CSG.ADDITION); // Resta el cilindro 6 al resultado
    //var tmp7 = evaluator.evaluate(tmp6, boton4, CSG.ADDITION); // Resta el cilindro 7 al resultado

    //tmp7.geometry.translate(-1.5,0,0); // Rota el resultado final

    //this.add(tmp7); // Añade el resultado final a la escena
    
    

  }

 


  createBotón() {
    // Crear material para las geometrías
    const material = new THREE.MeshNormalMaterial({ flatShading: true });

    // Función auxiliar para crear letras con extrusión
    const createLetter = (shapeCallback, depth = 0.1, translate = { x: 0, y: 0 }) => {
      const shape = new THREE.Shape();
      shapeCallback(shape);
      const geometry = new THREE.ExtrudeGeometry(shape, { steps: 10, depth, curveSegments: 10 });
      geometry.translate(translate.x, translate.y, 0);
      return new CSG.Brush(geometry, material);
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
    const botonBase = new CSG.Brush(botonGeometry, material);

    // Combinar las letras con el botón base
    const finalButton = evaluator.evaluate(combinedLetters, botonBase, CSG.ADDITION);

    // Aplicar transformaciones finales
    finalButton.geometry.rotateX(-Math.PI / 2);
    finalButton.geometry.scale(0.05, 0.05, 0.05);
    finalButton.geometry.translate(-0.065, 0, 0.025);

    return finalButton; // Retornar el botón
  }
  
  

  update() {
    // Método vacío para actualizaciones (si es necesario)
  }
}

export { Torre }; // Exporta la clase para usarla en otros archivos