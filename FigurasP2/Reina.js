
import * as THREE from '../libs/three.module.js'; // Importa la librería Three.js
import * as CSG from '../libs/three-bvh-csg.js'; // Importa la librería para operaciones CSG (Constructive Solid Geometry)
import { Pieza } from './Pieza.js'; // Importar clase base

class Reina extends Pieza {
    constructor(color, fila, columna, di) {
        super("Reina", color, fila, columna, di); // Asigna null en lugar de id aquí



        this.createFigura(); // Llama al método para crear la figura

        this.moverA(fila, columna); // Posicionar en el tablero 3D


    }


    createFigura() {

        //********************** BASE DE LA FIGURA ***************************

        // Dibujamos la base principal que será un rectángulo

        var rectangulo_geom = new THREE.BoxGeometry(1, 0.40, 1); // Crea un rectángulo
        // Crea un mesh con el rectángulo y el material
        var rectangulo = new THREE.Mesh(rectangulo_geom, new THREE.MeshStandardMaterial({ color: 0xFF0000 })); // Color




        rectangulo.geometry.translate(0, 0.4, - 2); // Traslada el resultado final IMPORTANTE DEJA ESTO ASI PARA Q CUADRE EN TODAS
        this.add(rectangulo); // Añade el rectángulo a la figura



    }

}
export { Reina }; // Exporta la clase para usarla en otros archivos