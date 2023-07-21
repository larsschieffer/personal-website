import { fetch } from "@remix-run/node";
import type { BuildOptions } from "esbuild";

import { bundleMDX } from "mdx-bundler";
import path from "path";
import type { Markdown } from "~/types/markdown";
import { getValueEnvironmentFromVariable } from "./environment.server";

process.env.ESBUILD_BINARY_PATH = path.join(
  process.cwd(),
  "node_modules",
  "esbuild",
  "bin",
  "esbuild",
);

const location = getValueEnvironmentFromVariable("CONTENT_LOCATION");

export const bundleFileMarkdown = async <T extends Record<string, unknown>>(
  filePath: string,
): Promise<Markdown<T> | undefined> => {
  const file = await fetch(`${location}/${filePath}`);
  if (isFileMissing(file)) {
    return;
  }

  return await bundleMDX<T>({
    source: await file.text(),
    esbuildOptions,
  });
};

const isFileMissing = (file: Response): boolean => {
  return file.status === 404;
};

const esbuildOptions = <T extends Record<string, unknown>>(
  options: BuildOptions,
  _frontmatter: T,
): BuildOptions => {
  options.minify = true;
  options.target = ["es2019"];

  return options;
};
