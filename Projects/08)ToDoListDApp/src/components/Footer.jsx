import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
          <Link to="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              To-Do-List DApp
            </h1>
          </Link>
        </div>

        <div className="text-center md:text-left">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} To-Do-List DApp. All Rights Reserved.
          </p>
          <p className="text-sm flex items-center justify-center  mt-2">
            Made by Chetan Ck <span className="text-red-500 ml-1">❤️</span>
          </p>
        </div>

        <div className="flex flex-row space-y-2  space-x-6  mt-0">
          <a href="#terms" className="text-sm text-purple-300 mt-2 hover:text-purple-500 transition duration-200">
            Terms of Service
          </a>
          <a href="#privacy" className="text-sm text-purple-300 hover:text-purple-500 transition duration-200">
            Privacy Policy
          </a>
          <a href="#contact" className="text-sm text-purple-300 hover:text-purple-500 transition duration-200">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
