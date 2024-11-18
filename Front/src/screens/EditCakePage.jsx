import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCakePage = () => {
  const [cake, setCake] = useState({
    name: '',
    description: '',
    imageUrl: '',
    price: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get cake ID from the URL
  const navigate = useNavigate();

  // Fetch the cake data when the component mounts
  useEffect(() => {
    console.log(id,"sd");
    
    const fetchCake = async () => {
      try {
        const response = await fetch(`https://navbaker.onrender.com/api/cakes/storeowner/ds`);
        const data = await response.json();
        if (response.ok) {
          setCake(data); // Set the current cake data into state
        } else {
          setError(data.message || 'Cake not found');
        }
      } catch (error) {
        setError('Failed to fetch cake data');
      } finally {
        setLoading(false);
      }
    };

    fetchCake();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCake((prevCake) => ({
      ...prevCake,
      [name]: value,
    }));
  };

  // Handle form submission to update the cake
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to be logged in to edit a cake');
      return;
    }

    const res = await fetch(`https://navbaker.onrender.com/api/cakes/editcakes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cake), // Send updated cake data
    });

    const data = await res.json();

    if (res.ok) {
      navigate('/menu'); // Redirect to the menu page after successful update
    } else {
      setError(data.message || 'Failed to update cake');
    }
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center text-primary mb-4">Edit Cake</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Cake Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={cake.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={cake.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                    value={cake.imageUrl}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={cake.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCakePage;
