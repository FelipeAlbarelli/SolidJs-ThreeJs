import { ConeGeometry, Mesh, MeshBasicMaterial } from "three";

export const createPlayer = () => {
    const radius =  4.5;  
    const height = 10.0;  
    const radialSegments =  7;  
    const geometry = new ConeGeometry( radius, height, radialSegments );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cone = new Mesh( geometry, material );
    cone.position.set(0,0,0);

    return cone;

}