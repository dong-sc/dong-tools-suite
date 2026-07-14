import {
  ClipboardCheck,
  FileText,
  LayoutTemplate,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  id: string;
  name: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: "create" | "business";
  featured?: boolean;
};

export const tools: Tool[] = [
  {
    id: "layout",
    name: "Layout",
    label: "作品排版",
    description: "放入照片，自動建立版面，也能手動調整並輸出常用格式。",
    href: "https://layout.donglinphoto.com",
    icon: LayoutTemplate,
    category: "create",
    featured: true,
  },
  {
    id: "quote",
    name: "Quote",
    label: "攝影報價單",
    description: "快速整理服務項目、費用與報價條件。",
    href: "https://quote.donglinphoto.com",
    icon: FileText,
    category: "business",
  },
  {
    id: "scope",
    name: "Scope",
    label: "服務範圍確認",
    description: "把拍攝內容與交付共識整理清楚。",
    href: "https://scope.donglinphoto.com",
    icon: ClipboardCheck,
    category: "business",
  },
  {
    id: "payment",
    name: "Payment",
    label: "請款通知",
    description: "建立清楚、得體的請款資訊。",
    href: "https://payment.donglinphoto.com",
    icon: ReceiptText,
    category: "business",
  },
];
