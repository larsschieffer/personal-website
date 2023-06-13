import invariant from "tiny-invariant";
import {
  GITHUB_CONTENT_REPO,
  GITHUB_OWNER,
  GITHUB_REPO,
} from "~/constants/github";
import type { FileMetaData } from "~/types/file";
import { octokit } from "./octokit.server";

export const getMetaDataOfFilesAtPath = async (
  path: string
): Promise<FileMetaData[]> => {
  const content = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: GITHUB_OWNER,
      repo: GITHUB_CONTENT_REPO,
      path,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const { data } = content;

  invariant(Array.isArray(data), "Array of files is expected");

  return data;
};

export const createIssue = async (
  title: string
): Promise<{ title: string }> => {
  const issue = await octokit.rest.issues.create({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    title,
  });

  return issue.data;
};
