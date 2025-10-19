import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetailPage from "./pages/CourseDetailPage";
import Opportunities from "./pages/Opportunities";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCourse from "./pages/CreateCourse";
import InstructorStudents from "./pages/instructor/Students";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="w-full max-w-full overflow-x-hidden">
            <FloatingActionButtons />
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instructor/courses/create" 
              element={
                <ProtectedRoute>
                  <CreateCourse />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instructor/courses/:id/edit" 
              element={
                <ProtectedRoute>
                  <CreateCourse />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instructor/students" 
              element={
                <ProtectedRoute>
                  <InstructorStudents />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
