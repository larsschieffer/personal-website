import { createIssue } from "./github-api.server";

export const createUserGeneratedIssue = async (
  location: string
): Promise<void> => {
  await createIssue(`User experienced error at ${location}`);
};
