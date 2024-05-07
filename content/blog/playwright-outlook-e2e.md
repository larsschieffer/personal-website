---
title: "E2E Test Setup For Outlook Add-ins"
published: 2023-11-19
summary:
  A small POC how to set up your E2E tests to check the behaviour of your
  Microsoft Outlook add-in.
thumbnail: /blog/thumbnails/person-next-to-computer.webp
---

## The Challenge

Fully automated tests, which you can add to your build pipeline, are very
valuable for creating robust applications. From unit, integration until to fully
E2E tests, every step has its benefits and tradeoffs. All tests try to minimize
the manual testing effort. This post concentrates to the latest stage of
automated testing, the End-To-End tests. In general, you need to spin up your
application with a development server and afterward access it with a tool like
[Playwright](https://playwright.dev/). But imagine your application isn't a
standalone web application, instead it is a so-called
[Office Add-in](https://learn.microsoft.com/en-us/office/dev/add-ins/overview/office-add-ins).
This means that your application operates in the Office context, so that the E2E
tests should run with the Office context available. For example, if you are
creating an Add-in for Outlook, your E2E tests should at least work with the web
client of Outlook. Therefore, the following challenges occur.

- Need of test user
- Perform authentication (login) with test user
- Navigate & Interact with Microsoft Outlook

## The Setup

### Test User

You need a real test user account, to perform valid user interactions with your
Outlook Add-in. Furthermore, this facilitates your setup process because you can
install the Outlook add-in manually and use it later with Playwright. To prevent
some headaches around the login process and with the
[KISS principle](https://en.wikipedia.org/wiki/KISS_principle) in mind, your
test user account should not have any 2FA security mechanism active.

### Source Code

All the following code snippets originate from the dependent
[GitHub repository](https://github.com/larsschieffer/outlook-playwright-e2e). If
you are familiar with Playwright and only want a quick answer, you can skip the
following section and access the code directly. If you like more context, stay
with me.

### Installation

I used [pnpm](https://pnpm.io/) as package manager during development, but npm
should work, too.

```shell
pnpm install
```

### Add Test User

Playwright needs to authenticate with valid credentials against Azure's OAuth
servers. You have to provide the credentials of your test user in an `.env` file
in the root directory. The following content is required.

```BASIC
USERNAME='your-outlook-email'
PASSWORD='your-outlook-password'
```

### Authentication

Foremost, the authentication process uses the example authentication process
from the [Playwright Docs](https://playwright.dev/docs/auth). You don't control
Microsoft's authentication process, so that this part could quickly change in
the future. Even IDs or test IDs aren't required to stay the same. Therefore,
the authentication process is more explicit than you write E2E tests normally,
so that it can be adjusted easily. At the time of writing, the following code
snippet contains all changes to the `setup` function in the `auth.setup.ts`
file.

```ts
setup("authenticate", async ({ page, context }) => {
  const username = process.env.USERNAME;
  if (!username) {
    console.error("Username is missing. See README.md how to set value");
    return;
  }

  const password = process.env.PASSWORD;
  if (!password) {
    console.error("Password is missing. See README.md how to set value");
    return;
  }

  // Go to login page
  await page.goto("https://outlook.live.com/");

  // Go to sign in
  const [loginPage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByLabel("Sign in about Microsoft").click(),
  ]);

  // Bring focus to the new page
  await loginPage.bringToFront();

  // Fill username
  await loginPage.getByPlaceholder("Email, phone, or Skype").fill(username);
  await loginPage.getByRole("button", { name: "Next" }).click();

  // Insert password
  await loginPage.getByPlaceholder("Password").fill(password);
  await loginPage.getByRole("button", { name: "Sign in" }).click();

  // Answer "Stay signed in?"
  await loginPage.getByRole("button", { name: "No" }).click();

  await loginPage.context().storageState({ path: authFile });
});
```

The login process starts with unauthenticated access to
[https://outlook.live.com/](https://outlook.live.com/).

```ts
// Go to login page
await page.goto("https://outlook.live.com/");
```

![Microsoft Landing Page](/blog/playwright-outlook-e2e/Outlook_Sign_In.webp)

This leads to an automatically forward to
[https://www.microsoft.com/](https://www.microsoft.com/). Here, you tell
Playwright to click on the "Sign in" - Button. But there is a catch. The login
page is opened in a new browser tab. Therefore, the focus has to be changed,
which is achieved as follows.

```ts
// Go to sign in
const [loginPage] = await Promise.all([
  context.waitForEvent("page"),
  page.getByLabel("Sign in about Microsoft").click(),
]);

// Bring focus to the new page
await loginPage.bringToFront();
```

![Azure Authentication Wizard E-Mail Step](/blog/playwright-outlook-e2e/Enter_EMail.webp)

Playwright can easily fill the required fields for your username (the mail of
the test user) and the dependent password and handle the login wizard of Azure's
OAuth2.

```ts
// Fill username
await loginPage.getByPlaceholder("Email, phone, or Skype").fill(username);
await loginPage.getByRole("button", { name: "Next" }).click();
```

![Azure Authentication Wizard Password Step](/blog/playwright-outlook-e2e/Enter_Password.webp)

```ts
// Insert password
await loginPage.getByPlaceholder("Password").fill(password);
await loginPage.getByRole("button", { name: "Sign in" }).click();
```

![Azure Authentication Sty Signed In Step](/blog/playwright-outlook-e2e/Stay_Signed_In.webp)

```ts
// Answer "Stay signed in?"
await loginPage.getByRole("button", { name: "No" }).click();
```

Finally, we can store the cookies and local storage to disk. This allows
Playwright to load the current state for all test cases, so that the initial
authentication only has to be executed once for the complete test run.

```ts
await loginPage.context().storageState({ path: authFile });
```

### Access Outlook

Finally, you can start with the first test. It only accesses
[https://outlook.live.com/](https://outlook.live.com/). Remember, if the
authentication didn't work, Playwright would end up at
[https://www.microsoft.com/](https://www.microsoft.com/) (like the
authentication flow). Therefore, regarding that the authentication works, the
test waits until the browser ends up at a URL which starts with
`https://outlook.live.com/mail/` and expects the Outlook Symbol in the left
upper corner to be visible.

```ts
test("should access outlook", async ({ page }) => {
  await page.goto("https://outlook.live.com/");

  await page.waitForURL(new RegExp("^https://outlook.live.com/mail/"));

  expect(page.getByLabel("Go to Outlook")).toBeDefined();
});
```

### Run Your E2E Tests

If you are using pnpm you can use the following shell command to run your E2E
tests. The source code in the
[GitHub repository](https://github.com/larsschieffer/outlook-playwright-e2e)
contains an additional test, which also accesses the calendar view, such that 3
tests are run (authentication flow + 2 tests).

```shell
$ pnpm exec playwright test --project='chromium'
Running 3 tests using 2 workers
  3 passed (11.9s)

To open last HTML report run:

  pnpm exec playwright show-report
```

## Conclusion

Congratulations! Now everything is ready to test your own Outlook Add-in. The
only thing left is to install your Add-in in the test user account. Afterward,
your E2E tests will authenticate as a "real" user, access Outlook and perform
interactions to verify your desired behavior.
