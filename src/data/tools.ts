export type CaseworkStage = "pitch" | "collect" | "claim";

export type CaseworkStep = {
  /** 系列中的編號，從 1 起算 */
  step: number;
  stage: CaseworkStage;
  /** 系列中的動詞名稱，例如「報價」 */
  verb: string;
  /** 什麼時候用 */
  when: string;
  /** 完成後產出的文件 */
  output: string;
  /** 完成後可以接的下一步工具 id；有兩個時代表擇一 */
  next: string[];
};

/** Casework：一個案子從報價到報帳會用到的工具系列 */
export const casework = {
  name: "Casework",
  tagline: "一個案子，從報價到報帳。",
  description:
    "接案時會用到的六份文件，照編號往下做就不會漏。04 和 05 看付款單位要哪一種，擇一即可；06 有交通費時再用。",
  stages: [
    { id: "pitch", label: "談案" },
    { id: "collect", label: "收款" },
    { id: "claim", label: "報帳" },
  ] satisfies { id: CaseworkStage; label: string }[],
};

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
  /** 屬於 Casework 系列時填寫；首頁區塊、各工具內的系列列都由這裡產生 */
  series?: CaseworkStep;
  /** 該工具在 Abacus 上的計數 namespace，頁尾的總使用次數由這些加總而來 */
  counterNamespace?: string;
};

// Layout 是主打工具（featured），編號 00。
// 有 series 的工具組成 Casework 系列，依 step 編號；其餘工具列在「其他工具」。
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
    series: {
      step: 1,
      stage: "pitch",
      verb: "報價",
      when: "客戶問價時",
      output: "報價單",
      next: ["scope"],
    },
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
    series: {
      step: 2,
      stage: "pitch",
      verb: "確認範圍",
      when: "接案、開拍之前",
      output: "範圍確認書",
      next: ["payment"],
    },
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
    series: {
      step: 3,
      stage: "collect",
      verb: "請款",
      when: "交件之後",
      output: "請款單",
      next: ["receipt", "fill"],
    },
  },
  {
    id: "receipt",
    identity: {
      logo: "/identity/receipt/logo.svg",
      thumbnail: "/identity/receipt/thumbnail.png",
      color: "#6B7340",
      background: "#EFF0E4",
      purpose: "製作個人領據、試算扣繳與二代健保",
    },
    name: "Receipt",
    label: "個人領據製作",
    description: "金額自動轉中文大寫，試算扣繳與補充保費，列印 A4 領據後簽章。",
    href: "https://tools.donglinphoto.com/receipt/",
    category: "business",
    counterNamespace: "donglinphoto-receipt",
    series: {
      step: 4,
      stage: "collect",
      verb: "領據",
      when: "付款單位要領據時",
      output: "個人領據",
      next: ["travel-expense"],
    },
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
    series: {
      step: 5,
      stage: "collect",
      verb: "勞報單",
      when: "付款單位寄來勞報單時",
      output: "簽好的勞報單",
      next: ["travel-expense"],
    },
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
    series: {
      step: 6,
      stage: "claim",
      verb: "交通報帳",
      when: "有車資要報帳時",
      output: "憑證黏貼單",
      next: [],
    },
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
];
