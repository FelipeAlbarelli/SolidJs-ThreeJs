import { useKeyDownList } from "@solid-primitives/keyboard";
import { createEffect, createSignal, observable } from "solid-js";
import { PlayerCommands } from "./Player";
import { from, map } from "rxjs";

export type Commands = PlayerCommands;

const keys = useKeyDownList();
const keys$ = from(observable(keys))

const keboardKeyToCommand = (key: string): Commands | null => {
    if (key === 'W') {
        return {
            type: 'acc'
        }
    }
    if (key === 'A') {
        return {
            type: 'turn',
            direction: 'left'
        }
    }
    if (key === 'D') {
        return {
            type: 'turn',
            direction: 'right'
        }
    }

    return null
}

export const commands$ = keys$.pipe(
    map( keys => keys.map(keboardKeyToCommand).filter(cmd => cmd!= null) as Commands[] )
)

commands$.subscribe( keys => {
    console.log(keys)
})



export const init = () => {
    console.log('init')
}