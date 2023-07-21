import type { ServerRuntimeMetaArgs } from "@remix-run/server-runtime";

import type { Location, Params } from "@remix-run/router";
import type { FileMetaData } from "~/types/file";
import { Markdown } from "~/types/markdown";
export interface TestCaseFor<T extends (...args: never) => unknown> {
  parameters: Parameters<T>;
  expectedReturn: ReturnType<T>;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Given {
  public static date(): Date {
    return new Date(new Date(1996, 11, 6));
  }

  public static serverRuntimeMetaArgs(): ServerRuntimeMetaArgs<
    unknown,
    never
  > {
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

  public static bundledMDX(): Markdown<Record<string, string>> {

    return {
      code: 'var Component=(()=>{var x=Object.create;var c=Object.defineProperty;var j=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var _=Object.getPrototypeOf,d=Object.prototype.hasOwnProperty;var f=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),l=(n,t)=>{for(var e in t)c(n,e,{get:t[e],enumerable:!0})},i=(n,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of p(t))!d.call(n,o)&&o!==e&&c(n,o,{get:()=>t[o],enumerable:!(s=j(t,o))||s.enumerable});return n};var C=(n,t,e)=>(e=n!=null?x(_(n)):{},i(t||!n||!n.__esModule?c(e,"default",{value:n,enumerable:!0}):e,n)),M=n=>i(c({},"__esModule",{value:!0}),n);var u=f((O,a)=>{a.exports=_jsx_runtime});var h={};l(h,{default:()=>g});var r=C(u());function m(n){let t=Object.assign({p:"p"},n.components);return(0,r.jsx)(t.p,{children:"Content"})}function b(n={}){let{wrapper:t}=n.components||{};return t?(0,r.jsx)(t,Object.assign({},n,{children:(0,r.jsx)(m,n)})):m(n)}var g=b;return M(h);})();\n' +
        ';return Component;',
      frontmatter: {},
      errors: [],
      matter: { content: 'Content', data: {}, excerpt: '', orig: '', language: '', matter: '', stringify: (lang: string) => JSON.stringify(lang) },
    }
  }
}
