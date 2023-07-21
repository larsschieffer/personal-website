import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Toast from "./toast";

describe("toast", () => {
  it("should create component", () => {
    render(
      <div data-testid="toast">
        <Toast />
      </div>,
    );

    expect(screen.queryByTestId("toast")?.firstChild).toHaveClass("Toastify");
  });
});
