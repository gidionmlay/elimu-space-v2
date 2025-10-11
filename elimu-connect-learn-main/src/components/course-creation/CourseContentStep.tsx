/**
 * Step 2: Course Content
 * Dynamic modules and lessons builder with drag & drop
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrash,
  faGripVertical,
  faChevronDown,
  faChevronUp,
  faVideo,
  faFileAlt,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CourseModule, CourseLesson } from '@/services/courseService';

interface CourseContentStepProps {
  data: {
    modules: CourseModule[];
  };
  onChange: (data: any) => void;
}

const CourseContentStep: React.FC<CourseContentStepProps> = ({ data, onChange }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const addModule = () => {
    const newModule: CourseModule = {
      id: `module-${Date.now()}`,
      title: '',
      order: data.modules.length,
      lessons: [],
    };
    onChange({ modules: [...data.modules, newModule] });
  };

  const updateModule = (moduleId: string, updates: Partial<CourseModule>) => {
    const updatedModules = data.modules.map((mod) =>
      mod.id === moduleId ? { ...mod, ...updates } : mod
    );
    onChange({ modules: updatedModules });
  };

  const deleteModule = (moduleId: string) => {
    const updatedModules = data.modules.filter((mod) => mod.id !== moduleId);
    onChange({ modules: updatedModules });
  };

  const addLesson = (moduleId: string) => {
    const module = data.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const newLesson: CourseLesson = {
      id: `lesson-${Date.now()}`,
      title: '',
      type: 'video',
      order: module.lessons.length,
      duration: 0,
    };

    updateModule(moduleId, {
      lessons: [...module.lessons, newLesson],
    });
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    updates: Partial<CourseLesson>
  ) => {
    const module = data.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const updatedLessons = module.lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
    );

    updateModule(moduleId, { lessons: updatedLessons });
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    const module = data.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const updatedLessons = module.lessons.filter((lesson) => lesson.id !== lessonId);
    updateModule(moduleId, { lessons: updatedLessons });
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return faVideo;
      case 'article':
        return faFileAlt;
      case 'quiz':
        return faQuestionCircle;
      default:
        return faFileAlt;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Content</h2>
          <p className="text-gray-600">Build your curriculum with modules and lessons</p>
        </div>
        <button
          onClick={addModule}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-all"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          Add Module
        </button>
      </div>

      {/* Modules List */}
      {data.modules.length > 0 ? (
        <div className="space-y-4">
          {data.modules.map((module, moduleIndex) => (
            <div
              key={module.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Module Header */}
              <div className="bg-gray-50 p-4 flex items-center gap-3">
                <button className="cursor-move text-gray-400 hover:text-gray-600">
                  <FontAwesomeIcon icon={faGripVertical} className="w-4 h-4" />
                </button>

                <div className="flex-1">
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => updateModule(module.id!, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                    placeholder={`Module ${moduleIndex + 1} Title`}
                  />
                </div>

                <button
                  onClick={() => addLesson(module.id!)}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-3 h-3 mr-1" />
                  Add Lesson
                </button>

                <button
                  onClick={() => toggleModule(module.id!)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  <FontAwesomeIcon
                    icon={expandedModules.has(module.id!) ? faChevronUp : faChevronDown}
                    className="w-4 h-4"
                  />
                </button>

                <button
                  onClick={() => deleteModule(module.id!)}
                  className="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>

              {/* Lessons List */}
              {expandedModules.has(module.id!) && module.lessons.length > 0 && (
                <div className="p-4 space-y-3 bg-white">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <button className="cursor-move text-gray-400 hover:text-gray-600 mt-2">
                          <FontAwesomeIcon icon={faGripVertical} className="w-3 h-3" />
                        </button>

                        <div className="flex-1 space-y-3">
                          {/* Lesson Title */}
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) =>
                              updateLesson(module.id!, lesson.id!, { title: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                            placeholder={`Lesson ${lessonIndex + 1} Title`}
                          />

                          {/* Lesson Type & Duration */}
                          <div className="grid grid-cols-2 gap-3">
                            <select
                              value={lesson.type}
                              onChange={(e) =>
                                updateLesson(module.id!, lesson.id!, {
                                  type: e.target.value as 'video' | 'article' | 'quiz',
                                })
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                            >
                              <option value="video">Video</option>
                              <option value="article">Article</option>
                              <option value="quiz">Quiz</option>
                            </select>

                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={lesson.duration}
                                onChange={(e) =>
                                  updateLesson(module.id!, lesson.id!, {
                                    duration: Number(e.target.value),
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                                placeholder="Duration"
                                min="0"
                              />
                              <span className="text-xs text-gray-500">min</span>
                            </div>
                          </div>

                          {/* Video URL (if type is video) */}
                          {lesson.type === 'video' && (
                            <input
                              type="url"
                              value={lesson.video_url || ''}
                              onChange={(e) =>
                                updateLesson(module.id!, lesson.id!, { video_url: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                              placeholder="Video URL or upload"
                            />
                          )}

                          {/* Article Content (if type is article) */}
                          {lesson.type === 'article' && (
                            <textarea
                              value={lesson.content || ''}
                              onChange={(e) =>
                                updateLesson(module.id!, lesson.id!, { content: e.target.value })
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                              placeholder="Article content or notes..."
                            />
                          )}
                        </div>

                        <button
                          onClick={() => deleteLesson(module.id!, lesson.id!)}
                          className="px-2 py-2 text-red-600 hover:text-red-700 mt-2"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State for Lessons */}
              {expandedModules.has(module.id!) && module.lessons.length === 0 && (
                <div className="p-8 text-center bg-gray-50">
                  <p className="text-gray-500 text-sm mb-3">No lessons yet</p>
                  <button
                    onClick={() => addLesson(module.id!)}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                  >
                    + Add your first lesson
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border-2 border-dashed border-gray-300 rounded-xl">
          <FontAwesomeIcon icon={faFileAlt} className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No modules yet</h3>
          <p className="text-gray-500 mb-4">Start building your course curriculum</p>
          <button
            onClick={addModule}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            Create First Module
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseContentStep;

