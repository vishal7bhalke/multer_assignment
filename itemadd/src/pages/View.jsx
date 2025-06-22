import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [data, setData] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:5050/getdata");
        setData(res.data);
      } catch (err) {
        alert("Problem fetching data");
      }
    };
    fetchdata();
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">View Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? data.map((item, idx) => (
          <div onClick={()=>{navigate(`/item/${item._id}`)}} key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src={`http://localhost:5050${item.coverPath}`}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <strong className="block text-lg text-gray-800">{item.name}</strong>
            <p className="text-sm text-gray-500 mt-1">{item.type}</p>
          </div>
        )) : (<p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
)}
      </div>
    </div>
  );
};

export default View;
