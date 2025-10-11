import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faGraduationCap,
  faGlobe,
  faBook,
  faBrain,
  faUserFriends,
  faTrophy,
  faStar,
  faShieldAlt,
  faCheckCircle,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import HeaderHero from '@/components/HeaderHero';
import FooterRedesign from '@/components/FooterRedesign';
import aminaAvatar from '@/assets/avatars/amina.jpg';
import josephAvatar from '@/assets/avatars/joseph.jpg';
import graceAvatar from '@/assets/avatars/grace.jpg';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    country: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.country) newErrors.country = 'Please select a country';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Generate username from email
        const username = formData.email.split('@')[0];
        
        // Call register from AuthContext
        await registerUser({
          username,
          email: formData.email,
          password: formData.password,
          password2: formData.confirmPassword,
          role: formData.role as 'student' | 'instructor' | 'partner' | 'admin',
          country: formData.country,
        });
        
        // Show success toast
        toast({
          title: 'Registration successful!',
          description: 'Your account has been created. Please login to continue.',
          variant: 'default',
        });
        
        // Redirect to login page (not automatic login for security)
        navigate('/login', { 
          replace: true,
          state: { message: 'Registration successful! Please login with your credentials.' }
        });
        
      } catch (error: any) {
        // Show error toast
        toast({
          title: 'Registration failed',
          description: error.message || 'Please check your information and try again.',
          variant: 'destructive',
        });
        
        // Parse and set specific field errors
        try {
          const errorMessage = error.message;
          if (errorMessage.includes('email')) {
            setErrors({ email: errorMessage });
          } else if (errorMessage.includes('username')) {
            setErrors({ fullName: errorMessage });
          } else {
            setErrors({ email: errorMessage });
          }
        } catch {
          setErrors({ email: error.message });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const testimonials = [
    {
      id: 1,
      name: 'Amina Hassan',
      role: 'Software Developer',
      avatar: aminaAvatar,
      rating: 5,
      text: 'Elimu Space transformed my career! The courses are practical and the community is amazing.'
    },
    {
      id: 2,
      name: 'John Mwangi',
      role: 'Business Owner',
      avatar: josephAvatar,
      rating: 5,
      text: 'I gained the skills I needed to start my business. Highly recommend!'
    },
    {
      id: 3,
      name: 'Grace Kilimo',
      role: 'Data Analyst',
      avatar: graceAvatar,
      rating: 5,
      text: 'The instructors are world-class. I learned more here than in university!'
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative bg-gradient-to-br from-[#0D3B66] via-[#1e5a8e] to-[#3B82F6] text-white py-20 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join Elimu Space — Unlock Skills for the Future
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Create your account and start your learning journey today.
            </p>
          </motion.div>
        </div>

        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12">
            <motion.path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="#F9FAFB"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
        </div>
      </motion.section>

      {/* Registration Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Inspirational Image */}
              <div className="relative bg-gradient-to-br from-[#F97316] to-[#EA580C] p-12 flex items-center justify-center">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                  }} />
                </div>

                <div className="relative z-10 text-white text-center">
                  <FontAwesomeIcon icon={faGraduationCap} className="w-24 h-24 mb-6 mx-auto" />
                  <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
                  <p className="text-blue-100 mb-6">
                    Join thousands of learners transforming their careers with Elimu Space.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" />
                    <span>Over 10,000+ Active Learners</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Registration Form */}
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-[#111827] mb-2">Create Account</h2>
                <p className="text-[#6B7280] mb-8">Fill in your details to get started</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5"
                      />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-[#E5E7EB]'} rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-[#E5E7EB]'} rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5"
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-[#E5E7EB]'} rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-5 h-5" />
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5"
                      />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#E5E7EB]'} rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                      >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="w-5 h-5" />
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      I am a
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5"
                      />
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.role ? 'border-red-500' : 'border-[#E5E7EB]'} rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all appearance-none bg-white`}
                      >
                        <option value="">Select your role</option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="partner">Partner</option>
                      </select>
                    </div>
                    {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border ${errors.country ? 'border-red-500' : 'border-[#E5E7EB]'} rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all appearance-none bg-white`}
                      >
                        <option value="">Select your country</option>
                        <option value="tanzania">Tanzania</option>
                        <option value="kenya">Kenya</option>
                        <option value="uganda">Uganda</option>
                        <option value="rwanda">Rwanda</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                  </div>

                  {/* Terms Checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-[#F97316] border-[#E5E7EB] rounded focus:ring-[#F97316]"
                      />
                      <span className="text-sm text-[#6B7280]">
                        I agree to the{' '}
                        <Link to="/terms" className="text-[#F97316] hover:underline">
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-[#F97316] hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#F97316] text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-[#EA580C] transition-all duration-300 hover:shadow-xl"
                  >
                    Create Account
                  </motion.button>

                  {/* Sign In Link */}
                  <p className="text-center text-sm text-[#6B7280]">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#F97316] font-semibold hover:underline">
                      Sign in
                    </Link>
                  </p>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E5E7EB]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-[#9CA3AF]">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-all"
                    >
                      <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-medium text-[#111827]">Google</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-all"
                    >
                      <FontAwesomeIcon icon={faApple} className="w-5 h-5 text-[#111827]" />
                      <span className="text-sm font-medium text-[#111827]">Apple</span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Elimu Space Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Why Choose Elimu Space?
            </h2>
            <p className="text-lg text-[#6B7280]">
              Join a community of learners and transform your future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: faBook,
                title: 'Access 100+ Quality Courses',
                description: 'Learn from industry experts with comprehensive curriculum',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: faBrain,
                title: 'Learn Anytime, Anywhere',
                description: 'Flexible learning at your own pace, on any device',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: faUserFriends,
                title: 'Connect with Peers',
                description: 'Join a vibrant community of learners and mentors',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: faTrophy,
                title: 'Earn Certificates',
                description: 'Get recognized credentials for your achievements',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#F9FAFB] to-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E5E7EB]"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                  <FontAwesomeIcon icon={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B7280] text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0D3B66] to-[#1e5a8e] text-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Learners Say
            </h2>
            <p className="text-lg text-blue-100">
              Join thousands of satisfied students who transformed their careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Video Testimonial */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
                <div className="text-center">
                  <FontAwesomeIcon icon={faGraduationCap} className="w-20 h-20 mb-4 opacity-50" />
                  <p className="text-sm opacity-75">Video Testimonial</p>
                </div>
              </div>
            </motion.div>

            {/* Text Testimonial Slider */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm text-blue-200">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex gap-2 justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-12 px-4 bg-[#F3F4F6]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FontAwesomeIcon icon={faShieldAlt} className="w-12 h-12 text-[#10B981]" />
              </motion.div>
              <div>
                <h3 className="font-bold text-[#111827] text-lg">Your Data is Safe & Encrypted</h3>
                <p className="text-sm text-[#6B7280]">We value your privacy and never share your information</p>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-[#F97316] hover:underline font-medium">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#F97316] hover:underline font-medium">
                Terms of Use
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterRedesign />
    </div>
  );
};

export default Register;



