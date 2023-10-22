import { handleRequest } from '@vercel/remix';
import { RemixServer } from '@remix-run/react';
import type { EntryContext } from '@vercel/remix';

const newLocal = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
): Promise<unknown> => {
  const remixServer = <RemixServer context={remixContext} url={request.url} />;
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer
  );
};

export default newLocal
