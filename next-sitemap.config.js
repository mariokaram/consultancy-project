module.exports = {
  siteUrl: "https://www.horizon-consultancy.com",
  generateRobotsTxt: true,
  exclude: [
    "/dashboard",
    "/questionnaire",
    "/consultant/dashboard-consultant",
    "/chatroom",
    "/components/*", // Exclude all component pages
  ],
  robotsTxtOptions: {
    additionalSitemaps: ["https://www.horizon-consultancy.com/sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/dashboard",
          "/questionnaire",
          "/consultant/dashboard-consultant",
          "/chatroom",
          "/components/*",
        ],
        allow: "/",
      },
    ],
  },
  transform: async (config, path) => {
    const noIndexPaths = [
      "/dashboard",
      "/questionnaire",
      "/consultant/dashboard-consultant",
      "/chatroom",
      "/components/",
    ];

    // Exclude component pages
    if (path.includes("/components/")) {
      return null;
    }

    // Dynamic Services Paths
    if (path.startsWith("/services")) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.8, // Slightly higher priority for nested service pages
        robots: "index, follow", // Ensure these are indexed
      };
    }

    return {
      loc: path,
      changefreq: "daily",
      priority: ["/"].includes(path) ? 1.0 : 0.7,
      robots: noIndexPaths.some((p) => path.includes(p))
        ? "noindex, nofollow"
        : "index, follow",
    };
  },
};
