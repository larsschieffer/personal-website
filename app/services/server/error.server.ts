import { createIssue } from "./github-api.server";

export const logError = async ({
  location,
}: {
  location: string;
}): Promise<void> => {
  await createIssue({ title: `User experienced error at ${location}` });
};
