import type { TypedResponse } from "@vercel/remix";
import { redirect } from "@vercel/remix";

export function loader(): TypedResponse<never> {
  return redirect("/about");
}
