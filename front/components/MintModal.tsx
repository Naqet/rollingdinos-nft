import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ethers, wait } from "ethers";
import RollingDinos from "../util/RollingDinos.json";
import toast from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backgroundColor: "#facc15",
    display: "grid",
  },
};

Modal.setAppElement("#__next");

const MintModal = ({ isModalOpen, setIsModalOpen }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [mintContract, setMintContract] = useState<any>();
  const [user, setUser] = useState<any>();

  const handleError = (error: string) => {
    toast.error(error, {
      style: {
        backgroundColor: "#4338CA",
        borderRadius: "25px",
        color: "#FBBF24",
      },
      iconTheme: {
        secondary: "#4338CA",
        primary: "#FBBF24",
      },
    });
  };

  const handleSuccess = (info: string) => {
    toast.success(info, {
      duration: 5000,
      style: {
        backgroundColor: "#4338CA",
        borderRadius: "25px",
        color: "#FBBF24",
      },
      iconTheme: {
        secondary: "#4338CA",
        primary: "#FBBF24",
      },
    });
  };
  const checkIfAccountConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    try {
      const address = await signer.getAddress();
      if (!user) {
        setUser(signer);
      }

      return !!address;
    } catch (err) {
      return false;
    }
  };

  const connectAccount = async () => {
    if (window?.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUser(accounts?.[0]);
    }
  };

  const mintDino = async (quantity: number) => {
    const connected = await checkIfAccountConnected();

    if (connected) {
      try {
        const result = await mintContract.mint(quantity, {
          value: ethers.utils.parseEther((quantity * 0.0069).toString()),
        });

        toast.loading("Processing transaction", {
          style: {
            backgroundColor: "#4338CA",
            borderRadius: "25px",
            color: "#FBBF24",
          },
          iconTheme: {
            secondary: "#4338CA",
            primary: "#FBBF24",
          },
        });

        await result.wait();

        toast.dismiss();

        handleSuccess("Dinos are rolling your way. Check your wallet");
      } catch (err) {
        handleError(
          err?.error?.message
            ? err.error.message
            : "Error while processing transaction"
        );
      }
    } else {
      handleError("Please connect your wallet");
    }
  };

  useEffect(() => {
    if (window?.ethereum && user) {
      const contractAddress = process.env.NEXT_PUBLIC_MINT_ADDRESS;
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // get the end user
      const signer = provider.getSigner();

      // get the smart contract
      const contract = new ethers.Contract(
        contractAddress,
        RollingDinos.abi,
        signer
      );

      setMintContract(contract);
    }
  }, [user]);

  useEffect(() => {
    checkIfAccountConnected();
  }, []);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={customStyles}
    >
      {user ? null : (
        <button className="purple-button mx-auto mb-4" onClick={connectAccount}>
          CONNECT
        </button>
      )}
      <div>
        <p className="font-bangers text-3xl text-indigo-700 text-center">
          QUANTITY
        </p>
        <div className="flex flex-row gap-4 max-w-[230px] flex-wrap justify-center">
          <button
            type="button"
            onClick={() => setQuantity(1)}
            className={`quantity-button ${
              quantity === 1 ? "!bg-opacity-100" : ""
            }`}
          >
            1
          </button>
          <button
            type="button"
            className={`quantity-button ${
              quantity === 2 ? "!bg-opacity-100" : ""
            }`}
            onClick={() => setQuantity(2)}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setQuantity(3)}
            className={`quantity-button ${
              quantity === 3 ? "!bg-opacity-100" : ""
            }`}
          >
            3
          </button>
          <button
            type="button"
            onClick={() => setQuantity(4)}
            className={`quantity-button ${
              quantity === 4 ? "!bg-opacity-100" : ""
            }`}
          >
            4
          </button>
          <button
            type="button"
            onClick={() => setQuantity(5)}
            className={`quantity-button ${
              quantity === 5 ? "!bg-opacity-100" : ""
            }`}
          >
            5
          </button>
        </div>
      </div>

      <p className="font-bangers text-3xl text-indigo-700 text-center mt-4">
        PRICE
      </p>
      <p className="font-bangers text-3xl text-indigo-700 text-center">
        {(quantity * 0.0069).toFixed(4)} ETH
      </p>

      <button
        type="button"
        className={`purple-button mt-4 mx-auto ${
          !!user ? "" : "!bg-opacity-60"
        }`}
        onClick={() => mintDino(quantity)}
      >
        MINT
      </button>
    </Modal>
  );
};

export default MintModal;
