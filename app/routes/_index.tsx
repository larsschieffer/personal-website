import type { TypedResponse } from "@vercel/remix";
import { redirect } from "@vercel/remix";
import { StatusCodes } from "http-status-codes";

export const loader = (): TypedResponse<never> =>
  redirect("/about", StatusCodes.PERMANENT_REDIRECT);
