// AIRecommendationService.js
export class AIRecommendationService {
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
      },
      {
        id: 7,
        title: "Machine Learning Fundamentals",
        type: "course",
        provider: "Coursera",
        duration: "45 hours",
        difficulty: "intermediate",
        topics: ["machine learning", "ai", "python", "data science"],
        rating: 4.7,
        description: "Introduction to machine learning algorithms and applications",
        url: "https://coursera.org"
      },
      {
        id: 8,
        title: "Mobile App Development with React Native",
        type: "video",
        provider: "YouTube",
        duration: "20 hours",
        difficulty: "intermediate",
        topics: ["mobile development", "react native", "javascript"],
        rating: 4.6,
        description: "Build cross-platform mobile apps",
        url: "https://youtube.com"
      },
      {
        id: 9,
        title: "Cybersecurity Basics",
        type: "course",
        provider: "edX",
        duration: "30 hours",
        difficulty: "beginner",
        topics: ["cybersecurity", "network security", "encryption"],
        rating: 4.5,
        description: "Learn cybersecurity fundamentals and best practices",
        url: "https://edx.org"
      },
      {
        id: 10,
        title: "Cloud Computing with AWS",
        type: "course",
        provider: "AWS Training",
        duration: "35 hours",
        difficulty: "intermediate",
        topics: ["cloud computing", "aws", "devops"],
        rating: 4.8,
        description: "Master AWS cloud services and deployment",
        url: "https://aws.amazon.com/training"
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
      resources: recommendedResources.slice(0, 6), // Limit to 6 resources
      milestones: this.generateMilestones(recommendedResources.slice(0, 6))
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