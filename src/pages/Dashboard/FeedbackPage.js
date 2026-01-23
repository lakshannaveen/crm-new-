import React, { useState } from "react";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import FeedbackForm from "../../components/feedback/FeedbackForm";
import {
  FiMessageSquare,
  FiStar,
  FiUsers,
  FiTrendingUp,
  FiHelpCircle,
} from "react-icons/fi";

const FeedbackPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats] = useState({
    totalResponses: 1274,
    averageRating: 4.3,
    responseRate: "89%",
    improvementRate: "42%",
  });

  const testimonials = [
    {
      quote:
        "The ship tracking feature has revolutionized how we manage our fleet. Excellent system!",
      author: "Captain Raj Singh",
      role: "Fleet Manager",
      rating: 5,
    },
    {
      quote:
        "Real-time project updates keep us informed without constant calls. Very efficient.",
      author: "Maria Chen",
      role: "Operations Director",
      rating: 4,
    },
    {
      quote:
        "The mobile interface is smooth and intuitive. Great for on-the-go management.",
      author: "David Wilson",
      role: "Ship Owner",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1">
          <Header />

          <main className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Share Your Feedback
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Help us improve Colombo Dockyard CRM with your valuable input
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <FiMessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Responses
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalResponses.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <FiStar className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Average Rating
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.averageRating}/5
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FiUsers className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Response Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.responseRate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <FiTrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Improvement Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.improvementRate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="card mb-8">
              <div className="flex items-start">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <FiHelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Why Your Feedback Matters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your feedback directly influences our development roadmap.
                    We carefully analyze every suggestion and rating to
                    continuously improve the Colombo Dockyard CRM system. This
                    multi-step form ensures we capture detailed, actionable
                    insights that help us:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Enhance user experience and interface design
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Add features that users actually need
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Fix bugs and improve system performance
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      Prioritize development resources effectively
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="mb-8">
              <FeedbackForm />
            </div>

            {/* Testimonials */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                What Other Users Say
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-300 font-medium">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h4>

                <div className="space-y-4">
                  {[
                    {
                      question:
                        "How long does it take to complete the feedback form?",
                      answer:
                        "The form takes approximately 5-7 minutes to complete, depending on how detailed you want to be.",
                    },
                    {
                      question: "Will my feedback be anonymous?",
                      answer:
                        "Your feedback is confidential. Personal information is only used if you request follow-up.",
                    },
                    {
                      question: "How is my feedback used?",
                      answer:
                        "Feedback is analyzed by our product team and influences our development priorities and feature roadmap.",
                    },
                    {
                      question: "Can I provide feedback multiple times?",
                      answer:
                        "Yes! You can submit feedback as often as you like, especially after system updates or new feature releases.",
                    },
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <p className="font-medium text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
