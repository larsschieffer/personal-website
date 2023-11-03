import { HttpResponse, http, PathParams } from "msw";
import { setupServer } from "msw/node";
import { Given } from "./given";
import { ResponseResolverInfo } from "msw/lib/core/handlers/RequestHandler";
import { HttpRequestResolverExtras } from "msw/lib/core/handlers/HttpHandler";

const server = setupServer(
  http.post(
    `*/issues`,
    async ({ request }: ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, { title: string }>): Promise<HttpResponse> => {
      const { title } = await request.json();

      return HttpResponse.json({ title }, { status: 201 });
    },
  ),

  http.get(
    new RegExp(`${Given.contentPath()}$`),
    (): HttpResponse => HttpResponse.json([Given.fileMetaData()]),
  ),

  http.get(
    new RegExp(`${Given.nameOfMarkdownFile()}`),
    (): HttpResponse => HttpResponse.text("# Hello World"),
  ),

  http.get(
    new RegExp(`${Given.sameOfNotExistingMarkdownFile()}`),
    (): HttpResponse => new HttpResponse(null, {
      status: 404,
    }),
  ),
);
export { http, server };
