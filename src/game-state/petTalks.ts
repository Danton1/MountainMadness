import { useState } from "react";
import ColorButton from "../components/colorbutton";
import MovingButton from "../components/movingbutton";
import { SaneCat, CrazyCat25, CrazyCat50, CrazyCat100, CannibalCat, CatLaughs, Door } from "../data/strings.json";

interface PetTalksProps {
    hunger: number;
    happiness: number;
    sanity: number;
}

export default function PetTalks({ hunger, happiness, sanity }: PetTalksProps) {
    const cannibal = () => {
        let random = Math.floor(Math.random() * 7) + 1;
        console.log(CannibalCat[random.toString() as keyof typeof CannibalCat]);
    };

    const knock = () => {
        let random = Math.floor(Math.random() * 7) + 1;
        console.log(Door[random.toString() as keyof typeof CannibalCat]);
    };

    const laugh = () => {
        let random = Math.floor(Math.random() * 7) + 1;
        console.log(CatLaughs[random.toString() as keyof typeof CatLaughs]);
    };

    const saneCat = () => {
        let random = Math.floor(Math.random() * 7) + 1;
        console.log(SaneCat[random.toString() as keyof typeof SaneCat]);
    };

    const insaneCat = (sanity: number) => {
        let random = Math.floor(Math.random() * 7) + 1;
        if (sanity === 25) {
            console.log(CrazyCat25[random.toString() as keyof typeof CrazyCat25]);
        } else if (sanity === 50) {
            console.log(CrazyCat50[random.toString() as keyof typeof CrazyCat50]);
        } else {
            console.log(CrazyCat100[random.toString() as keyof typeof CrazyCat100]);
        }
    };

    const handleCatState = (sanity: number) => {
        let random = Math.floor(Math.random() * 10);
        if (hunger >= 50 && sanity >= 50 && happiness >= 50) {
            cannibal();
        } else if (random >= 7 && sanity >= 50) {
            random = Math.floor(Math.random() * 10);
            if (random >= 5) {
                knock();
            } else {
                laugh();
            }
        } else if (sanity < 25) {
            saneCat();
        } else if (sanity < 50) {
            insaneCat(25);
        } else if (sanity < 75) {
            insaneCat(50);
        } else {
            insaneCat(100);
        }
    };

    handleCatState(sanity);
}
