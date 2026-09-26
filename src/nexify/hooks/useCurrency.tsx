import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { currencies, defaultCurrency, type Currency } from "../data/config";

const STORAGE_KEY = "nexify-currency";

interface CurrencyCtx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** convert an INR price and format it with the active currency */
  format: (inr: number) => string;
}

const fallback = currencies.find((c) => c.code === defaultCurrency) ?? currencies[0];

const CurrencyContext = createContext<CurrencyCtx>({
  currency: fallback,
  setCurrency: () => {},
  format: (n) => `₹${n}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      const found = currencies.find((c) => c.code === saved);
      if (found) return found;
    }
    return fallback;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currency.code);
  }, [currency]);

  const setCurrency = useCallback((c: Currency) => setCurrencyState(c), []);

  const format = useCallback(
    (inr: number) => {
      const value = inr * currency.rate;
      const shown = value.toLocaleString(undefined, {
        minimumFractionDigits: currency.decimals,
        maximumFractionDigits: currency.decimals,
      });
      return `${currency.symbol}${shown}`;
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
