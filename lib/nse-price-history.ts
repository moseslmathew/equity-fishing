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

export async function nsePriceHistory(symbol: string, series: string, months: number) {
  const days = new Map<string, TradingDay>();
  let endDate = "today";
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
