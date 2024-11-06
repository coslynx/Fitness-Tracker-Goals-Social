<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness Tracker
</h1>
<h4 align="center">A web application that simplifies and enhances fitness goal management, built with Next.js, React, Tailwind CSS, and Supabase.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework: Next.js">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="Frontend: Javascript, Html, Css">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend: Node.js">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue" alt="Database: PostgreSQL">
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="LLMs: Custom, Gemini, OpenAI">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Tracker?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Tracker?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Tracker?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "Fitness Tracker" that provides a comprehensive solution for fitness enthusiasts to set goals, track progress, and stay motivated. The application is built using a user-centric approach with a modern tech stack including Next.js, React, Tailwind CSS, and Supabase. 

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **User Authentication** | Secure user registration and login with email verification and password strength checks using NextAuth.js. Users can create personalized profiles. |
| 🎯 | **Goal Setting**       | Allows users to set specific fitness goals with target dates, desired outcomes, and progress metrics. Supports a wide range of goal types. |
| 📈 | **Progress Tracking**   | Enables users to log workouts, track metrics, and visualize progress through interactive charts and graphs. Provides detailed workout summaries. |
| 🤝 | **Social Sharing**     |  Facilitates connections with friends, sharing achievements, and motivating each other. Provides a community forum for encouragement and support. |
| 💻 | **Responsive Design** |  Optimizes the user interface for various screen sizes, ensuring a smooth and engaging experience across devices. | 
| ⚙️ | **Architecture**   | The codebase follows a modular architectural pattern with separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | **Documentation**  | The repository includes a README file that provides a detailed overview of the Minimum Viable Product (MVP), its dependencies, and usage instructions.|
| 🔗 | **Dependencies**   | The codebase relies on various external libraries and packages such as React, uuid, esbuild, and eslint, which are essential for building and styling the UI components, and handling external services.|
| 🧩 | **Modularity**     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for different functionalities such as background, components, and content.|
| 🧪 | **Testing**        | Implement unit tests using frameworks like Jest or React Testing Library to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**    | The performance of the system can be optimized based on factors such as the browser and hardware being used. Consider implementing performance optimizations for better efficiency.|
| 🔐 | **Security**       | Enhance security by implementing measures such as input validation, data encryption, and secure communication protocols.|
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | **Integrations**   | Interacts with browser APIs, external services through HTTP requests, and includes integrations with speech recognition and synthesis APIs.|
| 📶 | **Scalability**    | Design the system to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure
```text
Fitness-Tracker
├── public
│   └── favicon.ico
└── src
    ├── app
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── goals
    │   │   └── page.tsx
    │   └── progress
    │       └── page.tsx
    ├── components
    │   ├── common
    │   │   └── Button.tsx
    │   ├── layout
    │   │   ├── Header.tsx
    │   │   └── Footer.tsx
    │   └── features
    │       ├── goals
    │       │   ├── GoalForm.tsx
    │       │   ├── GoalList.tsx
    │       │   └── GoalItem.tsx
    │       └── progress
    │           ├── ProgressChart.tsx
    │           └── WorkoutForm.tsx
    ├── lib
    │   ├── api
    │   │   └── client.ts
    │   └── utils
    │       └── formatters.ts
    └── styles
        └── globals.css

```

## 💻 Installation
### 🔧 Prerequisites
- Node.js v16+
- npm 6+
- PostgreSQL 14+
- Supabase Account (free tier is sufficient)

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/Fitness-Tracker.git
   cd Fitness-Tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
    - Create a new Supabase project and get your `SUPABASE_URL` and `SUPABASE_KEY`.
    -  Create the following tables in your Supabase database:
        - **users**:  
            - `id` (unique identifier)
            - `email` (unique)
            - `password` (hashed)
            - `name` (optional)
        - **goals**:  
            - `id` (unique identifier)
            - `name`
            - `target` (e.g., target weight, distance, etc.)
            - `targetDate`
            - `outcome` (description of the desired outcome)
            - `userId` (foreign key to users table)
        - **workouts**:  
            - `id` (unique identifier)
            - `activity` (e.g., running, cycling, etc.)
            - `duration` (in minutes)
            - `metrics` (e.g., distance covered, calories burned, etc.)
            - `date`
            - `userId` (foreign key to users table)
    -  Configure the database connection in `.env.local`:
        ```
        NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co 
        SUPABASE_KEY=your_supabase_api_key 
        ```
4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   - Replace the placeholder values in `.env` with your actual Supabase credentials.

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application:
   - Web interface: [http://localhost:3000](http://localhost:3000)

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Deploying to Vercel
1. Create a Vercel account and install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Initialize Vercel:
   ```bash
   vercel init Fitness-Tracker
   ```
4. Select the project directory and follow the prompts.
5. Deploy the code:
   ```bash
   vercel
   ```
   -  Follow the instructions to configure your Supabase database connection and other necessary environment variables on Vercel.
6. Once the deployment is complete, you can access your live application through the URL provided by Vercel.

### 🔑 Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Public Supabase URL for frontend access.
- `SUPABASE_KEY`: Private Supabase API key for backend access.
- `NEXTAUTH_URL`: Public URL for NextAuth.js authentication (set to the domain where your application is hosted).
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js authentication (generate a random string).
- `GOOGLE_CLIENT_ID`: Google Client ID for OAuth authentication (create a Google Cloud Project and enable Google Sign-in).
- `GOOGLE_CLIENT_SECRET`: Google Client Secret for OAuth authentication.

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: Fitness-Tracker

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>