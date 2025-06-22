import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import View from './pages/View';
import Additem from './pages/Additem';
import ItemDetails from './pages/ItemDetails';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 shadow-md">
        <div className="flex justify-center gap-10">
          <Link
            to="/additem"
            className="text-white text-xl font-semibold hover:underline hover:text-yellow-300 transition duration-200"
          >
            <span className="text-red-600 bg-red-300">➕</span> Add Item
          </Link>
          <Link
            to="/"
            className="text-white text-xl font-semibold hover:underline hover:text-yellow-300 transition duration-200"
          >
            📦 View Items
          </Link>
        </div>
      </nav>

      <div className="p-6 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/additem" element={<Additem />} />
          <Route path="/item/:id" element={<ItemDetails/>}> </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
