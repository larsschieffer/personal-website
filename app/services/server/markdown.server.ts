import { fetch } from "@remix-run/node";
import type { BuildOptions } from "esbuild";

import { bundleMDX } from "mdx-bundler";
import path from "path";
import invariant from "tiny-invariant";
import type { Markdown } from "~/types/markdown";

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
): Promise<Markdown<T>> => {
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

  const location = process.env.CONTENT_LOCATION;
  invariant(location, "Environment variable CONTENT_LOCATION is missing");

  const file = await fetch(`${location}/${filePath}`);
  const content = await file.text();

  return await bundleMDX<T>({
    source: content,
    esbuildOptions,
  });
};
