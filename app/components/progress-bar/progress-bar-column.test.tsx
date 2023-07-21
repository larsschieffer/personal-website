import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProgressBarColumn from "./progress-bar-column";

describe("progress-bar-column", () => {
  it("should render progress bars", () => {
    // Arrange
    const title = "Example Title";
    const percentage = 42;
    const progressBarProps = {
      title,
      percentage,
    };

    const headline = "Progress Bar Headline";

    // Act
    render(
      <ProgressBarColumn
        headline={headline}
        progressBarItems={[progressBarProps, progressBarProps]}
      />,
    );

    // Assert
    expect(screen.queryByTestId("progress-bar-column")).toHaveTextContent(
      headline,
    );
    expect(screen.queryAllByTestId("progress-bar")).toHaveLength(2);
  });
});
