import { LinkDescriptor } from "@remix-run/server-runtime";
import { describe, expect, it, beforeEach, vi } from "vitest";
import App, { links } from "./root";
import { screen, waitFor } from "tests/common/test-utils";
import { render } from "@testing-library/react";
import { RemixStubProps, createRemixStub } from "@remix-run/testing";
import { JSX } from "react/jsx-runtime";

describe('root', () => {

  beforeEach(() => {
    // Hide warning of "wrong" render on html - Element, bc <App /> is rendered in <div>
    vi.spyOn(console, 'error').mockImplementation(() => { });
  });

  describe('links', () => {
    it('should contain stylesheets ', () => {
      // Act
      const actual = links();

      // Assert
      actual.forEach((descriptor: LinkDescriptor) =>
        expect(descriptor).contain({ rel: "stylesheet" })
      )
    })
  })

  describe('app', () => {
    let ComponentStub: (props: RemixStubProps) => JSX.Element;

    beforeEach(() => {
      ComponentStub = createRemixStub([
        {
          path: "/",
          Component: App,
        },
      ]);

    })

    it('should render', async () => {
      // Act
      render(<ComponentStub />);

      // Assert
      await waitFor(async () => {
        const actual = await screen.findByTestId('app');
        expect(actual).toBeInTheDocument()
      })
    })
  })
})
