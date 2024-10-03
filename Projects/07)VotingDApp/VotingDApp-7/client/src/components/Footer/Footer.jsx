import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 w-full bottom-0  mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Brand */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Voting DApp</h3>
          <p className="text-sm mt-2">
            Secure and Transparent Voting Platform
          </p>
        </div>

        {/* Center Section - Navigation Links */}
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-center">
          <li>
            <a href="/" className="hover:text-blue-400 transition duration-300">
              Home
            </a>
          </li>
          <li>
            <a
              href="/register-voter"
              className="hover:text-blue-400 transition duration-300"
            >
              Register Voter
            </a>
          </li>
          <li>
            <a
              href="/register-candidate"
              className="hover:text-blue-400 transition duration-300"
            >
              Register Candidate
            </a>
          </li>
          <li>
            <a
              href="/voter-list"
              className="hover:text-blue-400 transition duration-300"
            >
              Voter List
            </a>
          </li>
          <li>
            <a
              href="/candidate-list"
              className="hover:text-blue-400 transition duration-300"
            >
              Candidate List
            </a>
          </li>
          <li>
            <a
              href="/cast-vote"
              className="hover:text-blue-400 transition duration-300"
            >
              Cast Vote
            </a>
          </li>
          <li>
            <a
              href="/election-commission"
              className="hover:text-blue-400 transition duration-300"
            >
              Election Commission
            </a>
          </li>
          <li>
            <a
              href="/token-marketplace"
              className="hover:text-blue-400 transition duration-300"
            >
              Token Marketplace
            </a>
          </li>
        </ul>

        {/* Right Section - Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition duration-300"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition duration-300"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition duration-300"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition duration-300"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="mt-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Voting DApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
