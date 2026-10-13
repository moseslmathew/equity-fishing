import {sameOrigin,sessionCookie} from "../../../lib/access";
export const dynamic="force-dynamic";
export function POST(request:Request) {
  if(!sameOrigin(request))return Response.json({error:"Invalid origin."},{status:403});
  return Response.json({ok:true},{headers:{"Cache-Control":"no-store","Set-Cookie":sessionCookie+"=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"}});
}
