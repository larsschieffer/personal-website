import { fetch } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
import path from "path";

export async function bundleFileMarkdown(filePath: string) {
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

  const file = await fetch(`${location}/en/${filePath}`);
  const content = await file.text();

  return await bundleMDX({
    source: content,
    cwd: "/Users/lars/Projects/personal-website/app/components",
  });
}
