import type {
  MockedResponse,
  ResponseComposition,
  RestContext,
  RestRequest,
} from "msw";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Given } from "./given";

const server = setupServer(
  rest.post(
    `*/issues`,
    async (
      req: RestRequest,
      res: ResponseComposition,
      ctx: RestContext
    ): Promise<MockedResponse> => {
      const { title } = await req.json<{ title: string }>();
      return res(ctx.status(201), ctx.json({ title }));
    }
  ),

  rest.get(
    new RegExp(`${Given.contentPath()}$`),
    async (
      _req: RestRequest,
      res: ResponseComposition,
      ctx: RestContext
    ): Promise<MockedResponse> => {
      return res(ctx.json([Given.fileMetaData()]));
    }
  ),

  rest.get(
    new RegExp(`${Given.nameOfMarkdownFile()}`),
    async (
      _req: RestRequest,
      res: ResponseComposition,
      ctx: RestContext
    ): Promise<MockedResponse> => {
      return res(ctx.text("# Hello World"));
    }
  ),

  rest.get(
    new RegExp(`${Given.sameOfNotExistingMarkdownFile()}`),
    async (
      _req: RestRequest,
      res: ResponseComposition,
      ctx: RestContext
    ): Promise<MockedResponse> => {
      return res(ctx.status(404));
    }
  )
);
export { rest, server };
