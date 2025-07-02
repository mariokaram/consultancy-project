const siteUrl = "https://www.horizon-consultancy.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: [
    "/dashboard",
    "/signin",
    "/questionnaire",
    "/consultant/dashboard-consultant",
    "/chatroom",
    "/consultants",
    "/components/*",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/dashboard",
          "/signin",
          "/consultants",
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
    if (path.includes("/components/")) return null;

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

  additionalPaths: async (config) => {
    return [
      {
        loc: `${siteUrl}/services`,
        changefreq: "daily",
        priority: 0.8,
      },
    ];
  },
};
