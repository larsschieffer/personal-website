import type { TypedResponse } from "@vercel/remix";
import { redirect } from "@vercel/remix";

export const loader = (): TypedResponse<never> => redirect("/about");
