import { ConeGeometry, Mesh, MeshBasicMaterial } from "three";

export type Player = {
    mesh: Mesh,
    velocity: number,
    acceleration: number,
    turnSpeed: number,
}

export type PlayerCommands = {
    type: 'turn',
    direction: 'left' | 'right',
} | {
    type: 'acc',
} | {
    type: 'shoot',
}

export const applyPlayerCommand = (player: Player , cmd: PlayerCommands) => {
    switch (cmd.type) {
        case 'turn':
            const turn_by = cmd.direction === 'left' ? player.turnSpeed : (player.turnSpeed * -1);
            player.mesh.rotateZ(turn_by);
            break;
        case 'acc':
            player.velocity += player.acceleration
        default:
            break;
    }
}

export const playerOnFrame = (player: Player) => {
    const position = player.mesh.position;

    player.mesh.translateY(player.velocity);
}

export const createPlayer = (): Player => {
    const radius =  4.5;  
    const height = 10.0;  
    const radialSegments =  7;  
    const geometry = new ConeGeometry( radius, height, radialSegments );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cone = new Mesh( geometry, material );
    cone.position.set(0,0,0);

    return {
        mesh: cone,
        velocity: 0,
        turnSpeed: 0.06,
        acceleration: 0.03
    };

}