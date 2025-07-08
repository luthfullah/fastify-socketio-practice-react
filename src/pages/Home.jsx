export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-slate-800 to-slate-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg">We help you do amazing things faster.</p>
      </section>

      {/* Logo Carousel */}
      <section className="py-10 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Replace with real logos */}
          <img src="/logo1.png" alt="Logo 1" className="h-12" />
          <img src="/logo2.png" alt="Logo 2" className="h-12" />
          <img src="/logo3.png" alt="Logo 3" className="h-12" />
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
