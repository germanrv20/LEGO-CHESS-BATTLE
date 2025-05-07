import * as THREE from '../libs/three.module.js';

import { Rey } from './Rey.js';
import { Torre } from './Torre.js';
import { Alfil } from './Alfil.js';
import { Peon } from './Peon.js';
import { Caballo } from './caballo.js';
import { Reina } from './Reina.js';

class Tablero extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.material = new THREE.MeshStandardMaterial({
      flatShading: true,
      side: THREE.DoubleSide,
    });

    this.tablero = [];
    this.piezas = []; // opcional si quieres mantener una lista

    this.crearTablero();
    this.colocarPiezasIniciales();
    this.createFigura();
    this.createGUI(gui, titleGui);


    this.piezaSeleccionada = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();


    // Ejemplo de movimiento
    // this.moverPieza(this.reyBlanco, 4, 4);
  }

  handleClick(event, camera, domElement) {
    const rect = domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
    this.raycaster.setFromCamera(this.mouse, camera);
  
    const intersects = this.raycaster.intersectObjects(this.children, true);
  
    if (intersects.length > 0) {
      let objeto = intersects[0].object;
  
      // Buscar hacia arriba hasta encontrar una pieza con getTipo
      while (objeto && !(objeto instanceof THREE.Object3D && 'getTipo' in objeto)) {
        objeto = objeto.parent;
      }
  
      if (objeto && 'getTipo' in objeto) {
        this.piezaSeleccionada = objeto;
        console.log(`Seleccionada: ${objeto.getTipo()} ${objeto.getColor()} en (${objeto.getFila()}, ${objeto.getColumna()})`);
        return;
      }
    }
  
    // Si se hizo clic en una casilla vacía
    const destino = this.getCasillaDesdeMouse(this.raycaster);
    if (this.piezaSeleccionada && destino) {
      const { fila, columna } = destino;
      if (this.tablero[fila][columna] === null) {
        this.moverPieza(this.piezaSeleccionada, fila, columna);
        this.piezaSeleccionada = null;
      }
    }
  }


  getCasillaDesdeMouse(raycaster) {
    const plano = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersect = new THREE.Vector3();
    raycaster.ray.intersectPlane(plano, intersect);
  
    const size = 1.4;
    const offset = (8 * size) / 2;
  
    const x = intersect.x + offset;
    const z = intersect.z + offset;
  
    const columna = Math.floor(x / size);
    const fila = Math.floor(z / size);
  
    if (fila >= 0 && fila < 8 && columna >= 0 && columna < 8) {
      return { fila, columna };
    }
  
    return null;
  }
  
  

  crearTablero() {
    for (let fila = 0; fila < 8; fila++) {
      this.tablero[fila] = Array(8).fill(null);
    }
  }

  colocarPiezasIniciales() {
    // Reyes
    this.reyBlanco = new Rey('blanco', 7, 4, 0);
    this.reyNegro = new Rey('negro', 0, 4, 1);

    // Reinas
    this.reinaBlanca = new Reina('blanco', 7, 3, 2);
    this.reinaNegra = new Reina('negro', 0, 3, 3);

    // Torres
    this.torreBlanca1 = new Torre('blanco', 7, 0, 4);
    this.torreBlanca2 = new Torre('blanco', 7, 7, 5);
    this.torreNegra1 = new Torre('negro', 0, 0, 6);
    this.torreNegra2 = new Torre('negro', 0, 7, 7);

    // Alfiles
    this.alfilBlanco1 = new Alfil('blanco', 7, 2, 8);
    this.alfilBlanco2 = new Alfil('blanco', 7, 5, 9);
    this.alfilNegro1 = new Alfil('negro', 0, 2, 10);
    this.alfilNegro2 = new Alfil('negro', 0, 5, 11);

    // Caballos
    this.caballoBlanco1 = new Caballo('blanco', 7, 1, 12);
    this.caballoBlanco2 = new Caballo('blanco', 7, 6, 13);
    this.caballoNegro1 = new Caballo('negro', 0, 1, 14);
    this.caballoNegro2 = new Caballo('negro', 0, 6, 15);

    // Peones blancos
    this.peonBlanco0 = new Peon('blanco', 6, 0, 16);
    this.peonBlanco1 = new Peon('blanco', 6, 1, 17);
    this.peonBlanco2 = new Peon('blanco', 6, 2, 18);
    this.peonBlanco3 = new Peon('blanco', 6, 3, 19);
    this.peonBlanco4 = new Peon('blanco', 6, 4, 20);
    this.peonBlanco5 = new Peon('blanco', 6, 5, 21);
    this.peonBlanco6 = new Peon('blanco', 6, 6, 22);
    this.peonBlanco7 = new Peon('blanco', 6, 7, 23);

    // Peones negros
    this.peonNegro0 = new Peon('negro', 1, 0, 24);
    this.peonNegro1 = new Peon('negro', 1, 1, 25);
    this.peonNegro2 = new Peon('negro', 1, 2, 26);
    this.peonNegro3 = new Peon('negro', 1, 3, 27);
    this.peonNegro4 = new Peon('negro', 1, 4, 28);
    this.peonNegro5 = new Peon('negro', 1, 5, 29);
    this.peonNegro6 = new Peon('negro', 1, 6, 30);
    this.peonNegro7 = new Peon('negro', 1, 7, 31);


    // Agrupar todas para facilitar render
    const piezas = [
      this.reyBlanco, this.reyNegro,
      this.reinaBlanca, this.reinaNegra,
      this.torreBlanca1, this.torreBlanca2,
      this.torreNegra1, this.torreNegra2,
      this.alfilBlanco1, this.alfilBlanco2,
      this.alfilNegro1, this.alfilNegro2,
      this.caballoBlanco1, this.caballoBlanco2,
      this.caballoNegro1, this.caballoNegro2,
      this.peonBlanco0, this.peonBlanco1, this.peonBlanco2, this.peonBlanco3,
      this.peonBlanco4, this.peonBlanco5, this.peonBlanco6, this.peonBlanco7,
      this.peonNegro0, this.peonNegro1, this.peonNegro2, this.peonNegro3,
      this.peonNegro4, this.peonNegro5, this.peonNegro6, this.peonNegro7
    ];


    piezas.forEach(pieza => {
      this.tablero[pieza.fila][pieza.columna] = pieza;
      this.add(pieza);
      this.piezas.push(pieza); // opcional
    });
  }

  moverPieza(pieza, nuevaFila, nuevaColumna) {
    if (this.tablero[nuevaFila][nuevaColumna] === null) {
      this.tablero[pieza.fila][pieza.columna] = null;
      pieza.moverA(nuevaFila, nuevaColumna);
      this.tablero[nuevaFila][nuevaColumna] = pieza;
    }
  }


  createFigura() {
    const size = 1.4;
    const geometry = new THREE.BoxGeometry(size, 0.4, size);
    const blanco = new THREE.MeshStandardMaterial({ color: 'white' });
    const negro = new THREE.MeshStandardMaterial({ color: 'black' });

    const offset = (8 * size) / 2;

    for (let fila = 0; fila < 8; fila++) {
      for (let col = 0; col < 8; col++) {
        const color = (fila + col) % 2 === 0 ? blanco : negro;
        const casilla = new THREE.Mesh(geometry, color);
        casilla.position.set(
          col * size - offset + size / 2,
          0,
          fila * size - offset + size / 2
        );
        this.add(casilla);
      }
    }
  }




  createGUI(gui, titleGui) {
    this.guiControls = {
      resolucion: 10,
    };
  }

  update() {
    // Por si necesitas animaciones o lógica por frame
  }
}

export { Tablero };
