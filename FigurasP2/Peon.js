import * as THREE from '../libs/three.module.js';
import * as CSG from '../libs/three-bvh-csg.js';
import { Pieza } from './Pieza.js'; // Importar clase base


class Peon extends Pieza {
  
  constructor(color, fila, columna, di) {
    
    super("peon", color, fila, columna, di); // Asigna null en lugar de id aquí
    this.createFigura(); // Llama al método para crear la figura
    this.moverA(fila, columna ); // Posicionar en el tablero 3D
  }

  movimientosValidos(tablero) {
    const movimientos = [];
    const fila = this.fila;
    const columna = this.columna;
    const direccion = this.color === "blanco" ? -1 : 1; // blanco sube, negro baja
  
    const filaAdelante = fila + direccion;
  
    // Movimiento de 1 casilla adelante
    if (filaAdelante >= 0 && filaAdelante < 8 && tablero[filaAdelante][columna] === null) {
      movimientos.push({ fila: filaAdelante, columna });
  
      // Movimiento de 2 casillas si está en la fila inicial
      const filaInicial = this.color === "blanco" ? 6 : 1;
      const fila2Adelante = fila + 2 * direccion;
      if (fila === filaInicial && tablero[fila2Adelante][columna] === null) {
        movimientos.push({ fila: fila2Adelante, columna });
      }
    }
  
    // Captura en diagonal izquierda
    const colIzq = columna - 1;
    if (colIzq >= 0 && filaAdelante >= 0 && filaAdelante < 8) {
      const pieza = tablero[filaAdelante][colIzq];
      if (pieza && pieza.color !== this.color) {
        movimientos.push({ fila: filaAdelante, columna: colIzq });
      }
    }
  
    // Captura en diagonal derecha
    const colDer = columna + 1;
    if (colDer < 8 && filaAdelante >= 0 && filaAdelante < 8) {
      const pieza = tablero[filaAdelante][colDer];
      if (pieza && pieza.color !== this.color) {
        movimientos.push({ fila: filaAdelante, columna: colDer });
      }
    }
  
    return movimientos;
  }
  
 

  createFigura() {

    // Cargar texturas
  const loaderT = new THREE.TextureLoader();
  const texturaBlanca = loaderT.load('./texturas/wood.jpg');
  const texturaNegra = loaderT.load('./texturas/ladrillo.jpeg');

  // Seleccionar textura según el color
  let textura;
  if (this.color === "blanco") {
    textura = texturaBlanca;
  } else {
    textura = texturaNegra;
  }

  // Crear material con textura
  const material = new THREE.MeshStandardMaterial({ map: textura });
    
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

    Objeto.geometry.scale(1, 0.8, 1); // Escalar el objeto
    Objeto.geometry.translate(0, 0.4, -2); // Ajustar la posición del objeto
    this.add(Objeto);

  




  }
  update() {
    // Método de actualización si es necesario
  }

}

export { Peon };