import React, { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // for modal
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "" });

  // Simulated fetch (replace with API call later)
  useEffect(() => {
    const demoUsers = [
      {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 9876543210",
        role: "Patient",
        status: "Active",
      },
      {
        id: 2,
        name: "Priya Patel",
        email: "priya.patel@example.com",
        phone: "+91 9123456789",
        role: "Doctor",
        status: "Inactive",
      },
      {
        id: 3,
        name: "Amit Verma",
        email: "amit.verma@example.com",
        phone: "+91 9988776655",
        role: "Admin",
        status: "Active",
      },
    ];
    setUsers(demoUsers);
  }, []);

  // Toggle Active/Inactive
  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    );
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Open edit modal
  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role });
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save edits
  const saveEdit = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? { ...u, ...formData } : u
      )
    );
    setEditingUser(null); // close modal
  };

  return (
    <div className="p-4 md:p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center md:text-left">
        Manage Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <>
          {/* Table for Desktop */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Role</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="text-center hover:bg-gray-50">
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td
                      className={`border px-4 py-2 font-semibold ${
                        user.status === "Active" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {user.status}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => startEdit(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for Mobile */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <p><span className="font-semibold">ID:</span> {user.id}</p>
                <p><span className="font-semibold">Name:</span> {user.name}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Phone:</span> {user.phone}</p>
                <p><span className="font-semibold">Role:</span> {user.role}</p>
                <p className={`font-semibold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  Status: {user.status}
                </p>
                <div className="mt-2 space-y-2">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className="w-full bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => startEdit(user)}
                    className="w-full bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              className="w-full border p-2 mb-2 rounded"
            />

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
