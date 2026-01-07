# Portfolio Website

A modern, fully responsive portfolio website built with React and Vite. Features automatic project fetching from GitHub and a stunning glassmorphism design.

## 🚀 Features

- **Automatic GitHub Integration**: Fetches and displays all your public repositories
- **Modern Design**: Glassmorphism effects, smooth animations, and vibrant gradients
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Technologies

- React 18
- Vite
- Axios
- CSS3 with Custom Properties
- GitHub REST API

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy"

### Environment Variables (Optional)

For higher GitHub API rate limits, you can add a Personal Access Token:

1. Create a GitHub Personal Access Token at https://github.com/settings/tokens
2. In Vercel Dashboard, go to Project Settings → Environment Variables
3. Add: `VITE_GITHUB_TOKEN` with your token value

Then update `src/services/github.js` to use the token in API requests.

## 📝 Customization

### Update Personal Information

Edit `src/utils/constants.js`:

```javascript
export const PERSONAL_INFO = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  location: 'Your Location',
};

export const SOCIAL_LINKS = {
  linkedin: 'your-linkedin-url',
  github: 'your-github-url',
  instagram: 'your-instagram-url',
};
```

### Update Skills

Edit the `SKILLS` array in `src/utils/constants.js`.

### Change Colors

Modify CSS custom properties in `src/index.css` under the `:root` selector.

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React and Vite
