# Personalized Learning Path Generator

An AI-powered application that creates tailored learning paths for users based on their interests, current knowledge, and learning style.

## 🌟 Features

### Core Features
- **User Profiling**: Multi-step onboarding to gather user interests, existing skills, and preferred learning methods
- **AI-Powered Path Generation**: Intelligent recommendation system that suggests relevant courses, articles, videos, and projects
- **Progress Tracking**: Users can mark completed resources and track their progress through the learning path
- **Resource Discovery**: Curated library of learning resources from various online platforms
- **Personalized Experience**: Tailored recommendations based on learning style (visual, auditory, kinesthetic, reading/writing)

### Technology Showcase
- **Frontend**: React.js with modern hooks and functional components
- **Styling**: TailwindCSS for responsive and modern design
- **Icons**: Lucide React for beautiful, consistent iconography
- **State Management**: React's built-in state management
- **AI Integration**: Mock AI recommendation engine (ready for real AI integration)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personalized-learning-path-generator.git
   cd personalized-learning-path-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
src/
├── components/
│   ├── OnboardingForm.jsx      # Multi-step user onboarding
│   ├── LearningPathView.jsx    # Main learning path interface
│   └── App.jsx                 # Main application component
├── services/
│   ├── AIRecommendationService.js  # AI recommendation logic
│   └── DatabaseService.js          # Mock database operations
├── styles/
│   └── index.css              # Global styles and Tailwind imports
└── main.jsx                   # Application entry point
```

## 🎯 How It Works

### 1. User Onboarding
- **Step 1**: Basic information (name, experience level)
- **Step 2**: Interest selection from predefined categories
- **Step 3**: Current skills assessment
- **Step 4**: Learning style preference
- **Step 5**: Goals and time commitment

### 2. AI Recommendation Engine
The system uses a sophisticated algorithm that considers:
- User interests and goals
- Current skill level
- Learning style preferences
- Experience level
- Available time commitment

### 3. Learning Path Generation
- Curates resources from multiple platforms (YouTube, Coursera, FreeCodeCamp, etc.)
- Orders resources by difficulty and relevance
- Creates milestone-based progress tracking
- Provides estimated completion times

### 4. Progress Tracking
- Mark resources as completed
- Visual progress indicators
- Milestone achievements
- Study time tracking

## 🔧 Configuration

### Adding New Resources
To add new learning resources, modify the `allResources` array in `AIRecommendationService.js`:

```javascript
{
  id: 11,
  title: "Your Resource Title",
  type: "course", // video, course, article, project
  provider: "Platform Name",
  duration: "X hours",
  difficulty: "beginner", // intermediate, advanced
  topics: ["topic1", "topic2"],
  rating: 4.5,
  description: "Resource description",
  url: "https://resource-url.com"
}
```

### Customizing Learning Styles
Modify the `learningStyles` array in `OnboardingForm.jsx` to add or change learning style options.

### Adding Interest Categories
Update the `interestOptions` array in `OnboardingForm.jsx` to include new learning categories.

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

## 🔮 Future Enhancements

### Backend Integration
- **Supabase Integration**: User authentication and data persistence
- **MongoDB**: Complex learning path structures and user annotations
- **n8n Workflows**: External API integrations and automated notifications

### Advanced AI Features
- **LLM Integration**: Content summarization and personalized explanations
- **Adaptive Learning**: Dynamic difficulty adjustment based on progress
- **Spaced Repetition**: Intelligent review scheduling

### Community Features
- **Path Sharing**: Users can share and discover learning paths
- **Collaboration**: Study groups and peer learning
- **Reviews and Ratings**: Community-driven resource evaluation

### Analytics and Insights
- **Learning Analytics**: Detailed progress insights and recommendations
- **Performance Metrics**: Learning velocity and efficiency tracking
- **Personalized Insights**: AI-generated learning tips and strategies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)

## 📞 Support

If you have any questions or need help getting started, please:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Happy Learning! 🎓✨**