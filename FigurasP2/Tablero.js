import * as THREE from '../libs/three.module.js';
import * as CSG from '../libs/three-bvh-csg.js';

import { Pieza } from './Pieza.js'; // Importar clase base

import { Rey } from './Rey.js'
import { Torre } from './Torre.js'
import { Lego } from './Lego.js'
import { Alfil } from './Alfil.js'
import { Peon } from './Peon.js'
import { Caballo } from './caballo.js';
import { Reina } from './Reina.js';
class Tablero extends THREE.Object3D {
  constructor(gui, titleGui) {
    super(); // Llama al constructor de la clase base

    // Define un material para las casillas
    this.material = new THREE.MeshStandardMaterial({
      flatShading: true,
      side: THREE.DoubleSide,
      transparent: false,
      opacity: 0.5,
    });

    // Llama a los métodos para crear GUI y la figura del tablero
    this.createGUI(gui, titleGui);
    this.createFigura(); // Crea las casillas y los botones

     // Inicializa la matriz del tablero
     this.tablero = [];
     this.crearTablero();
 
     this.createGUI(gui, titleGui);
     this.createFigura(); // Crea las casillas y los botones
  }

  crearTablero() {
    // Inicializa la matriz vacía
    for (let fila = 0; fila < 8; fila++) {
      this.tablero[fila] = [];
      for (let col = 0; col < 8; col++) {
        this.tablero[fila][col] = null;  // Inicializa las casillas vacías
      }
    }

    // Coloca las piezas iniciales
    this.colocarPiezasIniciales();
  }

  // Método para mover la pieza tanto en la matriz como en la escena
  moverPieza(pieza, nuevaFila, nuevaColumna) {
    // Verifica si la nueva posición está vacía
    if (this.tablero[nuevaFila][nuevaColumna] === null) {
      // Vaciar la casilla actual
      this.tablero[pieza.fila][pieza.columna] = null;

      // Actualizar la posición lógica de la pieza
      pieza.fila = nuevaFila;
      pieza.columna = nuevaColumna;

      // Colocar la pieza en la nueva casilla en la matriz
      this.tablero[pieza.fila][pieza.columna] = pieza;

      // Mover la pieza visualmente en 3D
      
      pieza.moverA(nuevaFila, nuevaColumna);
    }


    
  }

  // Coloca las piezas en sus posiciones iniciales
  colocarPiezasIniciales() {
    // Aquí colocamos algunas piezas como ejemplo
    const reyBlanco = new Rey('blanco', 7, 3,0); 
    const reyNegro = new Rey('negro', 0, 3, 1);  
    const TorreNegroA = new Torre('blanco', 0, 0 ,2 );  
    const TorreBlancaA = new Torre('blanco', 7, 0, 3);
    const TorreNegroB = new Torre('negro', 0, 7 ,4 );  
    const TorreBlancaB = new Torre('negro', 7, 7, 5);  

    const PeonA1 = new Peon("negro",6,0,6);   
    const PeonA2 = new Peon("negro",6,1,7); 
    const PeonA3 = new Peon("negro",6,2,8);
    const PeonA4 = new Peon("negro",6,3,9);
    const PeonA5 = new Peon("negro",6,4,10);
    const PeonA6 = new Peon("negro",6,5,11);
    const PeonA7 = new Peon("negro",6,6,12);
    const PeonA8 = new Peon("negro",6,7,13);


    const PeonB1 = new Peon("blanco",1,0,14);   
    const PeonB2 = new Peon("blanco",1,1,15); 
    const PeonB3 = new Peon("blanco",1,2,16);
    const PeonB4 = new Peon("blanco",1,3,17);
    const PeonB5 = new Peon("blanco",1,4,18);
    const PeonB6 = new Peon("blanco",1,5,19);
    const PeonB7 = new Peon("blanco",1,6,20);
    const PeonB8 = new Peon("blanco",1,7,21);

    const AlfilA1 = new Alfil("negro",0,2,22);
    const AlfilA2 = new Alfil("negro",0,5,23);

    const AlfilB1 = new Alfil("blanco",7,2,24);
    const AlfilB2 = new Alfil("blanco",7,5,25);

    const CaballoA1 = new Caballo("negro",0,1,26);
    const CaballoA2 = new Caballo("negro",0,6,27);
    const CaballoB1 = new Caballo("blanco",7,1,28);
    const CaballoB2 = new Caballo("blanco",7,6,29);

    const ReinaA1 = new Reina("negro",0,4,30);
    const ReinaB1 = new Reina("blanco",7,4,31);
    
    
    
    

    // Coloca las piezas en la matriz de piezas como s ehan definido antes
    this.tablero[7][3] = reyBlanco;
    this.tablero[0][3] = reyNegro;
    this.tablero[0][0] = TorreNegroA;
    this.tablero[7][0] = TorreBlancaA;
    this.tablero[0][7] = TorreNegroB;
    this.tablero[7][7] = TorreBlancaB;
    this.tablero[6][0] = PeonA1;
    this.tablero[6][1] = PeonA2;
    this.tablero[6][2] = PeonA3;
    this.tablero[6][3] = PeonA4;
    this.tablero[6][4] = PeonA5;
    this.tablero[6][5] = PeonA6;
    this.tablero[6][6] = PeonA7;
    this.tablero[6][7] = PeonA8;
    this.tablero[1][0] = PeonB1;
    this.tablero[1][1] = PeonB2;
    this.tablero[1][2] = PeonB3;
    this.tablero[1][3] = PeonB4;
    this.tablero[1][4] = PeonB5;
    this.tablero[1][5] = PeonB6;
    this.tablero[1][6] = PeonB7;
    this.tablero[1][7] = PeonB8;
    this.tablero[0][2] = AlfilA1;
    this.tablero[0][5] = AlfilA2;
    this.tablero[7][2] = AlfilB1;
    this.tablero[7][5] = AlfilB2;
    this.tablero[0][1] = CaballoA1;
    this.tablero[0][6] = CaballoA2;
    this.tablero[7][1] = CaballoB1;
    this.tablero[7][6] = CaballoB2;
    this.tablero[0][4] = ReinaA1;
    this.tablero[7][4] = ReinaB1;
   

   
    //this.moverPieza(reyBlanco, 5, 3); // Mueve el rey blanco a su posición inicial
    //this.moverPieza(AlfilA1, 4, 4);
    //this.moverPieza(PeonA1, 4, 5);

    // Añadir las piezas a la escena
    this.add(reyBlanco);
    this.add(reyNegro);
    this.add(TorreNegroA);
    this.add(TorreBlancaA);
    this.add(TorreNegroB);
    this.add(TorreBlancaB);
    this.add(PeonA1);
    this.add(PeonA2);
    this.add(PeonA3);
    this.add(PeonA4);
    this.add(PeonA5);
    this.add(PeonA6);
    this.add(PeonA7);
    this.add(PeonA8);

    this.add(PeonB1);
    this.add(PeonB2);
    this.add(PeonB3);
    this.add(PeonB4);
    this.add(PeonB5);
    this.add(PeonB6);
    this.add(PeonB7);
    this.add(PeonB8);

    this.add(AlfilA1);
    this.add(AlfilA2);
    this.add(AlfilB1);
    this.add(AlfilB2);

    this.add(CaballoA1);
    this.add(CaballoA2);
    this.add(CaballoB1);
    this.add(CaballoB2);

    this.add(ReinaA1);
    this.add(ReinaB1);
    
  }

  createFigura() {
    const size = 1.4;
    const materialBlanco = new THREE.MeshStandardMaterial({ color: 'white' });
    const materialNegro = new THREE.MeshStandardMaterial({ color: 'black' });
    const colores = [materialBlanco, materialNegro];

    for (let fila = 0; fila < 8; fila++) {
      for (let col = 0; col < 8; col++) {
        const colorIndex = (fila + col) % 2;
        const material = colores[colorIndex];

        const base = new CSG.Brush(new THREE.BoxGeometry(size, 0.4, size), material);
        base.geometry.translate(size / 2, 0, size / 2);

        const evaluator = new CSG.Evaluator();
        let casilla = base;


        // Coordenadas relativas dentro de la casilla
        const botonOffsets = [
          { dx: 0.3, dz: 0.3 },
          { dx: 1.1, dz: 0.3 },
          { dx: 0.3, dz: 1.1 },
          { dx: 1.1, dz: 1.1 }
        ];

        for (let i = 0; i < 4; i++) {
          const { dx, dz } = botonOffsets[i];
          const boton = this.createBotón(material);
          boton.geometry.translate(dx, 0.23, dz); // Solo traslada dentro de la casilla

          casilla = evaluator.evaluate(casilla, boton, CSG.ADDITION);
        }


        casilla.position.set(col * size, 0, fila * size);

        this.add(casilla);
      }
    }

  }


  createBotón(material) {
    // Usamos tu función para crear los botones, que ya está bien definida
    const material2 = material

    // Función auxiliar para crear letras con extrusión
    const createLetter = (shapeCallback, depth = 0.1, translate = { x: 0, y: 0 }) => {
      const shape = new THREE.Shape();
      shapeCallback(shape);
      const geometry = new THREE.ExtrudeGeometry(shape, { steps: 10, depth, curveSegments: 10 });
      geometry.translate(translate.x, translate.y, 0);
      return new CSG.Brush(geometry, material2);
    };

    // Configuración de las letras en el botón
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

    // Crear las letras con un bucle
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

    // Combina las letras con el botón base
    const finalButton = evaluator.evaluate(combinedLetters, botonBase, CSG.ADDITION);

    // Realiza transformaciones finales en el botón
    finalButton.geometry.rotateX(-Math.PI / 2);
    finalButton.geometry.scale(0.05, 0.05, 0.05);
    finalButton.geometry.translate(-0.065, 0, 0.025);

    return finalButton; // Devuelve el botón
  }

  createGUI(gui, titleGui) {
    // Creación de controles para la GUI
    this.guiControls = {
      resolucion: 10, // Valor de la resolución inicial
    };
  }

  update() {
    // Actualizaciones si es necesario
  }
}

export { Tablero }; // Exporta la clase para usarla en otros archivos
