import React, { useState, useEffect } from "react";
import axios from "axios";

// ─── Toast Component ─────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: "bg-emerald-50 border-emerald-400",
      icon: "text-emerald-500",
      text: "text-emerald-800",
      progress: "bg-emerald-500",
    },
    error: {
      bg: "bg-red-50 border-red-400",
      icon: "text-red-500",
      text: "text-red-800",
      progress: "bg-red-500",
    },
  };

  const s = styles[type] || styles.success;

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-slide-in">
      <div
        className={`${s.bg} border-l-4 rounded-lg shadow-2xl px-5 py-4 flex items-start gap-3 min-w-[340px] max-w-[420px]`}
      >
        {/* Icon */}
        <div className={`${s.icon} flex-shrink-0 mt-0.5`}>
          {type === "success" ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className={`${s.text} font-semibold text-sm`}>
            {type === "success" ? "Success!" : "Error"}
          </p>
          <p className={`${s.text} text-sm mt-0.5 opacity-80`}>{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className={`${s.text} opacity-50 hover:opacity-100 transition-opacity flex-shrink-0`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-0 mx-1 h-1 rounded-b-lg overflow-hidden bg-gray-200/50">
        <div className={`${s.progress} h-full animate-progress-bar rounded-b-lg`} />
      </div>
    </div>
  );
};

// ─── Spinner Component ───────────────────────────────────────────
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// ─── Register Component ──────────────────────────────────────────
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("https://cloud-academy-xm9n.vercel.app/send", form);
      showToast("Registration successful! We'll get back to you soon.", "success");
      setForm({
        name: "",
        email: "",
        mobile: "",
        course: "",
        message: "",
      });
    } catch (err) {
      showToast("Something went wrong. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes progress-bar {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-progress-bar {
          animation: progress-bar 4s linear forwards;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Registration Form
          </h2>

          <div>
            <label className="block mb-1 text-gray-600 font-medium text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium text-sm">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium text-sm">Course Interested In</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select a course</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="DevOps">DevOps</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Software Testing">Software Testing</option>
              <option value="Palo Alto Firewall">Palo Alto Firewall</option>
              <option value="Fortinet Firewall">Fortinet Firewall</option>
              <option value="CCNA and CCNP">CCNA and CCNP</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium text-sm">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any message or comment..."
              rows="3"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>Submitting...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
