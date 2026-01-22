import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/appContext.jsx';

function User() {
  const { backendURL, userToken, fetchUserData } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get(
      `${backendURL}/api/user/getusers`,
      {
        headers: { token: userToken },
      }
    );
    setUsers(data);
  };


  const toggleAdmin = async (id, isAdmin) => {
    await axios.put(
      `${backendURL}/api/user/update-role/${id}`,
      { isAdmin: !isAdmin },
      { headers: { token: userToken } }
    );

    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, isAdmin: !isAdmin } : u
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen dark:text-gray-200">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        User Management
      </h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Profile</th>
            <th className="p-2">Username</th>
            <th className="p-2">Joined</th>
            <th className="p-2">Admin</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b text-center">
              <td className="p-2">
                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>

              <td className="p-2">{user.username}</td>

              <td className="p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              <td className="p-2">
                <input
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={() =>
                    toggleAdmin(user._id, user.isAdmin)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;