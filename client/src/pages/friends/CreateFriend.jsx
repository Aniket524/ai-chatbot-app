import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFriend = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Female");
  const [hobbies, setHobbies] = useState("");
  const [personalityTraits, setPersonalityTraits] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5000/api/friends/create",
        {
          name,
          gender,
          hobbies: hobbies.split(",").map((hobby) => hobby.trim()),
          personalityTraits: personalityTraits.split(",").map((trait) => trait.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Friend created successfully!");
      setTimeout(() => navigate("/main/friends"), 1500);
    } catch (err) {
      setError("Failed to create friend. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create a New Friend</h2>
      {error && <div className="bg-red-100 text-red-600 p-4 rounded-md mb-6">{error}</div>}
      {success && <div className="bg-green-100 text-green-600 p-4 rounded-md mb-6">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies</label>
          <input
            type="text"
            placeholder="e.g., Reading, Swimming, Gaming"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Personality Traits</label>
          <input
            type="text"
            placeholder="e.g., Friendly, Creative, Adventurous"
            value={personalityTraits}
            onChange={(e) => setPersonalityTraits(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
        >
          Create Friend
        </button>
      </form>
    </div>
  );
};

export default CreateFriend;