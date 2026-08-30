import { Locator, Page } from "@playwright/test";

export class RegistrationPage {
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.signUpButton = page.getByRole("button", { name: "Sign up" });
  }

  async open(): Promise<void> {
    await this.page.goto("/register");
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signUpButton.click();
  }
}
