# AnguliLekha - Indian Sign Language Recognition Platform

![AnguliLekha Banner](public/images/about.png)

## Overview

**AnguliLekha** is an innovative AI-powered platform that enables real-time Indian Sign Language (ISL) recognition through advanced computer vision and machine learning. Our mission is to bridge communication gaps and empower the deaf and hard-of-hearing community by making digital communication seamless, accessible, and inclusive.

## Key Features

- **Real-Time ISL Recognition** - Instantly converts ISL gestures into readable text with 95% accuracy
- **Multi-Level Learning Path** - Progressive learning system from alphabets to words and phrases
- **AI-Powered Detection** - Uses Google's Teachable Machine models for gesture recognition
- **Interactive Tutorials** - Video-based learning modules for each sign
- **Cross-Platform Support** - Responsive design for web and mobile devices
- **Progress Tracking** - Monitor your learning journey with completion tracking
- **User Authentication** - Secure login and registration system

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: shadcn/ui, Radix UI
- **Machine Learning**: TensorFlow.js, Teachable Machine
- **Authentication**: JWT-based authentication
- **State Management**: React Hooks
- **Icons**: Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn package manager
- A modern web browser with camera access
- Git

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/angulilekha.git
cd angulilekha
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_BACKEND_URL
```

> **IMPORTANT**: Make sure to set up the `NEXT_PUBLIC_BACKEND_URL` environment variable. The application will not function properly without it. Replace the URL with your actual backend API endpoint if different.

### 4. Model Setup

The project uses **Google's Teachable Machine** models for ISL recognition. The models are located in the `/public/model/` directory with the following structure:

> 📝 **Note**: If you want to use your own custom models, you can train them using [Google's Teachable Machine](https://teachablemachine.withgoogle.com/) and replace the model files in the respective directories.

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Learning Levels

### Level 1: Beginner (Alphabets A-Z)

- Learn ISL alphabet signs
- Practice hand positions
- Interactive video tutorials

### Level 2: Intermediate (Numbers & Common Words)

- Number recognition (1-9)
- Common vocabulary
- Daily expressions

### Level 3: Advanced (Phrases & Sentences)

- Complex sign combinations
- Full sentence recognition
- Conversational practice

## Authentication

The platform includes a complete authentication system:

- **Registration**: Create a new account with name, email, and password
- **Login**: Secure login with JWT tokens
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Session Management**: Local storage-based session handling

## Camera Requirements

- The application requires camera access for gesture recognition
- Ensure your browser has permission to access the camera
- Optimal lighting conditions improve recognition accuracy
- Position your hand clearly within the camera frame
 o