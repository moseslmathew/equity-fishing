import {deny,readerAllowed} from "../../../../lib/access";
import {nseSecurity} from "../../../../lib/nse-security-links";
import {nsePriceHistory} from "../../../../lib/nse-price-history";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!await readerAllowed(request.headers)) return deny();
  const params = new URL(request.url).searchParams;
  const symbol = params.get("symbol") ?? "";
  const series = params.get("series") ?? "EQ";
  const months = Number(params.get("months") ?? "1");
  const headers = {"Cache-Control":"private, no-store"};
  if (!nseSecurity(symbol) || ![1,3,6,12].includes(months) || !["EQ","BE","BZ","SM","ST"].includes(series)) {
    return Response.json({error:"Invalid NSE symbol, series or range."},{status:400,headers});
  }
  try {
    return Response.json({days:await nsePriceHistory(symbol,series,months)},{headers});
  } catch {
    return Response.json({error:"NSE price history is temporarily unavailable."},{status:503,headers});
  }
}
