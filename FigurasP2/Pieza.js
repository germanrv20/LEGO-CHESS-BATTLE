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

    const destinoX = columna * size - offset;
    const destinoZ = fila * size - offset + 2;

    const origenX = this.position.x;
    const origenZ = this.position.z;

    this.fila = fila;
    this.columna = columna;

    const alturaMax = 1;  // altura máxima del salto

    const objetoAnimacion = { t: 0 };

    new TWEEN.Tween(objetoAnimacion)
      .to({ t: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        const t = objetoAnimacion.t;
        // Interpolamos x, z linealmente
        this.position.x = origenX + (destinoX - origenX) * t;
        this.position.z = origenZ + (destinoZ - origenZ) * t;

        // Altura y con forma parabólica: y = 4*h*t*(1-t)
        this.position.y = 4 * alturaMax * t * (1 - t);
      })
      .onComplete(() => {
        this.position.y = 0;  // asegurar que termina a nivel suelo
      })
      .start();
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