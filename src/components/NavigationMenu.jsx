import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/favorites" className="hover:text-gray-400">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
