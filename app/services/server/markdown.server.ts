import { fetch } from "@remix-run/node";
import type { BuildOptions } from "esbuild";

import { bundleMDX } from "mdx-bundler";
import path from "path";
import type { Markdown } from "~/types/markdown";
import { getValueEnvironmentFromVariable } from "./environment.server";

const esbuildOptions = <T extends Record<string, unknown>>(
  options: BuildOptions,
  _frontmatter: T
): BuildOptions => {
  options.minify = true;
  options.target = ["es2019"];

  return options;
};

export const bundleFileMarkdown = async <T extends Record<string, unknown>>(
  filePath: string
): Promise<Markdown<T> | undefined> => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const location = getValueEnvironmentFromVariable("CONTENT_LOCATION");

  const file = await fetch(`${location}/${filePath}`);

  if (isFileMissing(file)) {
    return;
  }

  const content = await file.text();

  return await bundleMDX<T>({
    source: content,
    esbuildOptions,
  });
};

const isFileMissing = (file: Response): boolean => {
  return file.status === 404;
};
