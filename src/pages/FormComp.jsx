import { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";

const FormComp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    birthDate: "",
    gender: "",
    message: "",
    newsletter: false,
    terms: false,
  });

  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;

    // Get public VAPID key from server
    // const res = await axios.get("http://localhost:5000/api/auth/public-key");
    // const vapidPublicKey = res.data.publicKey;
    const vapidPublicKey =
      "BEOgjRRfkB1nZgHaoc6BjdWGj673e_4BO7YJ1Q0UyEu1KHcholWVOGNRwGnreATk0yuiRGqP7x7BWTk2YwF13Tc";

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    // Send subscription to server to store
    await axios.post("http://localhost:5000/api/auth/subscribe", subscription);
  };

  // Helper to convert VAPID key
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        ...formData,
        birthDate: new Date(formData.birthDate).toISOString(), // 👈 converts to ISO 8601
      };
      const response = await axios.post(
        "http://localhost:5000/api/auth/submit",
        payload
      );
      console.log("Form submitted successfully:", response.data);
      if ("serviceWorker" in navigator && "PushManager" in window) {
        try {
          await subscribeToPush();
          console.log("Push subscription complete");
        } catch (err) {
          console.error("Push subscription failed:", err);
        }
      }

      // Optional: reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        birthDate: "",
        gender: "",
        message: "",
        newsletter: false,
        terms: false,
      });
    } catch (error) {
      console.error(
        "Form submission failed:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl p-8 rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Contact Information
            </h1>
            <p className="text-lg text-slate-600">
              Please fill out all the required information below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-semibold text-slate-700 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full h-12 mt-1 px-4 rounded border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-200 outline-none"
                required
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-12 mt-1 px-4 rounded border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-200 outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full h-12 mt-1 px-4 rounded border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-200 outline-none"
                />
              </div>
            </div>

            {/* Country and Birth Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Country *
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full h-12 mt-1 px-4 rounded border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-200 outline-none"
                  required
                >
                  <option value="">Select your country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                  <option value="jp">Japan</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="birthDate"
                  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Date of Birth
                </label>
                <input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    handleInputChange("birthDate", e.target.value)
                  }
                  className="w-full h-12 mt-1 px-4 rounded border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-200 outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Gender
              </p>
              <div className="flex flex-wrap gap-6">
                {["male", "female", "other", "prefer-not-to-say"].map(
                  (value) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={value}
                        checked={formData.gender === value}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                      />
                      <span className="text-sm capitalize">
                        {value.replace(/-/g, " ")}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="text-sm font-semibold text-slate-700 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us more about yourself or any additional information..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-200 outline-none resize-none"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) =>
                    handleInputChange("newsletter", e.target.checked)
                  }
                />
                <span className="text-sm font-medium">
                  Subscribe to our newsletter for updates and special offers
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.terms}
                  onChange={(e) => handleInputChange("terms", e.target.checked)}
                />
                <span className="text-sm font-medium">
                  I agree to the{" "}
                  <span className="text-slate-600 underline hover:text-slate-800">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-slate-600 underline hover:text-slate-800">
                    Privacy Policy
                  </span>{" "}
                  *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 rounded"
                disabled={!formData.terms}
              >
                Submit Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComp;
