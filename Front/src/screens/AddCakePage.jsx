import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Componets/Navbar';

const AddCakePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to be logged in to add a cake');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`https://navbaker.onrender.com/api/cakes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/menu');
      } else {
        setError(data.message || 'Failed to add cake');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container py-5">
      <Navbar />
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center text-primary mb-4">Add a New Cake</h2>

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Cake Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter cake name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Cake Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="4"
                    placeholder="Enter cake description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="form-control"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Add Cake
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCakePage;
