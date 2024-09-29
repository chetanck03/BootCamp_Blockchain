import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Voting DApp</Link>
        </div>

        {/* Hamburger Menu (Mobile View) */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        {/* Links (Large Screens) */}
        <ul className="hidden lg:flex space-x-8 text-gray-300">
          <li>
            <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/register-voter" className="hover:text-blue-400 transition duration-300">Register Voter</Link>
          </li>
          <li>
            <Link to="/register-candidate" className="hover:text-blue-400 transition duration-300">Register Candidate</Link>
          </li>
          <li>
            <Link to="/voter-list" className="hover:text-blue-400 transition duration-300">Voter List</Link>
          </li>
          <li>
            <Link to="/candidate-list" className="hover:text-blue-400 transition duration-300">Candidate List</Link>
          </li>
          <li>
            <Link to="/election-commission" className="hover:text-blue-400 transition duration-300">Election Commission</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="lg:hidden mt-4 space-y-4 text-gray-300 bg-gray-800 rounded-lg shadow-lg">
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-blue-400 hover:bg-gray-700 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/register-voter" className="block px-4 py-2 hover:text-blue-400 hover:bg-gray-700 transition duration-300">
              Register Voter
            </Link>
          </li>
          <li>
            <Link to="/register-candidate" className="block px-4 py-2 hover:text-blue-400 hover:bg-gray-700 transition duration-300">
              Register Candidate
            </Link>
          </li>
          <li>
            <Link to="/voter-list" className="block px-4 py-2 hover:text-blue-400 hover:bg-gray-700 transition duration-300">
              Voter List
            </Link>
          </li>
          <li>
            <Link to="/candidate-list" className="block px-4 py-2 hover:text-blue-400 hover:bg-gray-700 transition duration-300">
              Candidate List
            </Link>
          </li>
          <li>
            <Link to="/election-commission" className="block px-4 py-2 hover:text-blue-400 hover:bg-gray-700 transition duration-300">
              Election Commission
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
