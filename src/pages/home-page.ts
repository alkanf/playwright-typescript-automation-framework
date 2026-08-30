import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly yourFeedLink: Locator;
  readonly signInLink: Locator;

  constructor(private readonly page: Page) {
    this.yourFeedLink = page.getByRole("link", {
      name: "Your Feed",
      exact: true,
    });
    this.signInLink = page.getByRole("link", {
      name: "Sign in",
      exact: true,
    });
  }
}
