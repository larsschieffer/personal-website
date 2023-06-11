import * as build from "@remix-run/dev/server-build";
import { installGlobals } from "@remix-run/node";
import { createRequestHandler } from "@remix-run/vercel";

// eslint-disable-next-line vitest/require-hook
installGlobals();

export default createRequestHandler({ build, mode: process.env.NODE_ENV });
