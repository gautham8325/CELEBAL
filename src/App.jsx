import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
} from "lucide-react";

// Mock data for countries and cities
const countriesData = {
  India: [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ],
  USA: [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ],
  UK: [
    "London",
    "Birmingham",
    "Manchester",
    "Liverpool",
    "Leeds",
    "Sheffield",
    "Bristol",
    "Glasgow",
  ],
  Canada: [
    "Toronto",
    "Vancouver",
    "Montreal",
    "Calgary",
    "Ottawa",
    "Edmonton",
    "Winnipeg",
    "Quebec City",
  ],
  Australia: [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "Adelaide",
    "Gold Coast",
    "Canberra",
    "Newcastle",
  ],
};

const countryPhoneCodes = {
  India: "+91",
  USA: "+1",
  UK: "+44",
  Canada: "+1",
  Australia: "+61",
};

const UserRegistrationApp = () => {
  const [currentPage, setCurrentPage] = useState("form"); // 'form' or 'success'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    country: "",
    city: "",
    panNumber: "",
    aadharNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateAadhar = (aadhar) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim().length >= 2 ? "" : "Must be at least 2 characters";
      case "username":
        return validateUsername(value)
          ? ""
          : "Username must be 3-20 characters, alphanumeric and underscores only";
      case "email":
        return validateEmail(value) ? "" : "Please enter a valid email address";
      case "password":
        return validatePassword(value)
          ? ""
          : "Password must be at least 8 characters";
      case "phoneNumber":
        return validatePhone(value)
          ? ""
          : "Please enter a valid 10-digit phone number";
      case "country":
        return value ? "" : "Please select a country";
      case "city":
        return value ? "" : "Please select a city";
      case "panNumber":
        return validatePAN(value)
          ? ""
          : "Please enter a valid PAN number (e.g., ABCDE1234F)";
      case "aadharNumber":
        return validateAadhar(value)
          ? ""
          : "Please enter a valid 12-digit Aadhar number";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for PAN number - convert to uppercase
    const processedValue = name === "panNumber" ? value.toUpperCase() : value;

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
      // Clear city when country changes
      ...(name === "country" && { city: "" }),
    }));

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    const noErrors = Object.values(errors).every((error) => error === "");
    return allFieldsFilled && noErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Check if form is valid
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!hasErrors && allFieldsFilled) {
      setCurrentPage("success");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      country: "",
      city: "",
      panNumber: "",
      aadharNumber: "",
    });
    setErrors({});
    setTouched({});
    setCurrentPage("form");
  };

  if (currentPage === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Registration Successful!
              </h1>
              <p className="text-gray-600">
                Your account has been created successfully. Here are your
                details:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">First Name:</span>{" "}
                      {formData.firstName}
                    </div>
                    <div>
                      <span className="font-medium">Last Name:</span>{" "}
                      {formData.lastName}
                    </div>
                    <div>
                      <span className="font-medium">Username:</span>{" "}
                      {formData.username}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {formData.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>{" "}
                      {countryPhoneCodes[formData.country]}{" "}
                      {formData.phoneNumber}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Location
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Country:</span>{" "}
                      {formData.country}
                    </div>
                    <div>
                      <span className="font-medium">City:</span> {formData.city}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Identity Documents
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">PAN Number:</span>{" "}
                      {formData.panNumber}
                    </div>
                    <div>
                      <span className="font-medium">Aadhar Number:</span>{" "}
                      {formData.aadharNumber.replace(
                        /(\d{4})(\d{4})(\d{4})/,
                        "$1 $2 $3"
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start">
                    <div className="w-5 h-5 text-blue-600 mt-0.5 mr-2">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">
                        What's Next?
                      </h4>
                      <p className="text-blue-700 text-sm mt-1">
                        You will receive a confirmation email shortly. Please
                        verify your email address to complete the registration
                        process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={resetForm}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Register Another User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Create Your Account
            </h1>
            <p className="text-indigo-100 text-center mt-2">
              Fill in your details to get started
            </p>
          </div>
          <div className="p-8 space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.firstName && touched.firstName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.lastName && touched.lastName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.username && touched.username
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Choose a username"
                />
                {errors.username && touched.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
            </div>
            {/* Contact Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Contact Information
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.email && touched.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.password && touched.password
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <select
                      className="h-12 px-3 border border-r-0 rounded-l-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData.country}
                      disabled={!formData.country}
                    >
                      <option value="">
                        {formData.country
                          ? countryPhoneCodes[formData.country]
                          : "+__"}
                      </option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`flex-1 px-4 py-3 border border-l-0 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter 10-digit phone number"
                    maxLength="10"
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            {/* Location Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Location
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.country && touched.country
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a country</option>
                    {Object.keys(countriesData).map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.country && touched.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={!formData.country}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      !formData.country ? "bg-gray-100 cursor-not-allowed" : ""
                    } ${
                      errors.city && touched.city
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a city</option>
                    {formData.country &&
                      countriesData[formData.country]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                  {errors.city && touched.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Identity Documents Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Identity Documents
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.panNumber && touched.panNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="ABCDE1234F"
                    maxLength="10"
                    style={{ textTransform: "uppercase" }}
                  />
                  {errors.panNumber && touched.panNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.panNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number *
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                      errors.aadharNumber && touched.aadharNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="123456789012"
                    maxLength="12"
                  />
                  {errors.aadharNumber && touched.aadharNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.aadharNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-6">
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isFormValid()
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isFormValid()
                  ? "Create Account"
                  : "Please fill all required fields correctly"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserRegistrationApp;