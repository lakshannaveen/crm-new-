import React, { useState } from "react";
import {
  FiStar,
  FiSmile,
  FiFrown,
  FiMeh,
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiUpload,
  FiThumbsUp,
  FiThumbsDown,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

const FeedbackForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    rating: 0,
    experience: "",
    categories: [],
    comments: "",
    suggestions: "",
    contact: {
      name: "",
      email: "",
      phone: "",
    },
    attachments: [],
    followUp: false,
  });

  const steps = [
    { id: 0, title: "Overall Rating", icon: FiStar },
    { id: 1, title: "Experience", icon: FiSmile },
    { id: 2, title: "Categories", icon: FiCheck },
    { id: 3, title: "Comments", icon: FiThumbsUp },
    { id: 4, title: "Contact Info", icon: FiArrowRight },
    { id: 5, title: "Review", icon: FiCheck },
  ];

  const ratingOptions = [
    { value: 1, label: "Very Poor", icon: FiFrown, color: "text-red-500" },
    { value: 2, label: "Poor", icon: FiFrown, color: "text-orange-500" },
    { value: 3, label: "Average", icon: FiMeh, color: "text-yellow-500" },
    { value: 4, label: "Good", icon: FiSmile, color: "text-blue-500" },
    { value: 5, label: "Excellent", icon: FiStar, color: "text-green-500" },
  ];

  const experienceOptions = [
    {
      id: "easy",
      label: "Easy to Use",
      description: "The system was intuitive and user-friendly",
    },
    {
      id: "responsive",
      label: "Fast & Responsive",
      description: "Pages loaded quickly and navigation was smooth",
    },
    {
      id: "features",
      label: "Useful Features",
      description: "All necessary features were available",
    },
    {
      id: "reliable",
      label: "Reliable",
      description: "System was stable with no crashes or errors",
    },
    {
      id: "support",
      label: "Good Support",
      description: "Help and support were readily available",
    },
  ];

  const categoryOptions = [
    {
      id: "ui",
      label: "User Interface",
      description: "Design, layout, and visual appeal",
    },
    {
      id: "ux",
      label: "User Experience",
      description: "Ease of use and navigation flow",
    },
    {
      id: "performance",
      label: "Performance",
      description: "Speed and responsiveness",
    },
    {
      id: "features",
      label: "Features",
      description: "Available functionality",
    },
    {
      id: "support",
      label: "Support",
      description: "Help and customer service",
    },
    {
      id: "mobile",
      label: "Mobile Experience",
      description: "Experience on mobile devices",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => {
      const categories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories };
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [
        ...prev.attachments,
        ...files.slice(0, 5 - prev.attachments.length),
      ],
    }));
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(((currentStep + 1) / (steps.length - 1)) * 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(((currentStep - 1) / (steps.length - 1)) * 100);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Feedback submitted:", formData);

    toast.success("Thank you for your feedback! We appreciate your input.");

    // Reset form
    setCurrentStep(0);
    setProgress(0);
    setFormData({
      rating: 0,
      experience: "",
      categories: [],
      comments: "",
      suggestions: "",
      contact: {
        name: "",
        email: "",
        phone: "",
      },
      attachments: [],
      followUp: false,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Overall Rating
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="w-8 h-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                How would you rate your experience?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select a rating from 1 (Very Poor) to 5 (Excellent)
              </p>
            </div>

            <div className="flex justify-center space-x-2 mb-8">
              {ratingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange("rating", option.value)}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                    formData.rating === option.value
                      ? "bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 scale-105"
                      : "bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300"
                  }`}
                >
                  <option.icon
                    className={`w-10 h-10 mb-2 ${option.color} ${formData.rating === option.value ? "scale-110" : ""}`}
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {option.value}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {formData.rating > 0 && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-center text-blue-700 dark:text-blue-300 font-medium">
                  You selected: {formData.rating}/5 -{" "}
                  {
                    ratingOptions.find((r) => r.value === formData.rating)
                      ?.label
                  }
                </p>
              </div>
            )}
          </div>
        );

      case 1: // Experience
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSmile className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                How was your experience?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select what best describes your experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experienceOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleInputChange("experience", option.id)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 ${
                    formData.experience === option.id
                      ? "bg-green-50 dark:bg-green-900/30 border-2 border-green-500"
                      : "bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        formData.experience === option.id
                          ? "bg-green-100 dark:bg-green-800"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {formData.experience === option.id ? (
                        <FiCheck className="text-green-600 dark:text-green-300" />
                      ) : null}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional experience notes (optional)
              </label>
              <textarea
                placeholder="Tell us more about your experience..."
                className="input-field h-32"
                onChange={(e) =>
                  handleInputChange("experienceNotes", e.target.value)
                }
              />
            </div>
          </div>
        );

      case 2: // Categories
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                What would you like to provide feedback on?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select all categories that apply
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryOptions.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.categories.includes(category.id)
                      ? "bg-purple-50 dark:bg-purple-900/30 border-2 border-purple-500"
                      : "bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category.label}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        formData.categories.includes(category.id)
                          ? "bg-purple-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {formData.categories.includes(category.id) && (
                        <FiCheck className="text-white w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>

            {formData.categories.length > 0 && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="text-center text-purple-700 dark:text-purple-300 font-medium">
                  Selected: {formData.categories.length} categories
                </p>
              </div>
            )}
          </div>
        );

      case 3: // Comments
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiThumbsUp className="w-8 h-8 text-yellow-600 dark:text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Share your thoughts
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your detailed feedback helps us improve
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What did you like most?
                </label>
                <textarea
                  value={formData.comments}
                  onChange={(e) =>
                    handleInputChange("comments", e.target.value)
                  }
                  placeholder="Tell us what you enjoyed about the system..."
                  className="input-field h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Any suggestions for improvement?
                </label>
                <textarea
                  value={formData.suggestions}
                  onChange={(e) =>
                    handleInputChange("suggestions", e.target.value)
                  }
                  placeholder="What can we do better?"
                  className="input-field h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload screenshots or documents (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Drag & drop files here or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    Browse Files
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Max 5 files, up to 10MB each
                  </p>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Selected files ({formData.attachments.length}/5):
                    </p>
                    {formData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4: // Contact Info
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiArrowRight className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Contact Information (Optional)
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your details if you'd like us to follow up
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.contact.name}
                  onChange={(e) =>
                    handleNestedInputChange("contact", "name", e.target.value)
                  }
                  placeholder="Enter your name"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) =>
                    handleNestedInputChange("contact", "email", e.target.value)
                  }
                  placeholder="Enter your email"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    handleNestedInputChange("contact", "phone", e.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="input-field"
                />
              </div>

              <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <input
                  type="checkbox"
                  id="follow-up"
                  checked={formData.followUp}
                  onChange={(e) =>
                    handleInputChange("followUp", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="follow-up"
                  className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  Yes, I'd like to be contacted for follow-up
                </label>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your contact information will only be used to respond to your
                  feedback. We respect your privacy and will not share your
                  information.
                </p>
              </div>
            </div>
          </div>
        );

      case 5: // Review
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Review Your Feedback
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please review your feedback before submitting
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Overall Rating
                </h4>
                <div className="flex items-center">
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < formData.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {formData.rating}/5 -{" "}
                    {
                      ratingOptions.find((r) => r.value === formData.rating)
                        ?.label
                    }
                  </span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Experience
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {experienceOptions.find((e) => e.id === formData.experience)
                    ?.label || "Not specified"}
                </p>
              </div>

              {formData.categories.length > 0 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.categories.map((categoryId) => (
                      <span
                        key={categoryId}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                      >
                        {
                          categoryOptions.find((c) => c.id === categoryId)
                            ?.label
                        }
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {formData.comments && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    What you liked
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formData.comments}
                  </p>
                </div>
              )}

              {formData.suggestions && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Suggestions
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formData.suggestions}
                  </p>
                </div>
              )}

              {(formData.contact.name ||
                formData.contact.email ||
                formData.contact.phone) && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Contact Information
                  </h4>
                  {formData.contact.name && (
                    <p className="text-gray-700 dark:text-gray-300">
                      Name: {formData.contact.name}
                    </p>
                  )}
                  {formData.contact.email && (
                    <p className="text-gray-700 dark:text-gray-300">
                      Email: {formData.contact.email}
                    </p>
                  )}
                  {formData.contact.phone && (
                    <p className="text-gray-700 dark:text-gray-300">
                      Phone: {formData.contact.phone}
                    </p>
                  )}
                  {formData.followUp && (
                    <p className="text-green-600 dark:text-green-400 mt-2">
                      ✓ Follow-up requested
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-green-700 dark:text-green-300 text-center">
                Your feedback is valuable to us and will help improve the system
                for all users.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Feedback Form
          </h2>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  } ${currentStep === index ? "ring-4 ring-blue-200 dark:ring-blue-800 scale-110" : ""}`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    currentStep >= index
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > index
                      ? "bg-blue-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right mt-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round(progress)}% complete
          </span>
        </div>
      </div>

      {/* Form Card */}
      <div className="card mb-6">
        <div className="min-h-[400px]">{renderStep()}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center px-6 py-3 rounded-lg transition-all ${
            currentStep === 0
              ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <FiArrowLeft className="mr-2" />
          Previous
        </button>

        <div className="flex items-center space-x-3">
          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="btn-primary flex items-center px-6 py-3"
            >
              Next Step
              <FiArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary flex items-center px-6 py-3 bg-green-600 hover:bg-green-700"
            >
              <FiCheck className="mr-2" />
              Submit Feedback
            </button>
          )}
        </div>
      </div>

      {/* Form Status */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Feedback Status
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep === 0
                ? "Starting feedback process..."
                : currentStep === steps.length - 1
                  ? "Ready to submit!"
                  : "Please continue to the next step"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(progress)}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
