import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/item/${id}`);
        setItem(res.data);
      } catch (err) {
        alert("Item not found");
        navigate('/');
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % item.imagePaths.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? item.imagePaths.length - 1 : prev - 1
    );
  };

  if (!item) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
      <p className="mb-2"><strong>Type:</strong> {item.type}</p>
      <p className="mb-4"><strong>Description:</strong> {item.description}</p>

      {/* Image Carousel */}
      <div className="relative w-full h-72 border rounded overflow-hidden mb-4">
        <img
          src={`http://localhost:5050${item.imagePaths[currentImage]}`}
          alt="item"
          className="w-full h-full object-cover"
        />
        <button onClick={handlePrev} className="absolute bg-gray-800 text-white text-2xl  left-2 top-1/2  px-2 py-1 shadow rounded">←</button>
        <button onClick={handleNext} className="absolute right-2 top-1/2 bg-gray-800 text-white text-2xl  px-2 py-1 shadow rounded">→</button>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Enquire</button>
    </div>
  );
};

export default ItemDetails;
