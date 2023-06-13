/* eslint-disable vitest/require-top-level-describe */
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../common/mock-api";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
