import type { V2_ServerRuntimeMetaArgs } from "@remix-run/server-runtime";

import type { Location, Params } from "@remix-run/router";
export interface TestCaseFor<T extends (...args: never) => unknown> {
  parameters: Parameters<T>;
  expectedReturn: ReturnType<T>;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Given {
  public static getDate(): Date {
    return new Date(new Date(1996, 11, 6));
  }

  public static getServerRuntimeMetaArgs(): V2_ServerRuntimeMetaArgs {
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
}
