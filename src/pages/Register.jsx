import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaHeartbeat,
} from "react-icons/fa";

function Register() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "patient", // patient or doctor
    specialization: "",
    degree: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    // Doctor-specific validations
    if (formData.userType === "doctor") {
      if (!formData.specialization)
        newErrors.specialization = "Specialization is required";
      if (!formData.degree) newErrors.degree = "Degree is required";
      if (!formData.address) newErrors.address = "Address is required";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      dispatch(registerUser(formData));
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <FaHeartbeat className="text-primary text-3xl" />
            <h1 className="text-2xl font-bold text-gray-900">MediConnect</h1>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of users managing their healthcare
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="patient"
                  checked={formData.userType === "patient"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Patient</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="doctor"
                  checked={formData.userType === "doctor"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Doctor</span>
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName}</p>
            )}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
          )}

          {/* Doctor-specific Fields */}
          {formData.userType === "doctor" && (
            <div className="space-y-4">
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full"
              />
              {errors.specialization && (
                <p className="text-red-600 text-sm">{errors.specialization}</p>
              )}
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={formData.degree}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full"
              />
              {errors.degree && (
                <p className="text-red-600 text-sm">{errors.degree}</p>
              )}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full"
              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address}</p>
              )}
            </div>
          )}

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              I agree to the Terms & Privacy
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Redux Feedback */}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {isAuthenticated && (
            <p className="text-green-600 text-sm mt-2">
              Welcome {user?.firstName || "User"} 🎉
            </p>
          )}

          {/* Already have account */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
