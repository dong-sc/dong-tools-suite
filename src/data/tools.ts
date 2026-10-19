export type Tool = {
  id: string;
  name: string;
  label: string;
  description: string;
  href: string;
  identity: {
    logo: string;
    thumbnail: string;
    color: string;
    background: string;
    purpose: string;
  };
  category: "create" | "business";
  featured?: boolean;
  /** 該工具在 Abacus 上的計數 namespace，頁尾的總使用次數由這些加總而來 */
  counterNamespace?: string;
};

export const tools: Tool[] = [
  {
    id: "layout",
    identity: {
      logo: "/identity/layout/logo.svg",
      thumbnail: "/identity/layout/thumbnail.png",
      color: "#345B80",
      background: "#E9EFF5",
      purpose: "照片自動排版、IG 無縫輪播",
    },
    name: "Layout",
    label: "照片自動排版與 IG 無縫輪播",
    description: "放入照片，自動建立版面，也能手動調整並輸出常用格式。",
    href: "https://layout.donglinphoto.com",
    category: "create",
    counterNamespace: "donglinphoto-layout-tool",
    featured: true,
  },
  {
    id: "quote",
    identity: {
      logo: "/identity/quote/logo.svg",
      thumbnail: "/identity/quote/thumbnail.png",
      color: "#856536",
      background: "#F3EDE1",
      purpose: "製作報價單、列印 PDF",
    },
    name: "Quote",
    label: "報價單製作",
    description: "快速整理服務項目、費用與報價條件。",
    href: "https://quote.donglinphoto.com",
    category: "business",
    counterNamespace: "donglinphoto-quote",
  },
  {
    id: "scope",
    identity: {
      logo: "/identity/scope/logo.svg",
      thumbnail: "/identity/scope/thumbnail.png",
      color: "#54705A",
      background: "#EAF0E9",
      purpose: "整理服務範圍、交付與修改規則",
    },
    name: "Scope",
    label: "服務範圍確認",
    description: "把拍攝內容與交付共識整理清楚。",
    href: "https://scope.donglinphoto.com",
    category: "business",
    counterNamespace: "donglinphoto-scope",
  },
  {
    id: "payment",
    identity: {
      logo: "/identity/payment/logo.svg",
      thumbnail: "/identity/payment/thumbnail.png",
      color: "#936152",
      background: "#F4EAE5",
      purpose: "製作請款單與匯款資訊",
    },
    name: "Payment",
    label: "請款單製作",
    description: "建立清楚、得體的請款資訊。",
    href: "https://payment.donglinphoto.com",
    category: "business",
    counterNamespace: "donglinphoto-payment",
  },
  {
    id: "travel-expense",
    identity: {
      logo: "/identity/travel-expense/logo.svg",
      thumbnail: "/identity/travel-expense/thumbnail.png",
      color: "#557578",
      background: "#E8F0EF",
      purpose: "列印交通費憑證黏貼單",
    },
    name: "Travel Expense",
    label: "交通費報帳",
    description: "整理活動與交通費用，列印憑證黏貼單與高鐵裁切頁。",
    href: "https://tools.donglinphoto.com/travel-expense/",
    counterNamespace: "donglinphoto-travel-expense",
    category: "business",
  },
  {
    id: "thsr-upload",
    identity: {
      logo: "/identity/thsr-upload/logo.svg",
      thumbnail: "/identity/thsr-upload/thumbnail.png",
      color: "#746288",
      background: "#F0EBF4",
      purpose: "估算高鐵途中照片上傳時間",
    },
    name: "THSR Upload",
    label: "高鐵上傳安全窗",
    description: "估算高鐵途中照片上傳時間與風險區段。",
    href: "https://tools.donglinphoto.com/thsr-upload/",
    category: "business",
    counterNamespace: "donglinphoto-thsr-upload",
  },
  {
    id: "fill",
    identity: {
      logo: "/identity/fill/logo.svg",
      thumbnail: "/identity/fill/thumbnail.png",
      color: "#626B91",
      background: "#ECEEF5",
      purpose: "填寫勞報單、PDF 與簽名",
    },
    name: "Fill",
    label: "PDF 填寫",
    description: "在收到的 PDF 上填入資料與簽名，輸出成新檔案。",
    href: "https://simple-pdf.donglinphoto.com",
    category: "business",
    counterNamespace: "donglinphoto-pdf-fill",
  },
];
