import type { ResumeVersion } from "@/types/resume";
import { siteConfig } from "@/lib/site-config";

const header = {
  name: siteConfig.name,
  email: siteConfig.email,
  github: siteConfig.github,
  blog: new URL(siteConfig.url).host,
};

export const resumeVersions: ResumeVersion[] = [
  {
    key: "demo-current",
    label: "示例简历 · 当前版",
    date: "2026-04",
    intent: {
      role: "示例岗位（虚构）",
      note: "演示数据 · 随时可到岗 · 期望base：示例城市 · 支持远程协作",
    },
    header,
    sections: {
      summary:
        "这是虚构的演示简历，用于展示布局与版本切换。学校、奖项、项目与技能均为示例内容，请替换为自己的真实信息。",
      education: [
        {
          school: "示例大学（虚构）",
          degree: "本科",
          gpa: "",
          period: "2022.9 - 2026.7",
          details: ["示例竞赛奖项（虚构）", "示例课程与经历（虚构）"],
        },
      ],
      skills: [
        "深入理解**事件循环**、**浏览器渲染**等前端核心原理",
        "熟练掌握 **JavaScript / TypeScript**，熟悉 **React** 及相关生态，了解 **Vue3**、**Next.js** 并有示例项目经验",
        "熟悉前端工程化与代码规范，能够使用 **ESLint + Prettier + TypeScript + Husky** 保障示例项目代码质量",
        "熟练使用 **Ant Design**、**ECharts** 等常用组件库与工具，具备快速查阅官方文档解决问题的能力",
        "能够使用 **ClaudeCode**、**Cursor** 等工具高效开发示例项目",
        "熟悉 **Git 协作与 PR 流程**，掌握 **CI/CD**（GitHub Actions）、**Docker** 容器化部署",
      ],
      experience: [],
      projects: [
        {
          name: "示例数据分析平台",
          tech: "React 18 + TypeScript + Umi Max + Ant Design + ECharts + Zod + react-window",
          github: "https://github.com/example/demo-project",
          period: "2026.02 – 维护至今（虚构）",
          points: [
            "**项目简介：**基于 AI 大模型的示例 BI 平台，用户上传 Excel 数据后，AI 自动生成 ECharts 可视化图表与分析结论，支持同步/异步生成，可通过拖拽看板组合展示多图表",
            "设计基于 **Zod 的图表 Schema 校验层**，对 AI 返回的 ECharts 配置进行运行时校验、JSON 容错提取与危险字段过滤，结合 Error Boundary 兜底，实现**图表渲染崩溃率为 0**",
            "针对大量数据与看板渲染，采用**虚拟列表**与轻量化封装，提升交互帧率与加载体验",
          ],
        },
      ],
    },
  },
  {
    key: "demo-previous",
    label: "示例简历 · 历史版",
    date: "2025-11",
    intent: {
      role: "示例方向（虚构）",
      note: "演示数据 · 历史版本快照",
    },
    header,
    sections: {
      summary: "这是虚构的历史版本简历，用于验证版本切换交互，所有内容均为示例。",
      education: [
        {
          school: "示例大学（虚构）",
          degree: "本科在读",
          gpa: "",
          period: "2022.9 - 2026.7",
          details: ["示例转专业记录（虚构）"],
        },
      ],
      skills: [
        "掌握 **HTML / CSS / JavaScript** 基础，能完成静态页面开发",
        "了解 **Git** 基本协作流程与 **Markdown** 文档写作",
      ],
      experience: [],
      projects: [],
    },
  },
];
