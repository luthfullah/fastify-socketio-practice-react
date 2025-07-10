"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Star,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Check,
  Mail,
  Lock,
  User,
  LogOut,
} from "lucide-react";
// import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  const { isAuthenticated, user, login, register, logout } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      if (authMode === "signup") {
        await register(email, password);
        navigate("/home");
      }
      await login(email, password);
      setIsAuthModalOpen(false);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.error || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                TechFlow
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {token ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={handleSignOut}
                    onClick={logout}
                    className="flex items-center space-x-1 bg-transparent"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthMode("signin");
                      setIsAuthModalOpen(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthMode("signup");
                      setIsAuthModalOpen(true);
                    }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Features
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </a>
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setAuthMode("signin");
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        setAuthMode("signup");
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            🚀 New: AI-Powered Analytics Dashboard
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Amazing
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Digital Experiences
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your ideas into powerful web applications with our
            cutting-edge platform. Fast, secure, and scalable solutions for
            modern businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                setAuthMode("signup");
                setIsAuthModalOpen(true);
              }}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Development
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build, deploy, and scale your applications
              with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Optimized performance with edge computing and global CDN
                  distribution.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-level security with end-to-end encryption and compliance
                  certifications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Real-time collaboration tools with version control and project
                  management.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
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
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-blue-100">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-blue-100">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50M+</div>
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

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Developers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "TechFlow has revolutionized our development process. The
                  platform is intuitive, powerful, and the support team is
                  incredible."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">CTO, StartupCo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The scalability and performance improvements we've seen are
                  remarkable. Our applications have never been faster."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Mike Chen</div>
                    <div className="text-sm text-gray-500">
                      Lead Developer, TechCorp
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "From deployment to monitoring, everything just works
                  seamlessly. It's exactly what we needed for our growing team."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-gray-500">
                      Product Manager, InnovateLab
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Development Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are already building the future
            with TechFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => {
                setAuthMode("signup");
                setIsAuthModalOpen(true);
              }}
            >
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">TechFlow</span>
              </div>
              <p className="text-gray-400">
                Building the future of web development, one application at a
                time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {authMode === "signin" ? "Sign In" : "Create Account"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>
                {authMode === "signin"
                  ? "Welcome back! Please sign in to your account."
                  : "Join thousands of developers building with TechFlow."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === "signup" && (
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {authMode === "signin" ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  // onClick={toggleAuthMode}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {authMode === "signin"
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
