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
    additionalSitemaps: ["https://www.horizon-consultancy.com/sitemap.xml"],
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
        robots: "index, follow",
      };
    }

    if (path.startsWith("/case-studies")) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.7,
        robots: "index, follow",
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
