import { Locator, Page } from "@playwright/test";

export class SettingsPage {
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly bioInput: Locator;
  readonly passwordInput: Locator;
  readonly updateSettingsButton: Locator;
  readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByPlaceholder("Username");
    this.emailInput = page.getByPlaceholder("Email");
    this.bioInput = page.getByPlaceholder("Short bio about you");
    this.passwordInput = page.getByPlaceholder("New Password");
    this.updateSettingsButton = page.getByRole("button", {
      name: "Update Settings",
      exact: true,
    });
    this.logoutButton = page.getByRole("button", {
      name: "Or click here to logout.",
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.page.goto("/settings");
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async updateUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.updateSettingsButton.click();
  }
}
