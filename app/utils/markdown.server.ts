import { fetch } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import invariant from "tiny-invariant";

export async function bundleFileMarkdown<T extends Record<string, unknown>>(
  filePath: string
) {
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
    cwd: "/Users/lars/Projects/personal-website/app/components",
  });
}
