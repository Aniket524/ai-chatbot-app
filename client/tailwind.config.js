module.exports = {
    content: ['./src/**/*.{vue,js,ts}'],
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#6366f1",    // Royal purple-blue
            "secondary": "#3b82f6",  // Vibrant blue
            "accent": "#f472b6",     // Soft pink
            "neutral": "#1f2937",    // Dark gray
            "base-100": "#0f172a",   // Deep navy base
            "info": "#38bdf8",       // Sky blue
            "success": "#34d399",    // Mint green
            "warning": "#fbbf24",    // Amber
            "error": "#ef4444",      // Coral red
            "primary-content": "#e0e7ff", // Text color for primary
            "secondary-content": "#dbeafe", // Text color for secondary
          },
        },
      ],
    },
  };
  