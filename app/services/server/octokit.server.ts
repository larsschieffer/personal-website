import { Octokit } from "@octokit/rest";

const initOctokit = (): Octokit => {
  return new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
};

let octokit: Octokit;

declare global {
  // eslint-disable-next-line no-var
  var __octokit: Octokit | undefined;
}

if (process.env.NODE_ENV === "production") {
  octokit = initOctokit();
} else {
  if (!global.__octokit) {
    global.__octokit = initOctokit();
  }
  octokit = global.__octokit;
}

export { octokit };
