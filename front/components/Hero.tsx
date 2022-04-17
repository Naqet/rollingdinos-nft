import React, { useState } from "react";
import MintModal from "./MintModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <p className="font-bangers text-xl font-bold absolute top-28 left-8 text-white">
        HURRY UP
      </p>
      <section className="text-white w-screen h-screen flex flex-col justify-center z-1">
        <h1 className="font-bangers text-7xl text-center md:text-left md:ml-20 lg:text-9xl">
          ROLLING <span className="text-yellow-400">DINOS</span>
        </h1>

        <div className="grid place-items-center mt-10 lg:mr-auto lg:ml-64">
          <button
            className="yellow-button"
            onClick={() => setIsModalOpen(true)}
          >
            MINT
          </button>
          <p className="text-sm font-roboto text-center mt-2">
            0.07ETH | MAX 2 PER TRANSACTION
          </p>
        </div>
      </section>
      <img
        className="hidden xl:block w-96 h-96 absolute top-1/2 -translate-y-1/2 right-56 rounded-3xl"
        src="/dinos/dino.gif"
        alt="Dino gif"
      />
      <MintModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
