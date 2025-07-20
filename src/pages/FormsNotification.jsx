import { useEffect, useState } from "react";
import axios from "axios";

export default function FormNotifications() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/forms");
      setForms(response.data);
    } catch (err) {
      console.error("Failed to fetch forms:", err);
    }
  };

  const handleViewForm = async (formId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/view/${formId}`
      );
      console.log("Notification sent:", response.data);

      // Refresh forms to update UI (e.g., mark as viewed)
      fetchForms();
    } catch (err) {
      console.error("Failed to view form:", err);
    }
  };

  return (
    <div className="relative">
      <button className="relative bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View Forms
      </button>

      {forms.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded z-10">
          <ul className="max-h-60 overflow-y-auto">
            {forms.map((form) => (
              <li
                key={form.id}
                onClick={() => handleViewForm(form.id)}
                className={`p-3 border-b cursor-pointer hover:bg-blue-50 ${
                  form.viewed ? "" : "bg-yellow-100"
                }`}
              >
                <div className="font-semibold">Email: {form.email}</div>
                <div className="text-xs text-gray-600">
                  Submitted At: {new Date(form.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
