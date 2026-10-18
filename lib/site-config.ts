export const siteConfig = {
  name: "z7",
  nameEn: "z7",
  avatar: "/avatar.jpg",
  title: "z7 的博客",
  description: "z7 的个人博客：记录构建、学习与写作。",
  url: "https://xy817-maker.github.io",
  github: "xy817-maker",
  email: "528763895@qq.com",
  footerBio:
    "Build systems, learn deeply, and write it all down. Engineer software for exploration and real-world use.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Resume", href: "/resume" },
    { label: "Inner World", href: "/inner-world" },
    { label: "About", href: "/about" },
  ],
  footer: {
    contactLinks: [
      { label: "GitHub", href: "https://github.com/xy817-maker", type: "github" as const },
      { label: "528763895@qq.com", href: "mailto:528763895@qq.com", type: "email" as const },
      { label: "Aweme", href: "#", type: "aweme" as const },
    ],
    friendLinks: [
      { label: "EastonJiang-全栈神", href: "https://www.jiangxu.net/" },
    ] as { label: string; href: string }[],
  },
  particles: { enabled: true, pages: ["/"], mobileParticleCount: 30, desktopParticleCount: 100 },
  heroEyebrow: "Developer · Builder · Explorer",
  heroRoles: ["Full-Stack Developer", "AI Tooling Explorer", "Open Source Enthusiast"],
  projects: [
    {
      id: "task-cli",
      name: "Task CLI",
      description: "A command-line task tracker built with Go and Cobra, with local JSON storage.",
      tags: ["Go", "CLI"],
      link: "",
      github: "https://github.com/xy817-maker",
      category: "Developing" as const,
    },
    {
      id: "hooks-lab",
      name: "Hooks Lab",
      description: "A practice repo for handwritten React hooks: useDebounce, useVirtualList and more.",
      tags: ["React", "TypeScript"],
      link: "",
      github: "https://github.com/xy817-maker",
      category: "ForStudy" as const,
    },
  ] as {
    id: string;
    name: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
    category: "resume" | "vibecoding" | "ForStudy" | "Developing";
  }[],
  projectCategories: [
    { key: "resume", label: "Portfolio" },
    { key: "vibecoding", label: "Experiments" },
    { key: "ForStudy", label: "Learning" },
    { key: "Developing", label: "In Progress" },
  ],
};
export type Project = (typeof siteConfig)["projects"][number];
