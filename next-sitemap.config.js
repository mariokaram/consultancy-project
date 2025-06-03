module.exports = {
  siteUrl: "https://www.horizon-consultancy.com",
  generateRobotsTxt: true,
  exclude: [
    "/dashboard",
    "/signin",
    "/questionnaire",
    "/consultant/dashboard-consultant",
    "/chatroom",
    "/components/*", // Exclude all component pages
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/dashboard",
          "/signin",
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
      "/signin",
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
        priority: 0.8,
      };
    }

    if (path.startsWith("/case-studies")) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.7,
      };
    }

    return {
      loc: path,
      changefreq: "daily",
      priority: ["/"].includes(path) ? 1.0 : 0.7,
    };
  },
};
