// next.config.js
const { withAuth } = require("next-auth/react");
const { withSentryConfig } = require("@sentry/nextjs");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ["@supabase/supabase-js", "supabase"],
      },
    ],
    [
      withAuth,
      {
        providers: [
          {
            id: "google",
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
          // Add more providers if needed
        ],
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
          async session({ session, token, user }) {
            session.user.id = token.sub; // Set user ID in session
            return session;
          },
        },
      },
    ],
    [
      withSentryConfig,
      {
        silent: true, // Prevent Sentry from logging to the console in development mode
        // ... Sentry configuration
      },
    ],
  ],
  {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
    },
    images: {
      domains: ["lh3.googleusercontent.com"],
    },
  }
);