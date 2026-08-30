import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly credentialsError: Locator;
  readonly yourFeedLink: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.credentialsError = page.getByText("credentials invalid", {
      exact: true,
    });
    this.yourFeedLink = page.getByRole("link", {
      name: "Your Feed",
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}