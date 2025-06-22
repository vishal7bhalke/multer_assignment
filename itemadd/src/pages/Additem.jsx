import React, { useState } from "react";
import axios from "axios";

export default function Additem() {
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData();

    formdata.append("name", form.name.value);
    formdata.append("type", form.type.value);
    formdata.append("description", form.description.value);
    formdata.append("cover", form.cover.files[0]);

    for (let i = 0; i < form.images.files.length; i++) {
      formdata.append("images", form.images.files[i]);
    }

    async function fetchdata() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/additem`, formdata);
        console.log(response.data);
        setSuccess("✅ Item successfully added!");
      } catch (err) {
        alert("Failed to upload item");
      }
    }

    fetchdata();
    form.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Add New Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Item Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <select
            name="type"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option>Shirt</option>
            <option>Pant</option>
            <option>Shoes</option>
            <option>Sports Gear</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>

          <input
            name="cover"
            type="file"
            required
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />

          <input
            name="images"
            type="file"
            multiple
            required
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-600 hover:to-indigo-700 transition"
          >
            Submit
          </button>
        </form>

        {success && <p className="mt-4 text-green-600 font-semibold text-center">{success}</p>}
      </div>
    </div>
  );
}
