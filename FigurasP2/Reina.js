import * as THREE from '../libs/three.module.js';
import { OBJLoader } from '../libs/OBJLoader.js';
import { Pieza } from './Pieza.js';

class Reina extends Pieza {
  
  constructor(color, fila, columna, di) {

    super("Reina", color, fila, columna, di);
    this.createFigura();
    this.moverA(fila, columna);

  }

  createFigura() {

    // Material para los objetos 3D

    let colorpieza;

    if (this.color === "negro") {
      colorpieza = 0x5c5c5c;
    } else {
      colorpieza = 0xffffff;
    }

    this.material = new THREE.MeshStandardMaterial({ color: colorpieza });


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
              obj.rotateY(-Math.PI/2);
              obj.position.set(-0.553781*escalado, 2.73347*escalado, -2);
            };
            if (this.color === "blanco") {
              obj.rotateY(-Math.PI);
              obj.position.set(0.553781*escalado, 2.73347*escalado, -2);
            }
          }

          if (nombre === 'brazo_izq.obj') {
            if (this.color === "negro") {
              obj.rotateY(-Math.PI/2);
              obj.position.set(0.553781*escalado, 2.73347*escalado, -2);
            };
            if (this.color === "blanco") {
              obj.rotateY(Math.PI/2);
              obj.position.set(-0.553781*escalado, 2.73347*escalado, -2);
            }
          }

          if (nombre === 'pierna_der.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
            };
            obj.rotateY(Math.PI/2);
            obj.position.set(-0.366867*escalado, 1.44905*escalado, -2);
          }

          if (nombre === 'pierna_izq.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
            };
            obj.rotateY(Math.PI/2);
            obj.position.set(0.357668*escalado, 1.45441*escalado, -2);
          }

          if (nombre === 'cabeza.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
            };
            obj.rotateY(Math.PI/2);
            obj.position.set(0, 3.17551*escalado, -2);
          }

          if (nombre === 'cuerpo.obj') {
            if (this.color === "negro") {
              obj.rotateY(Math.PI);
            };
            obj.rotateY(Math.PI/2);
            obj.position.set(0, 1.91479*escalado, -2);
          }


          this.add(obj);
        }
      );
    });
  }

  update() {
    // Lógica de actualización futura
  }
}

export { Reina };
