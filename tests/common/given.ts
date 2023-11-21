import type { ServerRuntimeMetaArgs } from "@remix-run/server-runtime";

import type { Location, Params } from "@remix-run/router";
import type { FileMetaData } from "~/types/file";
export interface TestCaseFor<T extends (...args: never) => unknown> {
  parameters: Parameters<T>;
  expectedReturn: ReturnType<T>;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Given {
  public static date(): Date {
    return new Date(new Date(1996, 11, 6));
  }

  public static serverRuntimeMetaArgs(): ServerRuntimeMetaArgs<unknown, never> {
    const data = undefined;
    const params: Params = {};
    const location: Location = {
      state: undefined,
      key: "",
      pathname: "",
      search: "",
      hash: "",
    };
    const matches: never[] = [];

    return {
      data,
      params,
      location,
      matches,
    };
  }

  public static sameOfNotExistingMarkdownFile(): string {
    return "not-existing.mdx";
  }

  public static slug(): string {
    return "example";
  }

  public static nameOfMarkdownFile(): string {
    return `${Given.slug()}.mdx`;
  }

  public static contentPath(): string {
    return "example";
  }

  public static fileMetaDataPath(): string {
    return `${Given.contentPath()}/${Given.nameOfMarkdownFile()}`;
  }

  public static fileMetaData(): FileMetaData {
    return {
      path: Given.fileMetaDataPath(),
      sha: "a1d99928-5bfd-4f0c-bf61-27496d97ea4e",
      name: Given.slug(),
    };
  }

  public static id(): number {
    return 42;
  }
}
