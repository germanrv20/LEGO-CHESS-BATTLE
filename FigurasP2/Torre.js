import * as THREE from '../libs/three.module.js'; // Importa la librería Three.js
import * as CSG from '../libs/three-bvh-csg.js'; // Importa la librería para operaciones CSG (Constructive Solid Geometry)
import { Alfil } from './Alfil.js'

class Torre extends THREE.Object3D { // Define una clase que extiende de Object3D
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
    this.createFigura(); // Llama al método para crear la figura
    
  }

  createFigura() {
    
   
    /******************************************************************************/
    // Material para los objetos 3D
     

    var material = new THREE.MeshNormalMaterial({ flatShading: true });



    //********************** BASE DE LA FIGURA ***************************
   
    // Dibujamos la base principal que será un rectángulo

    var rectangulo_geom =  new THREE.BoxGeometry(1, 0.40, 1); // Crea un rectángulo
    var rectangulo = new CSG.Brush(rectangulo_geom, this.material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo); // Añade el rectángulo a la escena


    // Cilindro 1
    var cilindro_geom = new THREE.CylinderGeometry(0.4,0.5,0.25,50,1);
    cilindro_geom.translate(0,0.3,0);
    var cilindro1 = new CSG.Brush(cilindro_geom, this.material);
    //this.add(cilindro1); // Añade el cilindro a la escena

    // Cilindro 2
    var cilindro_geom2 = new THREE.CylinderGeometry(0.35,0.4,1,50,1);
    cilindro_geom2.translate(0,0.91,0);
    var cilindro2 = new CSG.Brush(cilindro_geom2, this.material);
    //this.add(cilindro2); // Añade el cilindro a la escena

    // Rectangulo para la parte superior
    var rectangulo_geom2 =  new THREE.BoxGeometry(0.8, 0.40, 0.8); // Crea un rectángulo
    rectangulo_geom2.translate(0,1.6,0); // Traslada el rectángulo
    var rectangulo2 = new CSG.Brush(rectangulo_geom2, this.material); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo2); // Añade el rectángulo a la escena

    
    var boton1 = this.createBotón();
    boton1.geometry.translate(0.2, 1.85, 0.2); // Traslada el botón a la posición deseada
    //this.add(boton1); // Añade el botón a la escena

    var boton2 = this.createBotón();
    boton2.geometry.translate(-0.2, 1.85, 0.2); // Traslada el botón a la posición deseada
    //this.add(boton2); // Añade el botón a la escena

    var boton3 = this.createBotón();
    boton3.geometry.translate(-0.2, 1.85, -0.2); // Traslada el botón a la posición deseada
    //this.add(boton3); // Añade el botón a la escena

    var boton4 = this.createBotón();
    boton4.geometry.translate(0.2, 1.85, -0.2); // Traslada el botón a la posición deseada
    //this.add(boton4); // Añade el botón a la escena


    
    //realiza las operaciones CSG para restar los cilindros del rectángulo
    var evaluator = new CSG.Evaluator();
    var tmp = evaluator.evaluate(rectangulo, cilindro1, CSG.ADDITION); // Resta el cilindro 1 al rectángulo
    var tmp2 = evaluator.evaluate(tmp, cilindro2, CSG.ADDITION); // Resta el cilindro 2 al resultado
    var tmp3 = evaluator.evaluate(tmp2, rectangulo2, CSG.ADDITION); // Resta el cilindro 3 al resultado
    var tmp4 = evaluator.evaluate(tmp3, boton1, CSG.ADDITION); // Resta el cilindro 4 al resultado
    var tmp5 = evaluator.evaluate(tmp4, boton2, CSG.ADDITION); // Resta el cilindro 5 al resultado
    var tmp6 = evaluator.evaluate(tmp5, boton3, CSG.ADDITION); // Resta el cilindro 6 al resultado
    var tmp7 = evaluator.evaluate(tmp6, boton4, CSG.ADDITION); // Resta el cilindro 7 al resultado

    tmp7.geometry.translate(-1.5,0,0); // Rota el resultado final

    this.add(tmp7); // Añade el resultado final a la escena
    
    

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

export { Torre }; // Exporta la clase para usarla en otros archivos