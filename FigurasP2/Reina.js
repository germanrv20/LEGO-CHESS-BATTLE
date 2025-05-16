import * as THREE from '../libs/three.module.js';
import { OBJLoader } from '../libs/OBJLoader.js';
import { Pieza } from './Pieza.js';
import * as TWEEN from '../libs/tween.module.js';

class Reina extends Pieza {

  constructor(color, fila, columna, di) {

    super("Reina", color, fila, columna, di);
    this.createFigura();
    super.moverA(fila, columna);

  }
  moverA(fila, columna) {
    this.fila = fila;
    this.columna = columna;

    const size = 1.4;
    const offset = (8 * size) / 2;

    const destino = {
      x: columna * size - offset,
      z: fila * size - offset,
      y: 0
    };

    const direccionExtra = this.color === "blanco" ? 1 : -1;

    // Animación de piernas
    const origenPiernas = { p: 0.0 };
    const destinoPiernas = { p: direccionExtra };

    const caminarTween = new TWEEN.Tween(origenPiernas)
      .to(destinoPiernas, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => this.metodoAnimacionCaminar(origenPiernas.p))
      .onComplete(() => {
        this.piernaDer.rotation.z = 0;
        this.piernaIzq.rotation.z = 0;
      })
      .repeat(1)
      .yoyo(true)
      .start();

    new TWEEN.Tween(this.position)
      .to(destino, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }


  moverA(fila, columna) {
    this.fila = fila;
    this.columna = columna;

    const size = 1.4;
    const offset = (8 * size) / 2;

    // Posición 3D correcta
    const destino = {
      x: columna * size - offset + size / 2,
      z: fila * size - offset + size / 2,
      y: 0
    };

    // Animación de piernas (una oscilación)
    const origenPiernas = { p: 0.0 };
    const destinoPiernas = { p: 1 };

    const caminarTween = new TWEEN.Tween(origenPiernas)
      .to(destinoPiernas, 250)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => this.metodoAnimacionCaminar(origenPiernas.p))
      .onComplete(() => {
        if (this.piernaDer) this.piernaDer.rotation.z = 0;
        if (this.piernaIzq) this.piernaIzq.rotation.z = 0;
      })
      .yoyo(true)
      .repeat(1);

    // Mueve la pieza
    new TWEEN.Tween(this.position)
      .to(destino, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onStart(() => caminarTween.start())
      .start();

  }






  movimientosValidos(tablero) {
    const movimientos = [];
    const direcciones = [
      [1, 0], [-1, 0], [0, 1], [0, -1], // Torre
      [1, 1], [-1, -1], [1, -1], [-1, 1] // Alfil
    ];
    const fila = this.fila;
    const columna = this.columna;

    for (const [df, dc] of direcciones) {
      let f = fila + df;
      let c = columna + dc;
      while (f >= 0 && f < 8 && c >= 0 && c < 8) {
        const pieza = tablero[f][c];
        if (pieza === null) {
          movimientos.push({ fila: f, columna: c });
        } else {
          if (pieza.color !== this.color) {
            movimientos.push({ fila: f, columna: c }); // capturar
          }
          break; // no puede saltar piezas
        }

        f += df;
        c += dc;

      }
    }

    return movimientos;

  }

  createFigura() {

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
    this.material = new THREE.MeshStandardMaterial({ map: textura })

    const loader = new OBJLoader();

    const piezas = [
      'cabeza.obj',
      'cuerpo.obj',
      'brazo_izq.obj',
      'brazo_der.obj',
      'pierna_izq.obj',
      'pierna_der.obj'
    ];

    piezas.forEach((nombre) => {
      loader.load(
        `./Piezas_reina/${nombre}`,
        (obj) => {

          obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = this.material;
            }
          });

          //obj.rotateY(Math.PI / 2);

          /*if (this.color === "negro") {
            obj.rotateY(Math.PI);
          }*/

          //obj.position.set(0, 0.2, -2);

          let escalado = 0.6;

          obj.scale.set(escalado, escalado, escalado);

          if (nombre === 'brazo_der.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
              obj.position.set(-0.553781 * escalado, 2.73347 * escalado, -2);
            };
            if (this.color === "blanco") {
              obj.position.set(0.553781 * escalado, 2.73347 * escalado, -2);
            };
            obj.rotateY(Math.PI / 2);

            this.brazoDer = obj
          }

          if (nombre === 'brazo_izq.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
              obj.position.set(0.553781 * escalado, 2.73347 * escalado, -2);
            }
            if (this.color === "blanco") {
              obj.position.set(-0.553781 * escalado, 2.73347 * escalado, -2);
            };
            obj.rotateY(Math.PI / 2);
            obj.rotateZ(Math.PI / 2);
            this.brazoIzq = obj
          }

          if (nombre === 'pierna_der.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
            };
            obj.rotateY(Math.PI / 2);
            obj.position.set(-0.366867 * escalado, 1.44905 * escalado, -2);

            this.piernaDer = obj
          }

          if (nombre === 'pierna_izq.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
            };
            obj.rotateY(Math.PI / 2);
            obj.position.set(0.357668 * escalado, 1.45441 * escalado, -2);

            this.piernaIzq = obj
          }

          if (nombre === 'cabeza.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
            };
            obj.rotateY(Math.PI / 2);
            obj.position.set(0, 3.17551 * escalado, -2);

            this.cabeza = obj
          }

          if (nombre === 'cuerpo.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
            };
            obj.rotateY(Math.PI / 2);
            obj.position.set(0, 1.91479 * escalado, -2);

            this.cuerpo = obj
          }

          this.add(obj);
        }
      );
    });
  }

  //moviemto de la reina

  //moviento angulos brazos
  moverBrazoder(angulo) {
    if (this.brazoDer) {
      this.brazoDer.rotateZ(angulo);
      console.log("brazoDer rotado");
    }
  }
  moverBrazoizq(angulo) {
    if (this.brazoIzq) {
      this.brazoIzq.rotateZ(angulo);
    }
  }
  moverPiernaDer(angulo) {
    if (this.piernaDer) {
      this.piernaDer.rotateZ(angulo);
    }
  }
  moverPiernaIzq(angulo) {
    if (this.piernaIzq) {
      this.piernaIzq.rotateZ(angulo);
    }
  }
  moverCabeza(angulo) {
    if (this.cabeza) {
      this.cabeza.rotateY(angulo);
    }
  }
  moverCuerpo(angulo) {
    if (this.cuerpo) {
      this.cuerpo.rotation.z = angulo;
    }
  }


  metodoAnimacionCaminar(p) {
    const angulo = Math.sin(p * Math.PI * 2) * 0.3; // Oscila entre -0.3 y 0.3
    if (this.piernaDer && this.piernaIzq) {
      this.piernaDer.rotation.z = angulo;
      this.piernaIzq.rotation.z = -angulo;


    }
  }
  metodoAnimacionBrazo(p) {
    if (this.brazoDer) {
      this.brazoDer.rotation.z = -p * Math.PI / 2; // de 0 a -90 grados
    }
  }










  update() {
    // Lógica de actualización futura
  }
}

export { Reina };