import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cars from "./Cars.jsx";
import CarModal from "./CarModal.jsx";

function CarList () {
    const [cars, setCars] = useState([]);
    const [setNewCar] = useState({name: "", about: "", type: ""});
    const [editedCar, setEditedCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(5);
    const [isModalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const getCars = async () => {
        try {
            setLoading(true);

            const response = await fetch("http://145.24.222.249:8000/cars", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (response.ok) {
                const carCollection = await response.json();
                setCars(carCollection.items);
            } else {
                throw new Error("Failed to fetch cars");
            }
        } catch (error) {
            console.error("Error fetching cars:", error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const closeModalAndNavigate = () => {
        closeModal();
        navigate("/cars");
    };

    const addCar = async (newCar) => {
        try {
            const response = await fetch("http://145.24.222.249:8000/cars", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCar),
            });

            if (response.ok) {
                await getCars();
                setNewCar({name: "", type: "", about: ""});
            } else {
                throw new Error("Failed to add car");
            }
        } catch (error) {
            console.error("Error adding car:", error);
        }
    };

    const startEditing = (car) => {
        setEditedCar({...car});
    };

    const cancelEditing = () => {
        setEditedCar(null);
    };

    const updateCar = async () => {
        try {
            // Update de staat met de bewerkte auto
            setCars((prevCars) =>
                prevCars.map((car) => (car._id === editedCar._id ? editedCar : car))
            );

            const response = await fetch(`http://145.24.222.249:8000/cars/${editedCar._id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedCar),
            });

            if (response.ok) {
                cancelEditing();
            } else {
                setCars((prevCars) =>
                    prevCars.map((car) => (car._id === editedCar._id ? car : car))
                );
                throw new Error("Failed to save changes");
            }
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    const deleteCar = async (carId) => {
        try {
            const response = await fetch(`http://145.24.222.249:8000/cars/${carId}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (response.ok) {
                await getCars();
            } else {
                throw new Error("Failed to delete car");
            }
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1);
    };

    const filteredCars = cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType === "" || car.type.toLowerCase() === selectedType.toLowerCase())
    );

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    useEffect(() => {
        getCars();
    }, []);

    useEffect(() => {
        if (location.pathname.endsWith("/modal")) {
            openModal();
        }
    }, [location.pathname]);

    return (
        <div className="container w-full md:max-w-3xl mx-auto pt-4 flex flex-col items-center">
            <h1 className="text-gray-900 mb-4">Car Collection</h1>

            <div className="filter-search-container flex justify-center items-center mb-4">
                <div className="mr-4">
                    <select className="mr-2 px-4 py-2 border border-black rounded text-black bg-white"
                            value={selectedType} onChange={handleTypeChange}>
                        <option value="">All Types</option>
                        <option value="Muscle Car">Muscle Car</option>
                        <option value="Semi-Truck">Semi-Truck</option>
                        <option value="Sports Car">Sports Car</option>
                        <option value="Super Car">Super Car</option>
                        <option value="SUV">SUV</option>
                    </select>
                </div>
                <div>
                <input className="mr-2 px-4 py-2 border border-black rounded text-black bg-white"
                           type="text"
                           placeholder="Search by Car Name"
                           value={searchTerm}
                           onChange={handleSearch}
                    />
                </div>
            </div>

            <button className="bg-blue-500 px-4 py-2 rounded">
                <Link to="/cars/modal" className="text-white">
                    Add New Car
                </Link>
            </button>

            <CarModal isOpen={isModalOpen} closeModal={closeModalAndNavigate} addCar={addCar}/>

            {editedCar && (
                <div className="edit-car">
                    <h2>Edit Car</h2>
                    <div className="flex flex-row items-center">
                    <input
                            type="text"
                            placeholder="Name"
                            value={editedCar.name}
                            onChange={(e) => setEditedCar({...editedCar, name: e.target.value})}
                            className="mr-2 px-4 py-2 border border-black rounded text-black bg-white"  // Set styling
                        />
                        <input
                            type="text"
                            placeholder="Type"
                            value={editedCar.type}
                            onChange={(e) => setEditedCar({...editedCar, type: e.target.value})}
                            className="mr-2 px-4 py-2 border border-black rounded text-black bg-white"  // Set styling
                        />
                        <input
                            type="text"
                            placeholder="About"
                            value={editedCar.about}
                            onChange={(e) => setEditedCar({...editedCar, about: e.target.value})}
                            className="mr-2 px-4 py-2 border border-black rounded text-black bg-white"  // Set styling
                        />
                        <button onClick={updateCar} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                        <button onClick={cancelEditing}
                                className="bg-red-500 text-white px-4 py-2 ml-2 rounded">Cancel
                        </button>
                    </div>
                </div>
            )}
            {loading ? (
                <div className="loading-text text-black">Loading...</div>
            ) : (
                <>
                    <Cars
                        cars={currentCars}
                        startEditing={startEditing}
                        deleteCar={deleteCar}
                    />
                    <div className="pagination text-gray-900 mt-5">
                        <button className="bg-white border border-black p-2 m-2" onClick={goToPrevPage}
                                disabled={currentPage === 1}>
                            {"< Prev"}
                        </button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button className="bg-white border border-black p-2 m-2" onClick={goToNextPage}
                                disabled={currentPage === totalPages}>
                            {"Next >"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CarList;