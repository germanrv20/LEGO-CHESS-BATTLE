import * as THREE from '../libs/three.module.js';
import { OBJLoader } from '../libs/OBJLoader.js';
import * as TWEEN from '../libs/tween.module.js';


import { Rey } from './Rey.js';
import { Torre } from './Torre.js';
import { Alfil } from './Alfil.js';
import { Peon } from './Peon.js';
import { Caballo } from './caballo.js';
import { Reina } from './Reina.js';

class Tablero extends THREE.Object3D {
  constructor(gui, titleGui, escenaPadre) {
    super();

    this.material = new THREE.MeshStandardMaterial({
      flatShading: true,
      side: THREE.DoubleSide,
    });

    this.tablero = [];
    this.piezas = [];
    this.resaltados = [];

    this.crearTablero();
    this.colocarPiezasIniciales();
    this.createFigura();
    this.createGUI(gui, titleGui);


    //LUZ TABLero
    // Añadir una luz adicional para el tablero blanco
    this.luzTableroBlanco = new THREE.SpotLight(0xffffff, 1.5); // Luz blanca de intensidad 1.5
    this.luzTableroBlanco.angle = Math.PI / 4; // Ángulo de la luz
    this.luzTableroBlanco.penumbra = 0.2; // Suavizar bordes de la luz
    this.luzTableroBlanco.castShadow = true; // Habilitar sombras
    this.luzTableroBlanco.visible = true; // Hacer la luz visible

    // Colocar la luz en una posición que apunte al tablero blanco
    this.luzTableroBlanco.position.set(0, 10, 10); // Ajusta las coordenadas de la luz

    // Establecer un punto de referencia donde están las piezas negras (por ejemplo, en el centro de la zona de piezas negras)
    const puntoDeDestino = new THREE.Vector3(0, 0, 0); // Este es el centro del tablero en la zona de las piezas negras (filas 0 y 1)

    // Puedes hacer que el target de la luz apunte a esta zona
    this.luzTableroBlanco.target.position.copy(puntoDeDestino);

    // Agregar la luz al tablero
    this.add(this.luzTableroBlanco);


    


    // LUZ - Inicializar luz roja
    this.luzTarget = new THREE.Object3D();
    this.add(this.luzTarget); // ¡Esto es fundamental!

    // Crear la luz roja con mayor intensidad
    this.luzSeleccion = new THREE.SpotLight(0xff0000, 100); // Color rojo y mayor intensidad
    this.luzSeleccion.angle = Math.PI / 4;
    this.luzSeleccion.penumbra = 0.3;
    this.luzSeleccion.castShadow = true;
    this.luzSeleccion.visible = false; // Inicialmente no visible
    this.luzSeleccion.target = this.luzTarget;
    this.add(this.luzSeleccion);

    this.piezaSeleccionada = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.turnoActual = 'blanco'; // ← Añadido: Control del turno
    this.partidaTerminada = false; // ← Añadido
    this.escenaPadre = escenaPadre;

  }

  apuntarLuzAPieza(pieza) {
    if (pieza) {
      this.luzTarget.position.copy(pieza.position); // Actualizamos el target real
      this.luzSeleccion.position.set(
        pieza.position.x,
        pieza.position.y + 3,  // Ajusta la altura si es necesario
        pieza.position.z - 3.5
      );
      this.luzSeleccion.visible = true; // Hacemos visible la luz
    } else {
      this.luzSeleccion.visible = false; // Si no hay pieza, apagamos la luz
    }
  }



  handleClick(event, camera, domElement) {
    if (this.partidaTerminada) return;

    const rect = domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, camera);
    const intersects = this.raycaster.intersectObjects(this.children, true);

    if (intersects.length > 0) {
      let objeto = intersects[0].object;

      // Buscar objeto con método getTipo (una pieza)
      while (objeto && !(objeto instanceof THREE.Object3D && 'getTipo' in objeto)) {
        objeto = objeto.parent;
      }

      if (objeto && 'getTipo' in objeto) {
        // Verificar turno correcto
        if (objeto.getColor() !== this.turnoActual) {
          console.log(`No es el turno de las piezas ${objeto.getColor()}`);
          return;
        }

        // Deselección si clic en la misma pieza
        if (this.piezaSeleccionada === objeto) {
          this.piezaSeleccionada = null;
          this.eliminarResaltados();
          this.apuntarLuzAPieza(null); // ← Apagar luz
          console.log("Pieza deseleccionada");
          return;
        }

        // Si había otra seleccionada, limpiar
        if (this.piezaSeleccionada) {
          this.eliminarResaltados();
        }

        // Nueva selección
        this.piezaSeleccionada = objeto;
        this.apuntarLuzAPieza(objeto); // ← Encender luz
        this.resaltarMovimientosValidos(objeto);
        console.log(`Seleccionada: ${objeto.getTipo()} ${objeto.getColor()} en (${objeto.getFila()}, ${objeto.getColumna()})`);

        //if (objeto instanceof Reina) {
        //  objeto.moverPiernaDer(Math.PI / 2);
        //}

       
        
        
        return;
      }
    }

    // Si se hizo clic en el tablero para mover
    if (this.piezaSeleccionada) {
      const destino = this.getCasillaDesdeMouse(this.raycaster);
      if (!destino) return;

      const { fila, columna } = destino;
      const validos = this.piezaSeleccionada.movimientosValidos(this.tablero);
      const esMovimientoValido = validos.some(m => m.fila === fila && m.columna === columna);
      const piezaDestino = this.tablero[fila][columna];
      const esCaptura = piezaDestino && piezaDestino.color !== this.piezaSeleccionada.color;

      if (esMovimientoValido) {
        const pieza = this.piezaSeleccionada;

        if (esCaptura) {
          this.eliminarPieza(piezaDestino);
        }

        // Mover pieza
        this.tablero[pieza.getFila()][pieza.getColumna()] = null;
        this.tablero[fila][columna] = pieza;
        pieza.moverA(fila, columna);


        // Limpiar selección
        this.piezaSeleccionada = null;
        this.eliminarResaltados();
        this.apuntarLuzAPieza(null); // ← Apagar luz

        // Cambiar turno
        this.turnoActual = this.turnoActual === 'blanco' ? 'negro' : 'blanco';
        console.log(`Turno cambiado. Ahora juega: ${this.turnoActual}`);

        this.turno = this.turno === 'blanco' ? 'negro' : 'blanco';
        this.apuntarLuzAPieza(null);  // apagar primero
        this.escenaPadre.transicionarCamara(this.turno);  // ← esto hace la animación suave
        this.apuntarLuzAPieza(this.piezaSeleccionada); // volver a apuntar si es necesario


      } else {
        console.log("Movimiento inválido para esa pieza");
      }
    }
  }



  eliminarPieza(pieza) {
    const index = this.piezas.indexOf(pieza);
    if (index !== -1) {
      this.piezas.splice(index, 1);
      this.remove(pieza);
      console.log(`${pieza.getTipo()} ${pieza.getColor()} capturada`);

      if (pieza.getTipo().toLowerCase() === 'rey') {
        this.partidaTerminada = true;
        const ganador = pieza.getColor() === 'blanco' ? 'Negro' : 'Blanco';
        alert(`¡El Rey ${pieza.getColor()} ha sido capturado! ${ganador} gana la partida.`);
        console.log(`Partida terminada. Ganador: ${ganador}`);
      }
    }
  }


  resaltarMovimientosValidos(pieza) {
    this.eliminarResaltados();
    const validos = pieza.movimientosValidos(this.tablero);

    const size = 1.4;
    const verde = new THREE.MeshStandardMaterial({ color: 'green' });

    validos.forEach(movimiento => {
      const casilla = new THREE.Mesh(new THREE.BoxGeometry(size, 0.2, size), verde);
      const offset = (8 * size) / 2;
      casilla.position.set(
        movimiento.columna * size - offset + size / 2,
        0.2,
        movimiento.fila * size - offset + size / 2
      );
      this.add(casilla);
      this.resaltados.push(casilla);
    });
  }


  eliminarResaltados() {
    if (this.resaltados.length > 0) {
      this.resaltados.forEach(casilla => {
        this.remove(casilla);
      });
      this.resaltados = [];
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
    const piezas = [
      new Rey('blanco', 7, 4, 0), new Rey('negro', 0, 4, 1),
      new Reina('blanco', 7, 3, 2), new Reina('negro', 0, 3, 3),
      new Torre('blanco', 7, 0, 4), new Torre('blanco', 7, 7, 5),
      new Torre('negro', 0, 0, 6), new Torre('negro', 0, 7, 7),
      new Alfil('blanco', 7, 2, 8), new Alfil('blanco', 7, 5, 9),
      new Alfil('negro', 0, 2, 10), new Alfil('negro', 0, 5, 11),
      new Caballo('blanco', 7, 1, 12), new Caballo('blanco', 7, 6, 13),
      new Caballo('negro', 0, 1, 14), new Caballo('negro', 0, 6, 15),
    ];

    for (let i = 0; i < 8; i++) {
      piezas.push(new Peon('blanco', 6, i, 16 + i));
      piezas.push(new Peon('negro', 1, i, 24 + i));
    }

    piezas.forEach(p => {
      this.tablero[p.fila][p.columna] = p;
      this.add(p);
      this.piezas.push(p);
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
    // Si quisieras animar algo extra, lo harías aquí. La luz ya apunta correctamente.
  }

}

export { Tablero };
