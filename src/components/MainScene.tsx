import { from, onMount } from "solid-js";
import { BoxGeometry, Color, ConeGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import "./MainScene.scss";
import { applyPlayerCommand, createPlayer, playerOnFrame } from "../game/Player";
import {commands$, init} from "../game/keyboardCtl"
type Rect = {
    width: number,
    height: number,
}

const sacaledRect = (rect: Rect, scale: number): Rect => ({
    width: rect.width * scale,
    height: rect.height * scale,
}) 

export const MainScene = () => {
    let inputElement!: HTMLDivElement;
    const innerWindow: Rect = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    const scale = 0.8;
    const  dimensions = sacaledRect(innerWindow, scale);
    const scene = new Scene();
    // scene.background = new Color("#ffffff");
    // scene.background = new Color("");
    const camera = new PerspectiveCamera( 75, dimensions.width / dimensions.height, 0.1, 1000 );
    
    const renderer = new WebGLRenderer();
    renderer.setSize( 
        dimensions.width,
        dimensions.height
        // 400,
        // 300
    );
    onMount(() => {
        inputElement!.appendChild( renderer.domElement );
    })
    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    // scene.add( cube );

    const player = createPlayer();

    scene.add(player.mesh);
    camera.position.z = 50;

    const command = from(commands$)

    function animate() {
        const commands = command();

        commands?.forEach( cmd => {
            applyPlayerCommand(player, cmd);
        });

        playerOnFrame(player);

        renderer.render( scene, camera );
    }
    renderer.setAnimationLoop( animate );

    return (
        <div 
            ref={inputElement} 
            class="container"
        >
        </div>
    )
}