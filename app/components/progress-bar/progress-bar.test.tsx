import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProgressBar from "./progress-bar";

describe("progress-bar", () => {
  it.each<[number]>([[0], [25], [50], [75], [100]])(
    "with %s as percentage should render progress bar",
    (percentage: number) => {
      // Arrange
      const title = "Example Title";

      // Act
      render(<ProgressBar title={title} percentage={percentage} />);

      // Assert
      expect(screen.queryByTestId("progress-bar")).toHaveTextContent(title);
      expect(screen.queryByTestId("progress-bar")).toHaveTextContent(
        `${percentage}%`,
      );
      expect(screen.queryByTestId("progress-bar")).toHaveStyle(
        `width: ${percentage}%`,
      );
    },
  );

  it("with negative percentage should render 0% progress bar", () => {
    // Arrange
    const title = "Example Title";
    const percentage = -10;

    // Act
    render(<ProgressBar title={title} percentage={percentage} />);

    // Assert
    expect(screen.queryByTestId("progress-bar")).toHaveTextContent(title);
    expect(screen.queryByTestId("progress-bar")).not.toHaveTextContent(
      `${percentage}%`,
    );
    expect(screen.queryByTestId("progress-bar")).toHaveStyle(`width: 0%`);
  });

  it("with more than 100 percentage points should render 100% progress bar", () => {
    // Arrange
    const title = "Example Title";
    const percentage = 110;

    // Act
    render(<ProgressBar title={title} percentage={percentage} />);

    // Assert
    expect(screen.queryByTestId("progress-bar")).toHaveTextContent(title);
    expect(screen.queryByTestId("progress-bar")).not.toHaveTextContent(
      `${percentage}%`,
    );
    expect(screen.queryByTestId("progress-bar")).toHaveStyle(`width: 100%`);
  });
});
