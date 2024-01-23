import { useEffect, useState } from "react";
import Modal from "react-modal";

function CarModal({ isOpen, closeModal, addCar }) {
    const [newCar, setNewCar] = useState({ name: "", type: "", about: "" });

    useEffect(() => {
        // Voeg logica toe om de modal te openen wanneer isOpen true is
        if (isOpen) {
            openModal();
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        setNewCar({ ...newCar, [e.target.name]: e.target.value });
    };

    const handleAddCar = () => {
        addCar(newCar);
        setNewCar({ name: "", type: "", about: "" });
        closeModal();
    };

    const openModal = () => {
        // Voeg eventueel logica toe die moet worden uitgevoerd wanneer de modal opent
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Add New Car Modal"
            className="w-96 h-96 mx-auto my-24 p-8 bg-white rounded shadow-md flex flex-col"
        >
            <h2 className="text-gray-900 font-bold mb-4 text-center">Add New Car</h2>

            <input
                type="text"
                placeholder="Name"
                name="name"
                value={newCar.name}
                onChange={handleInputChange}
                className="mb-4 px-4 py-2 border border-black rounded text-black bg-white"
            />
            <input
                type="text"
                placeholder="Type"
                name="type"
                value={newCar.type}
                onChange={handleInputChange}
                className="mb-4 px-4 py-2 border border-black rounded text-black bg-white"
            />
            <input
                type="text"
                placeholder="About"
                name="about"
                value={newCar.about}
                onChange={handleInputChange}
                className="mb-4 px-4 py-2 border border-black rounded text-black bg-white"
            />

            {/* Knoppen onderaan */}
            <button
                onClick={handleAddCar}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
            >
                Add Car
            </button>
            <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
            >
                Cancel
            </button>
        </Modal>
    );
}

export default CarModal;
