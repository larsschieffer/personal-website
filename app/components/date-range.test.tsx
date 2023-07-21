import { render, screen } from "@testing-library/react";
import flatten from "flat";
import { IntlProvider } from "react-intl";
import { Given } from "tests/common/given";
import { beforeEach, describe, expect, it } from "vitest";
import messages from "../../public/assets/i18n/en.json";
import DateRange from "./date-range";

describe("date-range", () => {
  let start: Date;
  let end: Date;

  beforeEach(() => {
    start = Given.date();
    end = new Date(Given.date().setMonth(start.getMonth() + 1));
  });

  it("with different dates should show both representations", () => {
    // Arrange
    const expected = /^Dec 1996 - Jan 1997$/;

    // Act
    render(
      <IntlProvider locale="en" defaultLocale="en">
        <DateRange start={start.toISOString()} end={end.toISOString()} />
      </IntlProvider>,
    );

    // Assert
    expect(screen.queryByTestId("date-range")).toHaveTextContent(expected);
  });
  it("with same date should show only single representation", () => {
    // Arrange
    const expected = /^Dec 1996$/;

    // Act
    render(
      <IntlProvider locale="en" defaultLocale="en">
        <DateRange start={start.toISOString()} end={start.toISOString()} />
      </IntlProvider>,
    );

    // Assert
    expect(screen.queryByTestId("date-range")).toHaveTextContent(expected);
  });

  it("without end date should say until present", () => {
    // Arrange
    const expected = /^Dec 1996 - Present$/;

    // Act
    render(
      <IntlProvider locale="en" defaultLocale="en" messages={flatten(messages)}>
        <DateRange start={start.toISOString()} end={null} />
      </IntlProvider>,
    );

    // Assert
    expect(screen.queryByTestId("date-range")).toHaveTextContent(expected);
  });
});
