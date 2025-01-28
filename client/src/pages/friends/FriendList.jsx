import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/friends/my-friends", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(response.data);
      } catch (err) {
        setError("Failed to fetch friends. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const handleAddFriend = () => navigate("/main/friends/create");

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Friends</h2>
        <button
          onClick={handleAddFriend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
        >
          Add Friend
        </button>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer"
            onClick={() =>
              navigate(`/main/chat/${friend._id}`, {
                state: { friendName: friend.name, friendData: friend }, // Pass friend data here
              })
            }
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">
                  {friend.name[0]}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {friend.name}
                </h3>
                <p className="text-sm text-gray-500">{friend.gender}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Hobbies:</span> {friend.hobbies.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Traits:</span> {friend.personalityTraits.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;