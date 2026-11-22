import {callNse} from "./nse-mcp";

export type TradingDay = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

const isoDay = /^\d{4}-\d{2}-\d{2}$/;
const equitySeries = ["EQ", "BE", "BZ", "SM", "ST"];

export async function nsePriceHistory(symbol: string, series: string, months: number, offset = 0) {
  const days = new Map<string, TradingDay>();
  const today = new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Kolkata"});
  const end = new Date(today+"T00:00:00Z");
  const dayOfMonth = end.getUTCDate();
  end.setUTCDate(1);
  end.setUTCMonth(end.getUTCMonth()-offset);
  const lastDay = new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth()+1,0)).getUTCDate();
  end.setUTCDate(Math.min(dayOfMonth,lastDay));
  let endDate = offset ? end.toISOString().slice(0,10) : "today";
  for (let remaining = months; remaining > 0; remaining -= 3) {
    const result = await callNse("history", "get_stock_history", {
      symbol, months: Math.min(remaining, 3), endDate,
    });
    if (result.symbol !== symbol || !Array.isArray(result.data)) {
      throw new Error("Unexpected NSE history response.");
    }
    for (const {symbol: rowSymbol, series: rowSeries, date, open, high, low, close, volume} of result.data) {
      if (rowSymbol !== symbol || !equitySeries.includes(rowSeries) || !isoDay.test(date)
          || ![open, high, low, close].every(value => Number.isFinite(value) && value > 0)
          || !Number.isSafeInteger(volume) || volume < 0) continue;
      // Prefer the current quote's series when NSE includes multiple rows for a day.
      if (!days.has(date) || rowSeries === series) days.set(date, {date, open, high, low, close, volume});
    }
    const next = result.next_end_date;
    if (remaining <= 3 || !result.data.length) break;
    if (typeof next !== "string" || !isoDay.test(next) || (endDate !== "today" && next >= endDate)) {
      throw new Error("NSE history pagination was incomplete.");
    }
    endDate = next;
  }
  return [...days.values()].sort((a,b) => a.date.localeCompare(b.date));
}
