import { useState, useEffect } from 'react';
export default function CreateUserForm({ user, onUserCreated, onUserUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    email: '',
    category: '',
    courseCompleted: '',
    coursesInProgress: '',
    emailVerified: false,
    firstName: '',
    gender: '',
    goal: '',
    hoursSpentThisWeek: '',
    lastName: '',
    password: '',
    profileUrl: '',
    registerType: '',
    skills: '',
    userId: '',
    createdBy: 'admin_ui', 
  });
  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        emailVerified: user.emailVerified || false, 
      });
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await fetch(`http://localhost:5000/users/${user.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onUserUpdated(); 
    } else {
      await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onUserCreated(); 
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        name="courseCompleted"
        placeholder="Course Completed"
        value={formData.courseCompleted}
        onChange={handleChange}
      />
      <input
        name="coursesInProgress"
        placeholder="Courses In Progress"
        value={formData.coursesInProgress}
        onChange={handleChange}
      />
      <label>
        Email Verified
        <input
          type="checkbox"
          name="emailVerified"
          checked={formData.emailVerified}
          onChange={handleChange}
        />
      </label>
      <input
        name="gender"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
      />
      <input
        name="goal"
        placeholder="Goal"
        value={formData.goal}
        onChange={handleChange}
      />
      <input
        name="hoursSpentThisWeek"
        placeholder="Hours Spent This Week"
        value={formData.hoursSpentThisWeek}
        onChange={handleChange}
      />
      <input
        name="profileUrl"
        placeholder="Profile URL"
        value={formData.profileUrl}
        onChange={handleChange}
      />
      <input
        name="registerType"
        placeholder="Register Type"
        value={formData.registerType}
        onChange={handleChange}
      />
      <input
        name="skills"
        placeholder="Skills"
        value={formData.skills}
        onChange={handleChange}
      />
      <input
        name="userId"
        placeholder="User ID"
        value={formData.userId}
        onChange={handleChange}
        required
      />
      <button type="submit">{user ? 'Save Changes' : 'Create User'}</button>
      {user && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
