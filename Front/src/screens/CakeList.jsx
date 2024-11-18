import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Componets/Navbar';

const CakeList = () => {
  const [cakes, setCakes] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchid = localStorage.getItem('userid')
    console.log(fetchid);
    

    // Function to fetch cakes for the test user
    const fetchCakes = async () => {
      try {
        const response = await fetch(
          `https://navbaker.onrender.com/api/cakes/storeowner/${fetchid.userid}` // Pass userId in the URL path
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cakes');
        }

        const data = await response.json();
        setCakes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCakes();
  }, [id]); // Add `id` as a dependency to ensure it fetches data when the `id` changes

  // Handle loading and error states
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container-fluid bg-light py-5">
        <div className="container">
        <Navbar />
          <h1 className="text-center mb-5 text-primary">Delicious Cakes</h1>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {cakes.map((cake) => (
              <div className="col" key={cake._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={cake.imageUrl}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '300px' }}
                    alt={cake.url}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{cake.name}</h5>
                    <p className="card-text text-primary fw-bold">{cake.price}</p>
                    <p className="card-text text-primary">{cake.description}</p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    {/* WhatsApp button with SVG */}
                    <a
                      href={`/edit-cake/${cake._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CakeList;
