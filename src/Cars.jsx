import { Link } from 'react-router-dom';

function Cars({ cars, startEditing, deleteCar }) {
    return (
        <div className="car-list flex flex-col items-center">
            <h2 className="text-gray-900 font-bold">Car List</h2>
            <ul>
                {cars.map((car) => (
                    <li key={car._id}>
                        <p className="text-gray-900 flex flex-col items-center m-2">Name: {car.name}</p>

                        <div className="flex justify-center gap-2">
                            <button onClick={() => startEditing(car)}>Edit</button>
                            <button onClick={() => deleteCar(car._id)}>Delete</button>
                            <button><Link className="text-white" to={`/cars/${car._id}`}>Details</Link></button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cars;
