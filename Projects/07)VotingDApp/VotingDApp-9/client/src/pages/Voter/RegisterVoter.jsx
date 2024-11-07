import { useRef, useState, useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import { uploadVoterImage } from "../../utils/uploadVoterImage";
import { FaUpload } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";  // Import toast from react-hot-toast

const RegisterVoter = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState(null);

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);

  const handleVoterRegistration = async (e) => {
    try {
      e.preventDefault();

      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;

      const genderEnum = mapGenderToEnum(gender);
      const imageUploadStatus = await uploadVoterImage(file);

      if (imageUploadStatus === true) {
        await contractInstance.registerVoter(name, age, genderEnum);
        nameRef.current.value = "";
        ageRef.current.value = "";
        genderRef.current.value = "";
        setFile(null);
        setFilePreview(null);

        // Success toast
        toast.success("Voter Registration Successful!");
      } else {
        throw new Error("Candidate Registration Failed!");
      }
    } catch (error) {
      console.error(error);

      // Failure toast
      toast.error("Registration Failed, Please try again!");
    }
  };

  const mapGenderToEnum = (gender) => {
    switch (gender) {
      case "Male":
        return 1;
      case "Female":
        return 2;
      case "Other":
        return 3;
      default:
        return 0;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if the file is in PNG format
    if (file && file.type === "image/png") {
      setFile(file);
      setFilePreview(URL.createObjectURL(file));
    } else {
      // Show error toast if the file is not PNG
      toast.error("Please upload a PNG image!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">Register Voter</h1>

        <form onSubmit={handleVoterRegistration} className="space-y-6">
          {/* Voter Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Voter Name</label>
            <input
              type="text"
              ref={nameRef}
              className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Voter Age */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Voter Age</label>
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

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Upload Image (PNG format)</label>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/png"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
              >
                <FaUpload className="mr-2" /> Upload
              </label>
            </div>

            {/* Display Image Preview */}
            {filePreview && (
              <div className="mt-4">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
            >
              Register Voter
            </button>
          </div>
        </form>
      </div>

      {/* Toast container */}
      <Toaster />
    </div>
  );
};

export default RegisterVoter;
