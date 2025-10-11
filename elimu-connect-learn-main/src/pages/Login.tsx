import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faShieldAlt,
  faCheckCircle,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import FooterRedesign from '@/components/FooterRedesign';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Call login from AuthContext
        await login(formData.email, formData.password);
        
        // Show success toast
        toast({
          title: 'Login successful!',
          description: 'Welcome back to Elimu Space',
          variant: 'default',
        });
        
        // Get redirect path from location state or default to dashboard
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
        
      } catch (error: any) {
        // Show error toast
        toast({
          title: 'Login failed',
          description: error.message || 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
        
        setErrors({
          email: error.message || 'Invalid credentials'
        });
        
        // Shake animation for errors
        const form = document.getElementById('login-form');
        form?.classList.add('animate-shake');
        setTimeout(() => form?.classList.remove('animate-shake'), 500);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Shake animation for errors
      const form = document.getElementById('login-form');
      form?.classList.add('animate-shake');
      setTimeout(() => form?.classList.remove('animate-shake'), 500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar - Simplified */}
      <nav className="bg-[#F5F5F5] border-b border-[#E5E7EB] py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Elimu Space" 
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[#6B7280] text-sm">Don't have an account?</span>
            <Link 
              to="/register"
              className="px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#EA580C] transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Left Column - Illustration/Visual */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              transition={{ duration: 0.6 }}
              className="hidden md:flex flex-col justify-center"
            >
              <div className="relative">
                {/* Gradient Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/20 to-[#EA580C]/20 rounded-full blur-3xl"></div>
                
                {/* Illustration Content */}
                <div className="relative z-10 text-center p-12">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-8"
                  >
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-3xl flex items-center justify-center shadow-2xl">
                      <FontAwesomeIcon icon={faUser} className="w-24 h-24 text-white" />
                    </div>
                  </motion.div>

                  <h2 className="text-3xl font-bold text-[#111827] mb-4">
                    Welcome Back to Elimu Space!
                  </h2>
                  <p className="text-lg text-[#6B7280] mb-6">
                    Continue your learning journey and unlock new skills today.
                  </p>

                  {/* Trust Indicators */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-lg p-4">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-[#10B981]" />
                      <span className="text-sm text-[#111827] font-medium">10,000+ Active Learners</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-lg p-4">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-[#10B981]" />
                      <span className="text-sm text-[#111827] font-medium">100+ Quality Courses</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-lg p-4">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-[#10B981]" />
                      <span className="text-sm text-[#111827] font-medium">Expert Instructors</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Sign In Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-[#E5E7EB]">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-[#111827] mb-2">Sign In</h1>
                  <p className="text-[#6B7280]">Enter your credentials to access your account</p>
                </div>

                <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5"
                      />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-[#E5E7EB] focus:ring-[#F97316]'
                        } rounded-lg focus:ring-2 focus:border-transparent transition-all`}
                        placeholder="your.email@example.com"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="password" className="block text-sm font-medium text-[#111827] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5"
                      />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-12 py-3 border ${
                          errors.password ? 'border-red-500 focus:ring-red-500' : 'border-[#E5E7EB] focus:ring-[#F97316]'
                        } rounded-lg focus:ring-2 focus:border-transparent transition-all`}
                        placeholder="Enter your password"
                        aria-invalid={errors.password ? 'true' : 'false'}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-5 h-5" />
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        id="password-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Remember Me & Forgot Password */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#F97316] border-[#E5E7EB] rounded focus:ring-[#F97316] transition-all"
                      />
                      <span className="text-sm text-[#6B7280]">Remember me</span>
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-[#F97316] hover:text-[#EA580C] font-medium transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </motion.div>

                  {/* Sign In Button */}
                  <motion.button
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#F97316] text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-[#EA580C] hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>

                  {/* Divider */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E5E7EB]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-[#9CA3AF]">Or continue with</span>
                    </div>
                  </motion.div>

                  {/* Social Login Buttons */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-3 gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleSocialLogin('Google')}
                      className="flex items-center justify-center gap-2 py-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] hover:border-[#D1D5DB] transition-all"
                      aria-label="Sign in with Google"
                    >
                      <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-red-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleSocialLogin('Apple')}
                      className="flex items-center justify-center gap-2 py-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] hover:border-[#D1D5DB] transition-all"
                      aria-label="Sign in with Apple"
                    >
                      <FontAwesomeIcon icon={faApple} className="w-5 h-5 text-[#111827]" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleSocialLogin('GitHub')}
                      className="flex items-center justify-center gap-2 py-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] hover:border-[#D1D5DB] transition-all"
                      aria-label="Sign in with GitHub"
                    >
                      <FontAwesomeIcon icon={faGithub} className="w-5 h-5 text-[#111827]" />
                    </motion.button>
                  </motion.div>

                  {/* Sign Up Link */}
                  <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.8 }}
                    className="text-center text-sm text-[#6B7280]"
                  >
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#F97316] font-semibold hover:text-[#EA580C] transition-colors">
                      Sign Up
                    </Link>
                  </motion.p>

                  {/* Security Indicator */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center gap-2 text-sm text-[#6B7280] pt-4"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4 text-[#10B981]" />
                    </motion.div>
                    <span>Your information is safe and encrypted</span>
                  </motion.div>

                  {/* Privacy Links */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-center gap-4 text-xs text-[#9CA3AF]"
                  >
                    <Link to="/privacy" className="hover:text-[#F97316] transition-colors">
                      Privacy Policy
                    </Link>
                    <span>•</span>
                    <Link to="/terms" className="hover:text-[#F97316] transition-colors">
                      Terms of Use
                    </Link>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterRedesign />

      {/* Shake Animation CSS */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;



