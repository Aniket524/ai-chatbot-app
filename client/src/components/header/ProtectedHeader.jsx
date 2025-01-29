import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProtectedHeader = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/auth/login');
  };

  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Dashboard</h1>
    <div className="space-x-4">
      <Link to="/main/friends" className="hover:underline">Friends</Link>
      <Link to="/main/friends/create" className="hover:underline">Add Friend</Link>
      <button
        onClick={handleLogout}
        className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-600"
      >
        Logout
      </button>
    </div>
  </div>
  );
};

export default ProtectedHeader;