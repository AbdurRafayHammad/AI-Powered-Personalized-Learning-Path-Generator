// DatabaseService.js
export class DatabaseService {
  static users = new Map();
  static learningPaths = new Map();
  static userProgress = new Map();

  static saveUser(userId, userData) {
    this.users.set(userId, userData);
    // In a real application, this would save to Supabase/MongoDB
    console.log('User saved:', userId, userData);
  }

  static getUser(userId) {
    return this.users.get(userId);
  }

  static saveLearningPath(userId, pathData) {
    if (!this.learningPaths.has(userId)) {
      this.learningPaths.set(userId, []);
    }
    this.learningPaths.get(userId).push(pathData);
    // In a real application, this would save to Supabase/MongoDB
    console.log('Learning path saved for user:', userId);
  }

  static getLearningPaths(userId) {
    return this.learningPaths.get(userId) || [];
  }

  static updateProgress(userId, resourceId, completed) {
    const key = `${userId}-${resourceId}`;
    this.userProgress.set(key, completed);
    // In a real application, this would update Supabase/MongoDB
    console.log('Progress updated:', key, completed);
  }

  static getProgress(userId, resourceId) {
    const key = `${userId}-${resourceId}`;
    return this.userProgress.get(key) || false;
  }

  static getAllProgress(userId) {
    const userProgress = {};
    for (const [key, value] of this.userProgress.entries()) {
      if (key.startsWith(`${userId}-`)) {
        const resourceId = key.split('-')[1];
        userProgress[resourceId] = value;
      }
    }
    return userProgress;
  }

  static clearUserData(userId) {
    this.users.delete(userId);
    this.learningPaths.delete(userId);
    
    // Clear progress for this user
    const keysToDelete = [];
    for (const key of this.userProgress.keys()) {
      if (key.startsWith(`${userId}-`)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.userProgress.delete(key));
  }
}