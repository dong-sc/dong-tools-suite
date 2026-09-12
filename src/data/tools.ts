import {
  ClipboardCheck,
  FileSignature,
  FileText,
  TrainFront,
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
  /** 該工具在 Abacus 上的計數 namespace，頁尾的總使用次數由這些加總而來 */
  counterNamespace?: string;
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
    counterNamespace: "donglinphoto-layout-tool",
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
    counterNamespace: "donglinphoto-quote",
  },
  {
    id: "scope",
    name: "Scope",
    label: "服務範圍確認",
    description: "把拍攝內容與交付共識整理清楚。",
    href: "https://scope.donglinphoto.com",
    icon: ClipboardCheck,
    category: "business",
    counterNamespace: "donglinphoto-scope",
  },
  {
    id: "payment",
    name: "Payment",
    label: "請款通知",
    description: "建立清楚、得體的請款資訊。",
    href: "https://payment.donglinphoto.com",
    icon: ReceiptText,
    category: "business",
    counterNamespace: "donglinphoto-payment",
  },
  {
    id: "travel-expense",
    name: "Travel Expense",
    label: "交通費報帳",
    description: "整理活動與交通費用，列印憑證黏貼單與高鐵裁切頁。",
    href: "https://dong-lin-photo.lovable.app/tools/travel-expense",
    icon: TrainFront,
    category: "business",
  },
  {
    id: "fill",
    name: "Fill",
    label: "PDF 填寫",
    description: "在收到的 PDF 上填入資料與簽名，輸出成新檔案。",
    href: "https://simple-pdf.donglinphoto.com",
    icon: FileSignature,
    category: "business",
    counterNamespace: "donglinphoto-pdf-fill",
  },
];
