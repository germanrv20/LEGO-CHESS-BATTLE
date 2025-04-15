import * as THREE from '../libs/three.module.js';
import * as CSG from '../libs/three-bvh-csg.js';

class Cabeza extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    // Material tipo LEGO
    const material = new THREE.MeshNormalMaterial();

    // Perfil de la cabeza tipo LEGO (para Lathe)
    const shapeCabeza = new THREE.Shape();
    shapeCabeza.lineTo(-0.25, 0);
    shapeCabeza.quadraticCurveTo(-0.5, 0, -0.5, 0.25);
    shapeCabeza.lineTo(-0.5, 0.75);
    shapeCabeza.quadraticCurveTo(-0.5, 1, -0.25, 1);
    shapeCabeza.lineTo(0, 1);

    // Extraer puntos para revolución
    const points = shapeCabeza.extractPoints(6).shape;
    const lathePoints = points.map(p => new THREE.Vector3(p.x, p.y, 0));

    // Crear geometría por revolución
    const geometry = new THREE.LatheGeometry(lathePoints, 32);
    geometry.translate(3, 3.2, 0); // Elevarla si querés centrar mejor

    // Mesh final
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  update() {
    // Método vacío por ahora
  }
}

export { Cabeza };
