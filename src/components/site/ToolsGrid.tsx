import { ArrowUpRight, Layout, FileText, Receipt, ClipboardList, type LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

type Tool = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const tools: Tool[] = [
  {
    name: "Layout",
    description: "快速建立作品集、自動排版與輸出。",
    href: "https://layout.donglinphoto.com",
    icon: Layout,
  },
  {
    name: "Quote",
    description: "快速建立攝影報價單。",
    href: "https://quote.donglinphoto.com",
    icon: FileText,
  },
  {
    name: "Payment",
    description: "建立請款通知。",
    href: "https://payment.donglinphoto.com",
    icon: Receipt,
  },
  {
    name: "Scope",
    description: "建立服務內容確認文件。",
    href: "https://scope.donglinphoto.com",
    icon: ClipboardList,
  },
];

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  const Icon = tool.icon;
  return (
    <a
      ref={ref}
      href={tool.href}
      target="_blank"
      rel="noreferrer"
      style={{
        transitionDelay: `${index * 60}ms`,
      }}
      className={`group relative flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <ArrowUpRight className="h-4 w-4 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900" />
        </div>
        <h3 className="mt-6 text-base font-semibold tracking-tight text-neutral-900">
          {tool.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{tool.description}</p>
      </div>
      <div className="mt-8 text-xs font-medium text-neutral-400 transition-colors group-hover:text-neutral-700">
        前往工具 →
      </div>
    </a>
  );
}

export function ToolsGrid() {
  return (
    <section id="tools" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          工具
        </h2>
        <p className="mt-2 text-sm text-neutral-500">目前正在使用中的小工具。</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool, i) => (
          <ToolCard key={tool.name} tool={tool} index={i} />
        ))}
      </div>
    </section>
  );
}
