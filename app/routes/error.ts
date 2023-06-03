import type { ActionArgs, TypedResponse } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { logError } from "~/services/server/error.server";

export const action = async ({
  request,
}: ActionArgs): Promise<TypedResponse<never>> => {
  const location = (await request.formData()).get("location");

  invariant(location, '"location" is required in form data');
  invariant(typeof location == "string", '"location" has to be a string');

  await logError({ location });

  return redirect("/");
};
