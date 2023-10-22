import type { ActionFunctionArgs, TypedResponse } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createUserGeneratedIssue } from "~/services/server/user-error.server";

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<TypedResponse<never>> => {
  const location = (await request.formData()).get("location");

  invariant(location, '"location" is required in form data');
  invariant(typeof location == "string", '"location" has to be a string');

  await createUserGeneratedIssue(location);

  return redirect("/");
};
