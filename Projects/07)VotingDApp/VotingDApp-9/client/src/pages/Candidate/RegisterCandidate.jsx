import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
import { uploadCandidateImage } from "../../utils/uploadCandidateImage";
import { FaUpload } from "react-icons/fa";
import toast from "react-hot-toast"; // Importing react-hot-toast

const RegisterCandidate = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) {
      navigateTo("/"); // Redirect if no token
    }
  }, [navigateTo, token]);

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const partyRef = useRef(null);
  const ageRef = useRef(null);

  const handleCandidateRegistration = async (e) => {
    e.preventDefault();
    try {
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;
      const party = partyRef.current.value;

      if (!contractInstance) {
        throw new Error("Contract instance not found!");
      }

      const genderEnum = mapGenderToEnum(gender);

      const imageUploadStatus = await uploadCandidateImage(file);
      if (imageUploadStatus === true) {
        await contractInstance.registerCandidate(name, party, age, genderEnum);
        nameRef.current.value = "";
        ageRef.current.value = "";
        genderRef.current.value = "";
        partyRef.current.value = "";
        toast.success("Registration Successful!"); // Success toast
        setFile(null);
        setFilePreview(null);
      } else {
        throw new Error("Candidate Registration Failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed!"); // Error toast
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "image/png") {
      toast.error("Only PNG images are allowed!"); // Toast for invalid file type
      setFile(null); // Clear file state
      setFilePreview(null);
    } else {
      setFile(file);
      setFilePreview(URL.createObjectURL(file)); // Preview image
    }
  };

  // Function to map gender input to enum values
  const mapGenderToEnum = (gender) => {
    switch (gender) {
      case "Male":
        return 1; // Male enum value
      case "Female":
        return 2; // Female enum value
      case "Other":
        return 3; // Other enum value
      default:
        return 0; // NotSpecified
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">Register Candidate</h1>

        <form onSubmit={handleCandidateRegistration} className="space-y-6">
          {/* Candidate Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Candidate Name</label>
            <input
              type="text"
              ref={nameRef}
              className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Candidate Age */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Candidate Age</label>
            <input
              type="number"
              ref={ageRef}
              className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Gender</label>
            <select
              ref={genderRef}
              className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Candidate Party */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Candidate Party</label>
            <input
              type="text"
              ref={partyRef}
              className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Upload Image (PNG only)</label>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/png"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="flex items-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md">
                <FaUpload className="mr-2" /> Upload
              </label>
            </div>

            {/* Display Image Preview */}
            {filePreview && (
              <div className="mt-4">
                <img src={filePreview} alt="Preview" className="h-32 w-32 object-cover rounded-md border" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
            >
              Register Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCandidate;
