import plan from '../../../data/update-plan.json';
import {writerAllowed,deny} from "../../../lib/access";
export const dynamic = 'force-dynamic';
export async function GET(request:Request) { if(!await writerAllowed(request.headers))return deny(); return Response.json(plan,{headers:{'Cache-Control':'no-store'}}); }
