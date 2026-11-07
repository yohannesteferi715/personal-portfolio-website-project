/**
 * Shared mapping of technology names → brand icons + colors.
 * Used by Hero marquee, Skills section, and Projects tags.
 */
import {
  SiPython, SiDjango, SiFastapi, SiRedis, SiCelery,
  SiPostgresql, SiDocker, SiGit, SiGithub, SiLinux,
  SiReact, SiJavascript, SiHtml5, SiCss, SiNginx, SiSwagger,
  SiTailwindcss, SiStripe, SiSelenium, SiTypescript, SiLangchain,
  SiHuggingface, SiAnthropic,
} from "@icons-pack/react-simple-icons";

import {
  Server, Code2, Lock, Database, Table2, Boxes,
  FileText, Layers, Network, Sparkles, ClipboardList,
  BookOpen, Wrench, ShieldCheck, GitBranch,
  Bot, Brain, Binary, Workflow, Search,
} from "lucide-react";

export const TECH_ICONS = {
  // ── AI & Agentic Systems
  "Agentic AI":                      { Icon: Bot,          color: "#06B6D4" },
  "Agentic Systems":                 { Icon: Bot,          color: "#06B6D4" },
  "RAG Systems":                     { Icon: Sparkles,     color: "#8B5CF6" },
  "LLMs":                            { Icon: Brain,        color: "#A855F7" },
  "LangChain":                       { Icon: SiLangchain,  color: "#20B2A6" },
  "Vector Databases":                { Icon: Database,     color: "#EC4899" },
  "Prompt Engineering":              { Icon: Workflow,     color: "#38BDF8" },
  "Hugging Face":                    { Icon: SiHuggingface,color: "#FFD21E" },
  "Anthropic":                       { Icon: SiAnthropic,  color: "#D97757" },

  // ── Backend
  "Python":                          { Icon: SiPython,     color: "#3776AB" },
  "Django":                          { Icon: SiDjango,     color: "#44B78B" },
  "Pure Django":                     { Icon: SiDjango,     color: "#44B78B" },
  "Django REST Framework":           { Icon: SiDjango,     color: "#E01A2B" },
  "DRF":                             { Icon: SiDjango,     color: "#E01A2B" },
  "FastAPI":                         { Icon: SiFastapi,     color: "#009688" },
  "FastAPI / DRF":                   { Icon: SiFastapi,     color: "#009688" },
  "DRF / FastAPI":                   { Icon: SiFastapi,     color: "#009688" },
  "REST APIs":                       { Icon: Server,       color: "#20b2a6" },
  "RESTful API Design":              { Icon: Server,       color: "#20b2a6" },
  "API Authentication & Authorization": { Icon: Lock,       color: "#f5a623" },
  "Redis":                           { Icon: SiRedis,      color: "#FF4438" },
  "Celery":                          { Icon: SiCelery,     color: "#37814A" },

  // ── Frontend
  "React":                           { Icon: SiReact,      color: "#61DAFB" },
  "React.js":                        { Icon: SiReact,      color: "#61DAFB" },
  "TypeScript":                      { Icon: SiTypescript, color: "#3178C6" },
  "JavaScript":                      { Icon: SiJavascript, color: "#F7DF1E" },
  "JS":                              { Icon: SiJavascript, color: "#F7DF1E" },
  "HTML":                            { Icon: SiHtml5,      color: "#E34F26" },
  "HTML5":                           { Icon: SiHtml5,      color: "#E34F26" },
  "CSS":                             { Icon: SiCss,        color: "#1572B6" },
  "CSS3":                            { Icon: SiCss,        color: "#1572B6" },
  "Tailwind CSS":                    { Icon: SiTailwindcss,color: "#06B6D4" },

  // ── Databases & Foundations
  "PostgreSQL":                      { Icon: SiPostgresql, color: "#4169E1" },
  "SQL":                             { Icon: Database,     color: "#f5a623" },
  "Database Design":                 { Icon: Table2,       color: "#20b2a6" },
  "Data Modeling":                   { Icon: Boxes,        color: "#a78bfa" },
  "DSA":                             { Icon: Binary,       color: "#F59E0B" },
  "Data Structures & Algorithms":    { Icon: Binary,       color: "#F59E0B" },

  // ── DevOps & Tools
  "Docker":                          { Icon: SiDocker,     color: "#2496ED" },
  "Git":                             { Icon: SiGit,        color: "#F05032" },
  "GitHub":                          { Icon: SiGithub,     color: "#ffffff" },
  "Linux":                           { Icon: SiLinux,      color: "#FCC624" },
  "API Documentation":               { Icon: SiSwagger,    color: "#85EA2D" },

  // ── Software Engineering & Design
  "SRS":                             { Icon: FileText,     color: "#60A5FA" },
  "SDD":                             { Icon: BookOpen,     color: "#34D399" },
  "SRS & Design":                    { Icon: FileText,     color: "#60A5FA" },
  "SRS & Software Design":           { Icon: FileText,     color: "#60A5FA" },
  "Software Architecture":           { Icon: Layers,       color: "#A78BFA" },
  "System Design":                   { Icon: Network,      color: "#F472B6" },
  "Clean Code":                      { Icon: Sparkles,     color: "#20b2a6" },
  "Requirements Analysis":           { Icon: ClipboardList,color: "#F59E0B" },

  // ── Extra project tags
  "Node.js":                         { Icon: SiReact,      color: "#83CD29" },
  "Stripe":                          { Icon: SiStripe,     color: "#635BFF" },
  "Selenium":                        { Icon: SiSelenium,   color: "#43B02A" },
  "WebSocket":                       { Icon: Server,       color: "#20b2a6" },
  "Nginx":                           { Icon: SiNginx,      color: "#009639" },
  "JWT":                             { Icon: ShieldCheck,  color: "#f5a623" },
  "OAuth2":                          { Icon: Lock,         color: "#61DAFB" },
};

/**
 * Get icon for a tech name, falling back to a generic code icon.
 */
export function getTechIcon(name) {
  return TECH_ICONS[name] || { Icon: Code2, color: "#7a8491" };
}
