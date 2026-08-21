import { Locator, Page } from "@playwright/test";

export class ProfilePage {
  readonly followButton: Locator;
  readonly unfollowButton: Locator;
  readonly usernameHeading: Locator;

  constructor(private readonly page: Page) {
    this.followButton = page.getByRole("button", {
      name: /Follow johndoe/,
      exact: false,
    });
    this.unfollowButton = page.getByRole("button", {
      name: /Unfollow johndoe/,
      exact: false,
    });
    this.usernameHeading = page.getByRole("heading", {
      name: "johndoe",
      exact: true,
    });
  }

  async open(username: string): Promise<void> {
    await this.page.goto(`/profile/${username}`);
  }

  async follow(): Promise<void> {
    await this.followButton.click();
  }

  async unfollow(): Promise<void> {
    await this.unfollowButton.click();
  }
}
