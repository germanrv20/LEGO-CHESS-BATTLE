
import * as THREE from '../libs/three.module.js'; // Importa la librería Three.js
import * as CSG from '../libs/three-bvh-csg.js'; // Importa la librería para operaciones CSG (Constructive Solid Geometry)
import { Pieza } from './Pieza.js'; // Importar clase base

class Caballo extends Pieza {

    constructor(color, fila, columna, di) {

        super("caballo", color, fila, columna, di); // Asigna null en lugar de id aquí
        this.createFigura(); // Llama al método para crear la figura
        this.moverA(fila, columna); // Posicionar en el tablero 3D

    }


    createFigura() {

        //********************** BASE DE LA FIGURA ***************************

        // Dibujamos la base principal que será un rectángulo

        // Material para los objetos 3D
        let colorpieza;

        if (this.color === "negro") {
            colorpieza = 0x5c5c5c; // Negro
        } else {
            colorpieza = 0xffffff; // Blanco por defecto
        }
        const material = new THREE.MeshStandardMaterial({ color: colorpieza });


        var base = new THREE.BoxGeometry(1, 0.40, 1); // Crea un rectángulo

        var rectangulo_s2 = new THREE.BoxGeometry(0.8, 0.2, 0.8); // Crea un segundo rectángulo
        rectangulo_s2.translate(0, 0.2, 0); // Traslada el segundo rectángulo

        var rectangulo_s3 = new THREE.BoxGeometry(0.6, 0.15, 0.6); // Crea un tercer rectángulo
        rectangulo_s3.translate(0, 0.35, 0); // Traslada el tercer rectángulo

        const shape = new THREE.Shape();
        shape.lineTo(-1, 0);
        shape.lineTo(-1, 1);
        shape.lineTo(-2, 2);
        shape.lineTo(-2, 3);
        shape.lineTo(-1, 5);
        shape.lineTo(-1, 7);
        shape.lineTo(-2, 7);
        shape.lineTo(-2, 6.5);
        shape.lineTo(-2.5, 6.5);
        shape.lineTo(-2.5, 7);
        shape.lineTo(-3, 7);
        shape.lineTo(-3, 8);
        shape.lineTo(-2.5, 8);
        shape.lineTo(-2.5, 8.5);
        shape.lineTo(-1, 9.5);
        shape.lineTo(-0.5, 10.5);
        shape.lineTo(0, 10.5);
        shape.lineTo(1, 10.5);
        shape.lineTo(1, 4);
        shape.lineTo(2, 3);
        shape.lineTo(2, 2);
        shape.lineTo(1, 1);
        shape.lineTo(1, 0);
        shape.lineTo(0, 0);

        // realiza la extrusion del shape
        // ...existing code...

        // Realiza la extrusión del shape
        const extrudeSettings = {
            steps: 4, // Número de segmentos a lo largo de la profundidad
            depth: 3, // Profundidad de la extrusión
            bevelEnabled: false // Desactiva el biselado
        };

        const extrudedGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        extrudedGeometry.scale(0.15,0.15,0.15);
        if(this.color == "blanco"){
            extrudedGeometry.rotateY(-Math.PI/2);
            extrudedGeometry.translate(0.25 ,0.4 ,0);

        }else{
            extrudedGeometry.rotateY(Math.PI/2);
            extrudedGeometry.translate(-0.25 ,0.4 ,0);
        }
        

        
        //const extrudedMesh = new THREE.Mesh(extrudedGeometry, material);

        // Ajusta la posición de la geometría extruida si es necesario
        //extrudedMesh.geometry.translate(0, 0.5, 0); // Ajusta la altura de la extrusión

        //Haz como la crin del caballo con  un barrido
        // Define el perfil de la crin del caballo
        const crinShape = new THREE.Shape();
        
            crinShape.lineTo(-1, 0);
            crinShape.lineTo(-1,1);
            crinShape.lineTo(1,0);
            crinShape.lineTo(0, 0);

    

        // Define el camino para el barrido
        const path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(1, 10.5, 0),
            new THREE.Vector3(1, 4, 0),
            new THREE.Vector3(2, 3, 0),
            new THREE.Vector3(2, 4, 0)
          ]);

      

       

        // Configuración del barrido
        const crinExtrudeSettings = {
            steps: 50, // Número de segmentos a lo largo del camino
            bevelEnabled: false, // Sin biselado
            extrudePath: path // Camino para el barrido
        };

        // Geometría de la crin
        const crinGeometry = new THREE.ExtrudeGeometry(crinShape, crinExtrudeSettings);
      
        crinGeometry.rotateX(Math.PI );
        if(this.color == "blanco"){
            crinGeometry.rotateY(Math.PI/2);
            crinGeometry.scale(0.15, 0.15, 0.15);
            crinGeometry.translate(0, 2.4, 0.45);
        }else{
            crinGeometry.rotateY(-Math.PI/2);
            crinGeometry.scale(0.15, 0.15, 0.15);
            crinGeometry.translate(0, 2.4,- 0.45);
        }
        
       

    
       

        //objetos Brush
        const rectanguloBrush = new CSG.Brush(base);
        const rectangulo2Brush = new CSG.Brush(rectangulo_s2);
        const rectangulo3Brush = new CSG.Brush(rectangulo_s3);
        const caballoBrush = new CSG.Brush(extrudedGeometry)
        const crinBush = new CSG.Brush(crinGeometry);


        // Operación de unión CSG

        const evaluador = new CSG.Evaluator();
        const temp1 = evaluador.evaluate(rectanguloBrush, rectangulo2Brush, CSG.ADDITION);
        const temp2 = evaluador.evaluate(temp1, rectangulo3Brush, CSG.ADDITION);
        const temp3 = evaluador.evaluate(temp2, caballoBrush,CSG.ADDITION);
        const temp4 = evaluador.evaluate(temp3,crinBush,CSG.ADDITION);

        const caballo = new THREE.Mesh(temp4.geometry, material);
        caballo.geometry.translate(0, 0.4, - 2); // Traslada el resultado final IMPORTANTE DEJA ESTO ASI PARA Q CUADRE EN TODAS
        this.add(caballo); // Añade el rectángulo a la figura



    }

}
export { Caballo }; // Exporta la clase para usarla en otros archivos