import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManageUsers from './ManageUsers';
export default function App() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/users');
    const data = await res.json();
    const adminUsers = data.filter((user) => user.createdBy === 'admin_ui');
    setUsers(adminUsers);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Router>
      <div>
        <h2>Admin Login</h2>
        <nav>
          <Link to="/manage-users">
            <button>Manage Users</button>
          </Link>
        </nav>
        <Routes>
          <Route 
            path="/manage-users" 
            element={<ManageUsers users={users} fetchUsers={fetchUsers} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}
