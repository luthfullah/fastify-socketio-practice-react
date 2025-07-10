import { useAuth } from "@/context/AuthContext";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { autoConnect: false });

export default function Home() {
  const [userCount, setUserCount] = useState(0);
  const [formCount, setFormCount] = useState(0);

  const token = localStorage.getItem("token");
  const { isAuthenticated } = useAuth();
  console.log("Token in MainLayout:", token);
  console.log("isAuthenticated in MainLayout:", isAuthenticated);
  useEffect(() => {
    setTimeout(() => {
      if (token) {
        socket.connect();
        socket.on("userCount", (count) => {
          console.log("Received userCount:", count);
          setUserCount(count);
        });

        socket.on("formCount", (count) => {
          console.log("Received formCount:", count);
          setFormCount(count);
        });

        // Clean up
        return () => {
          socket.off("userCount");
          socket.off("formCount");
        };
      }
    }, 1000);
  }, [token, isAuthenticated]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-slate-800 to-slate-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg">We help you do amazing things faster.</p>
      </section>

      {/* Logo Carousel */}
      {/* <section className="py-10 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-8">
         
          <img src="/logo1.png" alt="Logo 1" className="h-12" />
          <img src="/logo2.png" alt="Logo 2" className="h-12" />
          <img src="/logo3.png" alt="Logo 3" className="h-12" />
        </div>
      </section> */}
      {/* About Section */}

      {/* <h3>
          {" "}
          User Count: <CountUp end={userCount} duration={1.2} />
        </h3>
        <h3>
          {" "}
          SubmittedForms <CountUp end={formCount} duration={1.2} />
        </h3> */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose TechFlow?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We've helped over 10,000 companies transform their digital
                presence with our innovative platform. From startups to Fortune
                500 companies, our solutions scale with your needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">24/7 expert support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">
                    Advanced analytics & insights
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Seamless integrations</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    <CountUp end={userCount} duration={1.2} />
                  </div>
                  <div className="text-blue-100">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-blue-100">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    <CountUp end={formCount} duration={1.2} />
                  </div>
                  <div className="text-blue-100">Requests/Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-100">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-slate-600 leading-relaxed">
          We are a team of passionate developers helping users build great
          things. Our platform offers a variety of tools and services to
          accelerate your workflow and bring ideas to life.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto bg-slate-100 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
          />
          <textarea
            placeholder="Message"
            className="w-full border p-3 rounded h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
