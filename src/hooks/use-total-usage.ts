import { useEffect, useRef, useState } from "react";

import { tools } from "@/data/tools";

/**
 * 所有工具使用次數的加總。
 *
 * 這裡一定要用 /get（唯讀）而不是 /hit（累加）：首頁只是在「看」各工具的數字，
 * 用 /hit 的話每有一個人打開首頁，五支工具的計數就全部各加一次，數字會失真。
 *
 * 任何一支讀取失敗就以 0 計，不影響其他工具；全部都拿不到就回傳 null，
 * 由呼叫端決定不要顯示。
 */
export function useTotalUsage() {
  const [total, setTotal] = useState<number | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    // StrictMode 在開發模式會跑兩次 effect
    if (requested.current) return;
    requested.current = true;

    const namespaces = tools
      .map((tool) => tool.counterNamespace)
      .filter((namespace): namespace is string => Boolean(namespace));

    if (namespaces.length === 0) return;

    let active = true;

    Promise.all(
      namespaces.map((namespace) =>
        fetch(`https://abacus.jasoncameron.dev/get/${namespace}/visits`)
          .then((response) => response.json())
          .then((data: { value?: number }) =>
            typeof data?.value === "number" ? data.value : 0,
          )
          .catch(() => 0),
      ),
    )
      .then((counts) => {
        const sum = counts.reduce((carry, count) => carry + count, 0);
        if (active && sum > 0) setTotal(sum);
      })
      .catch(() => {
        // 全部失敗就維持不顯示
      });

    return () => {
      active = false;
    };
  }, []);

  return total;
}
