import React, { useState, useEffect } from 'react';
import { User, Book, Target, Clock, CheckCircle, Search, Filter, Play, ExternalLink, Star, TrendingUp, Users, Brain } from 'lucide-react';

// Mock AI Service for generating learning paths
class AIRecommendationService {
  static generateLearningPath(userProfile) {
    const { interests, currentSkills, learningStyle, goals, experience } = userProfile;
    
    // Mock resource database
    const allResources = [
      {
        id: 1,
        title: "Introduction to Web Development",
        type: "course",
        provider: "FreeCodeCamp",
        duration: "40 hours",
        difficulty: "beginner",
        topics: ["html", "css", "javascript", "web development"],
        rating: 4.8,
        description: "Learn the fundamentals of web development",
        url: "https://freecodecamp.org"
      },
      {
        id: 2,
        title: "React.js Complete Guide",
        type: "video",
        provider: "YouTube",
        duration: "12 hours",
        difficulty: "intermediate",
        topics: ["react", "javascript", "frontend"],
        rating: 4.7,
        description: "Comprehensive React.js tutorial series",
        url: "https://youtube.com"
      },
      {
        id: 3,
        title: "Data Structures and Algorithms",
        type: "course",
        provider: "Coursera",
        duration: "60 hours",
        difficulty: "intermediate",
        topics: ["algorithms", "data structures", "computer science"],
        rating: 4.9,
        description: "Master fundamental CS concepts",
        url: "https://coursera.org"
      },
      {
        id: 4,
        title: "Python for Data Science",
        type: "article",
        provider: "Medium",
        duration: "2 hours",
        difficulty: "beginner",
        topics: ["python", "data science", "machine learning"],
        rating: 4.5,
        description: "Getting started with Python for data analysis",
        url: "https://medium.com"
      },
      {
        id: 5,
        title: "UI/UX Design Principles",
        type: "course",
        provider: "Udemy",
        duration: "25 hours",
        difficulty: "beginner",
        topics: ["design", "ui", "ux", "figma"],
        rating: 4.6,
        description: "Learn modern design principles and tools",
        url: "https://udemy.com"
      },
      {
        id: 6,
        title: "Advanced JavaScript Concepts",
        type: "project",
        provider: "GitHub",
        duration: "15 hours",
        difficulty: "advanced",
        topics: ["javascript", "advanced", "async", "closures"],
        rating: 4.8,
        description: "Build projects to master advanced JS concepts",
        url: "https://github.com"
      }
    ];

    // Simple recommendation algorithm based on user interests and current skills
    const recommendedResources = allResources.filter(resource => {
      const hasMatchingInterest = interests.some(interest => 
        resource.topics.some(topic => topic.toLowerCase().includes(interest.toLowerCase()))
      );
      
      const isAppropriateLevel = this.getDifficultyScore(resource.difficulty) >= 
        this.getExperienceScore(experience);
      
      return hasMatchingInterest && isAppropriateLevel;
    }).sort((a, b) => b.rating - a.rating);

    return {
      pathId: Date.now(),
      title: `${interests[0]} Learning Journey`,
      description: `Personalized path for mastering ${interests.join(', ')}`,
      estimatedDuration: `${recommendedResources.reduce((total, r) => total + parseInt(r.duration), 0)} hours`,
      resources: recommendedResources.slice(0, 4), // Limit to 4 resources
      milestones: this.generateMilestones(recommendedResources.slice(0, 4))
    };
  }

  static getDifficultyScore(difficulty) {
    const scores = { beginner: 1, intermediate: 2, advanced: 3 };
    return scores[difficulty] || 1;
  }

  static getExperienceScore(experience) {
    const scores = { beginner: 1, intermediate: 2, expert: 3 };
    return scores[experience] || 1;
  }

  static generateMilestones(resources) {
    return resources.map((resource, index) => ({
      id: index + 1,
      title: `Complete ${resource.title}`,
      description: resource.description,
      completed: false,
      dueDate: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));
  }
}

// Mock Database Service
class DatabaseService {
  static users = new Map();
  static learningPaths = new Map();
  static userProgress = new Map();

  static saveUser(userId, userData) {
    this.users.set(userId, userData);
  }

  static getUser(userId) {
    return this.users.get(userId);
  }

  static saveLearningPath(userId, pathData) {
    if (!this.learningPaths.has(userId)) {
      this.learningPaths.set(userId, []);
    }
    this.learningPaths.get(userId).push(pathData);
  }

  static getLearningPaths(userId) {
    return this.learningPaths.get(userId) || [];
  }

  static updateProgress(userId, resourceId, completed) {
    const key = `${userId}-${resourceId}`;
    this.userProgress.set(key, completed);
  }

  static getProgress(userId, resourceId) {
    const key = `${userId}-${resourceId}`;
    return this.userProgress.get(key) || false;
  }
}

// Components
const OnboardingForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    interests: [],
    currentSkills: [],
    learningStyle: '',
    goals: '',
    experience: 'beginner',
    timeCommitment: ''
  });

  const interestOptions = [
    'Web Development', 'Data Science', 'Mobile Development', 'AI/ML', 
    'Cybersecurity', 'Cloud Computing', 'UI/UX Design', 'Game Development'
  ];

  const skillOptions = [
    'HTML/CSS', 'JavaScript', 'Python', 'React', 'Node.js', 
    'SQL', 'Git', 'Figma', 'AWS', 'Docker'
  ];

  const learningStyles = [
    { value: 'visual', label: 'Visual (diagrams, videos)', icon: '👁️' },
    { value: 'auditory', label: 'Auditory (podcasts, lectures)', icon: '🎧' },
    { value: 'kinesthetic', label: 'Hands-on (projects, coding)', icon: '💻' },
    { value: 'reading', label: 'Reading/Writing (articles, docs)', icon: '📚' }
  ];

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = () => {
    const userId = 'user-' + Date.now();
    DatabaseService.saveUser(userId, formData);
    onComplete(userId, formData);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">What are you interested in learning?</label>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    onClick={() => handleMultiSelect('interests', interest)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Current Skills</label>
              <div className="grid grid-cols-2 gap-3">
                {skillOptions.map(skill => (
                  <button
                    key={skill}
                    onClick={() => handleMultiSelect('currentSkills', skill)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      formData.currentSkills.includes(skill)
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Learning Style</label>
              <div className="space-y-3">
                {learningStyles.map(style => (
                  <button
                    key={style.value}
                    onClick={() => setFormData(prev => ({ ...prev, learningStyle: style.value }))}
                    className={`w-full p-4 text-left border rounded-lg transition-colors flex items-center space-x-3 ${
                      formData.learningStyle === style.value
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-2xl">{style.icon}</span>
                    <span>{style.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Learning Goals</label>
              <textarea
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="What do you want to achieve? (e.g., Get a job in web development, build a mobile app, etc.)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Commitment (hours per week)</label>
              <select
                value={formData.timeCommitment}
                onChange={(e) => setFormData(prev => ({ ...prev, timeCommitment: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select time commitment</option>
                <option value="1-5">1-5 hours</option>
                <option value="5-10">5-10 hours</option>
                <option value="10-20">10-20 hours</option>
                <option value="20+">20+ hours</option>
              </select>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Let's Get Started</h2>
          <span className="text-sm text-gray-500">Step {step} of 5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        
        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Generate My Learning Path
          </button>
        )}
      </div>
    </div>
  );
};

const LearningPathView = ({ userId, userProfile, learningPath, onResourceComplete }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const getResourceIcon = (type) => {
    switch(type) {
      case 'video': return <Play className="w-5 h-5" />;
      case 'course': return <Book className="w-5 h-5" />;
      case 'article': return <ExternalLink className="w-5 h-5" />;
      case 'project': return <Target className="w-5 h-5" />;
      default: return <Book className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedResources = learningPath.resources.filter(resource => 
    DatabaseService.getProgress(userId, resource.id)
  ).length;

  const progressPercentage = (completedResources / learningPath.resources.length) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{learningPath.title}</h1>
            <p className="text-blue-100 mb-4">{learningPath.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{learningPath.estimatedDuration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>{learningPath.resources.length} Resources</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{completedResources}/{learningPath.resources.length}</div>
              <div className="text-sm text-blue-100">Completed</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: <Book className="w-4 h-4" /> },
              { id: 'resources', label: 'Resources', icon: <Target className="w-4 h-4" /> },
              { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Learning Path Overview</h3>
              <p className="text-gray-600 mb-4">
                This personalized learning path was generated based on your interests in {userProfile.interests.join(', ')} 
                and your {userProfile.experience} experience level.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Your Profile
                </h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Experience:</strong> {userProfile.experience}</div>
                  <div><strong>Learning Style:</strong> {userProfile.learningStyle}</div>
                  <div><strong>Time Commitment:</strong> {userProfile.timeCommitment} hours/week</div>
                  <div><strong>Current Skills:</strong> {userProfile.currentSkills.join(', ')}</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Learning Goals
                </h4>
                <p className="text-sm text-gray-600">{userProfile.goals}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
            {learningPath.resources.map((resource, index) => {
              const isCompleted = DatabaseService.getProgress(userId, resource.id);
              return (
                <div key={resource.id} className={`border rounded-lg p-6 ${isCompleted ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {getResourceIcon(resource.type)}
                          <span className="font-semibold text-lg">{resource.title}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{resource.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {resource.duration}
                        </span>
                        <span>by {resource.provider}</span>
                        <span className="capitalize">{resource.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => onResourceComplete(resource.id, !isCompleted)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          isCompleted 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                      </button>
                      
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Resource</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{completedResources}</div>
                <div className="text-gray-600">Resources Completed</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{Math.round(progressPercentage)}%</div>
                <div className="text-gray-600">Path Progress</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {learningPath.resources.reduce((total, r) => DatabaseService.getProgress(userId, r.id) ? total + parseInt(r.duration) : total, 0)}h
                </div>
                <div className="text-gray-600">Hours Studied</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Milestones</h4>
              <div className="space-y-3">
                {learningPath.milestones.map((milestone, index) => {
                  const isCompleted = DatabaseService.getProgress(userId, index + 1);
                  return (
                    <div key={milestone.id} className={`flex items-center space-x-4 p-4 border rounded-lg ${
                      isCompleted ? 'bg-green-50 border-green-200' : 'border-gray-200'
                    }`}>
                      <CheckCircle className={`w-6 h-6 ${isCompleted ? 'text-green-600' : 'text-gray-300'}`} />
                      <div className="flex-1">
                        <div className="font-medium">{milestone.title}</div>
                        <div className="text-sm text-gray-600">{milestone.description}</div>
                      </div>
                      <div className="text-sm text-gray-500">Due: {milestone.dueDate}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const LearningPathGenerator = () => {
  const [currentView, setCurrentView] = useState('onboarding');
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnboardingComplete = async (newUserId, profile) => {
    setLoading(true);
    setUserId(newUserId);
    setUserProfile(profile);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const generatedPath = AIRecommendationService.generateLearningPath(profile);
      DatabaseService.saveLearningPath(newUserId, generatedPath);
      setLearningPath(generatedPath);
      setCurrentView('learningPath');
      setLoading(false);
    }, 2000);
  };

  const handleResourceComplete = (resourceId, completed) => {
    DatabaseService.updateProgress(userId, resourceId, completed);
    // Force re-render by updating state
    setLearningPath(prev => ({ ...prev }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Learning Path</h2>
          <p className="text-gray-600">Our AI is analyzing your profile and curating the best resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Learning Path Generator</h1>
            </div>
            {currentView === 'learningPath' && (
              <button
                onClick={() => {
                  setCurrentView('onboarding');
                  setUserId(null);
                  setUserProfile(null);
                  setLearningPath(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'onboarding' && (
          <OnboardingForm onComplete={handleOnboardingComplete} />
        )}
        
        {currentView === 'learningPath' && learningPath && (
          <LearningPathView 
            userId={userId}
            userProfile={userProfile}
            learningPath={learningPath}
            onResourceComplete={handleResourceComplete}
          />
        )}
      </main>
    </div>
  );
};

export default LearningPathGenerator;