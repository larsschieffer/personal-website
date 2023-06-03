import type { Endpoints } from "@octokit/types";
import {
  GITHUB_CONTENT_REPO,
  GITHUB_OWNER,
  GITHUB_REPO,
} from "~/constants/github";
import { octokit } from "./octokit.server";

export const getAllFileData = async (
  path: string
): Promise<
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]
> => {
  return await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: GITHUB_OWNER,
    repo: GITHUB_CONTENT_REPO,
    path,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

export const createIssue = async ({
  title,
}: {
  title: string;
}): Promise<void> => {
  await octokit.rest.issues.create({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    title,
  });
};
