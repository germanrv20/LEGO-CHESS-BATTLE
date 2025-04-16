import * as THREE from '../libs/three.module.js'; // Importa la librería Three.js
import * as CSG from '../libs/three-bvh-csg.js'; // Importa la librería para operaciones CSG (Constructive Solid Geometry)

class Tablero extends THREE.Object3D { // Define una clase que extiende de Object3D
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
    
   
    // Material para los objetos 3D
     

    var material = new THREE.MeshNormalMaterial({ flatShading: true });
    var material2 = new THREE.MeshStandardMaterial({ color: 'black'});
    var material3 = new THREE.MeshStandardMaterial({ color: 'white'});

    //********************** CASILLAS DEL TABLERO ***************************
   
    // CASILLA NEGRA 1

    var rectangulo_geom =  new THREE.BoxGeometry(1.4, 0.40, 1.4); // Crea un rectángulo
    rectangulo_geom.translate(0.7,0,0.7); // Traslada el rectángulo
    var rectangulo = new CSG.Brush(rectangulo_geom, material2); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo); // Añade el rectángulo a la escena

    var boton1 = this.createBotón();
    boton1.geometry.translate(0.35,0.23,0.35); // Traslada el botón
    //this.add(boton1); // Añade el botón a la escena

    var boton2 = this.createBotón();
    boton2.geometry.translate(0.35,0.23,1.05); // Traslada el botón
    //this.add(boton2); // Añade el botón a la escena

    var boton3 = this.createBotón();
    boton3.geometry.translate(1.05,0.23,0.35); // Traslada el botón
    //this.add(boton3); // Añade el botón a la escena

    var boton4 = this.createBotón();
    boton4.geometry.translate(1.05,0.23,1.05); // Traslada el botón
    //this.add(boton4); // Añade el botón a la escena


    var evaluator = new CSG.Evaluator();
    var tmp = evaluator.evaluate(rectangulo, boton1, CSG.ADDITION);
    var tmp2 = evaluator.evaluate(tmp, boton2, CSG.ADDITION);
    var tmp3 = evaluator.evaluate(tmp2, boton3, CSG.ADDITION);
    var casilla_negra = evaluator.evaluate(tmp3, boton4, CSG.ADDITION);
    //this.add(casilla_negra); // Añade el botón a la escena



    // CASILLA BLANCA 1

    var rectangulo_geom2 =  new THREE.BoxGeometry(1.4, 0.40, 1.4); // Crea un rectángulo
    rectangulo_geom2.translate(2.1,0,0.7); // Traslada el rectángulo
    var rectangulo_2 = new CSG.Brush(rectangulo_geom2, material3); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo_2); // Añade el rectángulo a la escena

    var boton1_2 = this.createBotón();
    boton1_2.geometry.translate(1.75, 0.23, 0.35); // Traslada el botón
    //this.add(boton1_2); // Añade el botón a la escena

    var boton2_2 = this.createBotón();
    boton2_2.geometry.translate(1.75, 0.23, 1.05); // Traslada el botón
    //this.add(boton2_2); // Añade el botón a la escena

    var boton3_2 = this.createBotón();
    boton3_2.geometry.translate(2.35, 0.23, 0.35); // Traslada el botón
    //this.add(boton3_2); // Añade el botón a la escena

    var boton4_2 = this.createBotón();
    boton4_2.geometry.translate(2.35, 0.23, 1.05); // Traslada el botón
    //this.add(boton4_2); // Añade el botón a la escena

    var evaluator2 = new CSG.Evaluator();
    var tmp_2 = evaluator2.evaluate(rectangulo_2, boton1_2, CSG.ADDITION);
    var tmp2_2 = evaluator2.evaluate(tmp_2, boton2_2, CSG.ADDITION);
    var tmp3_2 = evaluator2.evaluate(tmp2_2, boton3_2, CSG.ADDITION);
    var casilla_blanca = evaluator2.evaluate(tmp3_2, boton4_2, CSG.ADDITION);
    //this.add(casilla_blanca); // Añade el botón a la escena
   


    // CASILLA BLANCA 2

    var rectangulo_geom_3 =  new THREE.BoxGeometry(1.4, 0.40, 1.4); // Crea un rectángulo
    rectangulo_geom_3.translate(0.7,0,2.1); // Traslada el rectángulo
    var rectangulo_3 = new CSG.Brush(rectangulo_geom_3, material3); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo_3); // Añade el rectángulo a la escena

    var boton1_3 = this.createBotón();
    boton1_3.geometry.translate(0.35, 0.23, 1.75); // Traslada el botón
    //this.add(boton1_3); // Añade el botón a la escena

    var boton2_3 = this.createBotón();
    boton2_3.geometry.translate(0.35, 0.23, 2.45); // Traslada el botón
    //this.add(boton2_3); // Añade el botón a la escena

    var boton3_3 = this.createBotón();
    boton3_3.geometry.translate(1.05, 0.23, 1.75); // Traslada el botón
    //this.add(boton3_3); // Añade el botón a la escena

    var boton4_3 = this.createBotón();
    boton4_3.geometry.translate(1.05, 0.23, 2.45); // Traslada el botón
    //this.add(boton4_3); // Añade el botón a la escena


    var evaluator3 = new CSG.Evaluator();
    var tmp_3 = evaluator3.evaluate(rectangulo_3, boton1_3, CSG.ADDITION);
    var tmp2_3 = evaluator3.evaluate(tmp_3, boton2_3, CSG.ADDITION);
    var tmp3_3 = evaluator3.evaluate(tmp2_3, boton3_3, CSG.ADDITION);
    var casilla_blanca_2 = evaluator3.evaluate(tmp3_3, boton4_3, CSG.ADDITION);
    //this.add(casilla_blanca_2); // Añade el botón a la escena



    // CASILLA NEGRA 2   

    var rectangulo_geom_4 =  new THREE.BoxGeometry(1.4, 0.40, 1.4); // Crea un rectángulo
    rectangulo_geom_4.translate(2.1,0,2.1); // Traslada el rectángulo
    var rectangulo_4 = new CSG.Brush(rectangulo_geom_4, material2); // Crea un mesh con el rectángulo y el material
    //this.add(rectangulo_4); // Añade el rectángulo a la escena

    var boton1_4 = this.createBotón();
    boton1_4.geometry.translate(1.75, 0.23, 1.75); // Traslada el botón
    //this.add(boton1_4); // Añade el botón a la escena

    var boton2_4 = this.createBotón();
    boton2_4.geometry.translate(2.35, 0.23, 2.45); // Traslada el botón
    //this.add(boton2_4); // Añade el botón a la escena

    var boton3_4 = this.createBotón();
    boton3_4.geometry.translate(2.35, 0.23, 1.75); // Traslada el botón
    //this.add(boton3_4); // Añade el botón a la escena

    var boton4_4 = this.createBotón();
    boton4_4.geometry.translate(1.75, 0.23, 2.45); // Traslada el botón
    //this.add(boton4_4); // Añade el botón a la escena


    var evaluator4 = new CSG.Evaluator();
    var tmp_4 = evaluator4.evaluate(rectangulo_4, boton1_4, CSG.ADDITION);
    var tmp2_4 = evaluator4.evaluate(tmp_4, boton2_4, CSG.ADDITION);
    var tmp3_4 = evaluator4.evaluate(tmp2_4, boton3_4, CSG.ADDITION);
    var casilla_negra_2 = evaluator4.evaluate(tmp3_4, boton4_4, CSG.ADDITION);
    //this.add(casilla_negra_2); // Añade el botón a la escena



    var evaluator5 = new CSG.Evaluator();
    var casilla_final = evaluator5.evaluate(casilla_negra, casilla_blanca, CSG.ADDITION);
    var casilla_final2 = evaluator5.evaluate(casilla_final, casilla_blanca_2, CSG.ADDITION);
    var casilla_final3 = evaluator5.evaluate(casilla_final2, casilla_negra_2, CSG.ADDITION);
    

    //TABLERO FINAL 
    
    this.add(casilla_final3); // Añade el botón a la escena

    var cuadrado1 = casilla_final3.clone();
    cuadrado1.position.set(2.8, 0, 0); // Posición del cuadrado
    this.add(cuadrado1); // Añade el cuadrado a la escena

    var cuadrado2 = casilla_final3.clone();
    cuadrado2.position.set(2.8, 0, 2.8); // Posición del cuadrado
    this.add(cuadrado2); // Añade el cuadrado a la escena

    var cuadrado3 = casilla_final3.clone();
    cuadrado3.position.set(0, 0, 2.8); // Posición del cuadrado
    this.add(cuadrado3); // Añade el cuadrado a la escena

    var cuadrado4 = casilla_final3.clone();
    cuadrado4.position.set(5.6, 0, 0); // Posición del cuadrado
    this.add(cuadrado4); // Añade el cuadrado a la escena

    var cuadrado5 = casilla_final3.clone();
    cuadrado5.position.set(5.6, 0, 2.8); // Posición del cuadrado
    this.add(cuadrado5); // Añade el cuadrado a la escena

    var cuadrado6 = casilla_final3.clone();
    cuadrado6.position.set(0, 0, 5.6); // Posición del cuadrado
    this.add(cuadrado6); // Añade el cuadrado a la escena

    var cuadrado7 = casilla_final3.clone();
    cuadrado7.position.set(2.8, 0, 5.6); // Posición del cuadrado
    this.add(cuadrado7); // Añade el cuadrado a la escena

    var cuadrado8 = casilla_final3.clone();
    cuadrado8.position.set(5.6, 0, 5.6); // Posición del cuadrado
    this.add(cuadrado8); // Añade el cuadrado a la escena

    var cuadrado9 = casilla_final3.clone();
    cuadrado9.position.set(0, 0, 8.4); // Posición del cuadrado
    this.add(cuadrado9); // Añade el cuadrado a la escena
    
    var cuadrado10 = casilla_final3.clone();
    cuadrado10.position.set(2.8, 0, 8.4); // Posición del cuadrado
    this.add(cuadrado10); // Añade el cuadrado a la escena

    var cuadrado11 = casilla_final3.clone();
    cuadrado11.position.set(5.6, 0, 8.4); // Posición del cuadrado
    this.add(cuadrado11); // Añade el cuadrado a la escena

    var cuadrado12 = casilla_final3.clone();
    cuadrado12.position.set(8.4, 0, 0); // Posición del cuadrado
    this.add(cuadrado12); // Añade el cuadrado a la escena

    var cuadrado13 = casilla_final3.clone();
    cuadrado13.position.set(8.4, 0, 2.8); // Posición del cuadrado
    this.add(cuadrado13); // Añade el cuadrado a la escena

    var cuadrado14 = casilla_final3.clone();
    cuadrado14.position.set(8.4, 0, 5.6); // Posición del cuadrado
    this.add(cuadrado14); // Añade el cuadrado a la escena
    
    var cuadrado15 = casilla_final3.clone();
    cuadrado15.position.set(8.4, 0, 8.4); // Posición del cuadrado
    this.add(cuadrado15); // Añade el cuadrado a la escena



  }


  createBotón() {
    // Crear material para las geometrías
    const material = new THREE.MeshNormalMaterial({ flatShading: true });
    var material2 = new THREE.MeshStandardMaterial({ color: 'grey'});

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

export { Tablero }; // Exporta la clase para usarla en otros archivos
