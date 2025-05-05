import * as THREE from '../libs/three.module.js';
import * as CSG from '../libs/three-bvh-csg.js';



 class Pieza extends THREE.Object3D {
  
    constructor( tipo, color, fila, columna,di) {
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

        this.position.x =  columna *1.4  + 0.7 ; // Ajustar posición en x
        this.position.z =  fila  *1.4 + 2.7 ; // Ajustar posición en z
       
        
        
        this.position.y = 0.2; // Ajustar altura
        
     
    }
  
    moverA(fila, columna) {
      this.fila = fila;
      this.columna = columna;
      this.posicionarEnTablero(fila, columna);
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