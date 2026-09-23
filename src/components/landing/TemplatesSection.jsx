import { FileText, Star, Package, AppWindow, BookOpen, Users, Component, Terminal } from "lucide-react";

const TEMPLATES = [
  {
    name: "Minimal",
    desc: "Clean, simple README with just the essentials",
    icon: FileText,
    blocks: ["title", "description", "install", "usage", "license"],
  },
  {
    name: "Full Featured",
    desc: "Complete README with all sections for production apps",
    icon: Star,
    blocks: ["title", "badges", "description", "features", "install", "usage", "api", "contributing", "license"],
  },
  {
    name: "Library / SDK",
    desc: "Optimized for npm packages and developer libraries",
    icon: Package,
    blocks: ["title", "badges", "description", "features", "install", "usage", "api", "license"],
  },
  {
    name: "Application",
    desc: "For desktop apps, web apps, and services",
    icon: AppWindow,
    blocks: ["title", "badges", "description", "features", "install", "usage", "screenshots", "license"],
  },
  {
    name: "API Documentation",
    desc: "Structured documentation for REST and GraphQL APIs",
    icon: BookOpen,
    blocks: ["title", "badges", "description", "install", "usage", "api", "license"],
  },
  {
    name: "Open Source",
    desc: "Community-focused with detailed contributing guidelines",
    icon: Users,
    blocks: ["title", "badges", "description", "features", "install", "usage", "api", "contributing", "license"],
  },
  {
    name: "React Component",
    desc: "For UI component libraries and React packages",
    icon: Component,
    blocks: ["title", "badges", "description", "features", "install", "usage", "api", "license"],
  },
  {
    name: "CLI Tool",
    desc: "For command-line tools and developer utilities",
    icon: Terminal,
    blocks: ["title", "badges", "description", "features", "install", "usage", "api", "license"],
  },
];

export default function TemplatesSection() {
  return (
    <section id="templates" className="px-15 py-24 bg-[#FAFAFA] dark:bg-[#0c0c0c]">
      <div className="mx-auto max-w-full">
        <div className="mb-3 section-label">Templates</div>
        <h3 className="m-0 mb-6 max-w-2xl section-heading">
          Start with a proven structure.
        </h3>
        <p className="m-0 mb-16 max-w-2xl section-body">
          Pick a template, customize the content, and ship. Every template is
          designed for a specific use case - from minimal READMEs to full
          API documentation.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.name}
                className="border border-gray-200 dark:border-white/10 p-5 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:hover:border-white/20 dark:hover:bg-white/5"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center bg-gray-100 dark:bg-white/10">
                  <Icon size={17} className="text-gray-600 dark:text-gray-300" strokeWidth={2} />
                </div>
                <h4 className="m-0 text-sm font-medium text-black dark:text-white">
                  {template.name}
                </h4>
                <p className="m-0 mt-1.5 text-[13px] leading-5 text-gray-500">
                  {template.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {template.blocks.slice(0, 4).map((b) => (
                    <span
                      key={b}
                      className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-medium"
                    >
                      {b}
                    </span>
                  ))}
                  {template.blocks.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-500">
                      +{template.blocks.length - 4}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
