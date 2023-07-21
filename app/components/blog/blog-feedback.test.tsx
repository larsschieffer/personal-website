import { render, screen } from "tests/common/test-utils";
import { describe, expect, it } from "vitest";
import BlogFeedback from "./blog-feedback";
import { Given } from "tests/common/given";

describe("blog-feedback", () => {
  it("should render content", async () => {
    // Arrange
    const mdx = Given.bundledMDX();
    const text = mdx.matter.content;

    // Act
    render(<BlogFeedback content={mdx.code} />);

    // Assert
    const feedback = await screen.findByTestId("feedback");
    expect(feedback).toHaveTextContent(text);
  });
});
