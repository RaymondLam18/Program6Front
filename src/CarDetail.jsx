import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CarDetail() {
    const { carId } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        if (carId) {
            const getCarDetails = async () => {
                try {
                    const response = await fetch(
                        `http://145.24.222.249:8000/cars/${carId}`,
                        {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                            },
                        }
                    );

                    if (response.ok) {
                        const carDetails = await response.json();
                        setCar(carDetails);
                    } else {
                        throw new Error('Failed to fetch car details');
                    }
                } catch (error) {
                    console.error('Error fetching car details:', error);
                }
            };

            getCarDetails();
        }
    }, [carId]);

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className="car-details text-gray-900 flex flex-col items-center">
            <h2 className="font-bold">Car Details</h2>
            <p>Name: {car.name}</p>
            <p>Type: {car.type}</p>
            <p>About: {car.about}</p>
        </div>
    );
}

export default CarDetail;
