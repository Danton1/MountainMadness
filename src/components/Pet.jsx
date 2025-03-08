import { useState, useEffect } from "react";

const Pet = ({hunger, happiness, sanity}) => {
    const [hungerValue, setHunger] = useState(hunger);
    const [happinessValue, setHappiness] = useState(happiness);
    const [sanityValue, setSanity] = useState(sanity);

    useEffect(() => {
        setHunger(hunger);
        setHappiness(happiness);
        setSanity(sanity);
        }, [hunger, happiness, sanity]);

    if (hungerValue <= 0 || happinessValue <= 0 || sanityValue >= 100) {
      return (
        <div className="text-center text-2xl text-white bg-red-500 p-4">
          Your pet has died!
        </div>
      );
    }
  };

export default Pet;