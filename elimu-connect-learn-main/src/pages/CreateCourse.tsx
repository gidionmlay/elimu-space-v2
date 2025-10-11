/**
 * Create Course Page
 * Multi-step wizard for course creation with autosave
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faSave,
  faRocket,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ProgressStepper, { Step } from '@/components/course-creation/ProgressStepper';
import BasicInfoStep from '@/components/course-creation/BasicInfoStep';
import CourseContentStep from '@/components/course-creation/CourseContentStep';
import PricingStep from '@/components/course-creation/PricingStep';
import ResourcesStep from '@/components/course-creation/ResourcesStep';
import ReviewPublishStep from '@/components/course-creation/ReviewPublishStep';
import courseService, { CourseDraft } from '@/services/courseService';
import { useAutosave } from '@/hooks/useAutosave';

const STEPS: Step[] = [
  { id: 1, title: 'Basic Info', description: 'Essential details' },
  { id: 2, title: 'Content', description: 'Modules & lessons' },
  { id: 3, title: 'Pricing', description: 'Price & access' },
  { id: 4, title: 'Resources', description: 'Files & links' },
  { id: 5, title: 'Review', description: 'Final review' },
];

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState<CourseDraft>({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    language: '',
    modules: [],
    price: 0,
    is_free: true,
    is_published: false,
  });
  const [courseId, setCourseId] = useState<number | undefined>(
    id ? Number(id) : undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load existing draft
  useEffect(() => {
    if (courseId) {
      loadCourseDraft(courseId);
    }
  }, [courseId]);

  const loadCourseDraft = async (id: number) => {
    try {
      setIsLoading(true);
      const draft = await courseService.getCourseDraft(id);
      setCourseData(draft);
      toast({
        title: 'Draft Loaded',
        description: 'Your course draft has been loaded',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load course draft',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Autosave function
  const handleAutosave = async (data: CourseDraft) => {
    try {
      setIsSaving(true);

      if (courseId) {
        // Update existing draft
        await courseService.updateCourseDraft(courseId, data);
      } else {
        // Create new draft
        const newCourse = await courseService.createCourseDraft(data);
        setCourseId(newCourse.id);
      }

      setLastSaved(new Date());
      
      // Silent save - no toast to avoid interrupting user
      console.log('Draft autosaved at', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Autosave failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Setup autosave
  useAutosave({
    data: courseData,
    onSave: handleAutosave,
    interval: 30000, // 30 seconds
    enabled: true,
  });

  // Manual save
  const handleManualSave = async () => {
    try {
      setIsSaving(true);
      await handleAutosave(courseData);
      toast({
        title: 'Draft saved',
        description: 'Your course has been saved as draft',
      });
    } catch (error: any) {
      toast({
        title: 'Save failed',
        description: error.message || 'Failed to save draft',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Publish course
  const handlePublish = async () => {
    if (!courseId) {
      toast({
        title: 'Error',
        description: 'Please save the course as draft first',
        variant: 'destructive',
      });
      return;
    }

    // Validation
    if (!courseData.title?.trim()) {
      toast({
        title: 'Missing information',
        description: 'Course title is required',
        variant: 'destructive',
      });
      return;
    }

    if (!courseData.modules || courseData.modules.length === 0) {
      toast({
        title: 'Missing content',
        description: 'Please add at least one module with lessons',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsPublishing(true);
      await courseService.publishCourse(courseId);
      
      toast({
        title: '🎉 Course Published!',
        description: 'Your course is now live and available to students',
      });

      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      toast({
        title: 'Publish failed',
        description: error.message || 'Failed to publish course',
        variant: 'destructive',
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Navigation
  const goToNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Update course data
  const updateCourseData = (stepData: any) => {
    setCourseData({ ...courseData, ...stepData });
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep data={courseData} onChange={updateCourseData} />;
      case 1:
        return <CourseContentStep data={courseData} onChange={updateCourseData} />;
      case 2:
        return <PricingStep data={courseData} onChange={updateCourseData} />;
      case 3:
        return <ResourcesStep data={courseData} onChange={updateCourseData} />;
      case 4:
        return <ReviewPublishStep data={courseData} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="instructor">
        <div className="flex items-center justify-center h-96">
          <FontAwesomeIcon icon={faSpinner} className="w-12 h-12 text-emerald-500 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="instructor">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
              <p className="text-gray-600 mt-1">
                Follow the steps to create and publish your course
              </p>
            </div>
            {lastSaved && (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                {isSaving && <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin text-emerald-500" />}
              </div>
            )}
          </div>
        </div>

        {/* Progress Stepper */}
        <ProgressStepper steps={STEPS} currentStep={currentStep} />

        {/* Step Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-3">
              {/* Manual Save */}
              <button
                onClick={handleManualSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                <FontAwesomeIcon
                  icon={isSaving ? faSpinner : faSave}
                  className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`}
                />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>

              {/* Next/Publish Button */}
              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={goToNextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-all"
                >
                  Next
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon
                    icon={isPublishing ? faSpinner : faRocket}
                    className={`w-4 h-4 ${isPublishing ? 'animate-spin' : ''}`}
                  />
                  {isPublishing ? 'Publishing...' : 'Publish Course'}
                </button>
              )}
            </div>
          </div>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Your progress is automatically saved every 30 seconds
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCourse;

