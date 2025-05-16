import * as THREE from '../libs/three.module.js';
import * as CSG from '../libs/three-bvh-csg.js';
import * as TWEEN from '../libs/tween.module.js';


class Pieza extends THREE.Object3D {

  constructor(tipo, color, fila, columna, di) {
    super();

    this.tipo = tipo; // "rey", "torre", etc.
    this.color = color; // "blanco" o "negro"
    this.fila = fila;   // posición lógica en tablero
    this.columna = columna;
    this.di = di;

    this.posicionarEnTablero(fila, columna);
  }

  posicionarEnTablero(fila, columna) {
    // Suponiendo cada casilla mide 1.4 unidad y o.4 d ealto
    // y el tablero es un cuadrado de 8x8

    const size = 1.4;
    const offset = (8 * size) / 2 - size / 2;

    this.position.x = columna * size - offset;
    this.position.z = fila * size - offset + 2;

  }

  moverA(fila, columna) {
    const size = 1.4;
    const offset = (8 * size) / 2 - size / 2;

    const destino = {
      x: columna * size - offset,
      z: fila * size - offset + 2,
      y: 0
    };

    this.fila = fila;
    this.columna = columna;

    // Altura máxima del salto
    const alturaSalto = 1;

    // 1. Subir
    const subir = new TWEEN.Tween(this.position)
      .to({ y: alturaSalto }, 300)
      .easing(TWEEN.Easing.Quadratic.Out);

    // 2. Mover horizontal mientras está arriba
    const moverHorizontal = new TWEEN.Tween(this.position)
      .to({ x: destino.x, z: destino.z }, 600)
      .easing(TWEEN.Easing.Quadratic.InOut);

    // 3. Bajar
    const bajar = new TWEEN.Tween(this.position)
      .to({ y: 0 }, 300)
      .easing(TWEEN.Easing.Quadratic.In);

    subir.chain(moverHorizontal);
    moverHorizontal.chain(bajar);

    subir.start();
  }

  movimientosValidos(tablero) {
    // Implementar en subclases
    return [];
  }

  //que devuleva su tipo
  getTipo() {
    return this.tipo;
  }
  //que devuleva su color
  getColor() {
    return this.color;
  }
  //que devuleva su fila
  getFila() {
    return this.fila;
  }
  //que devuleva su columna
  getColumna() {
    return this.columna;
  }
  //que devuleva su id
  getId() {
    return this.id;
  }

  //hacer los setters
  setTipo(tipo) {
    this.tipo = tipo;
  }
  setColor(color) {
    this.color = color;
  }
  setFila(fila) {
    this.fila = fila;
  }
  setColumna(columna) {
    this.columna = columna;
  }
  setId(id) {
    this.id = id;
  }



}

export { Pieza };