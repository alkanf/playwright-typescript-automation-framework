import { Locator, Page } from "@playwright/test";

export class ArticlePage {
  readonly newArticleLink: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly bodyInput: Locator;
  readonly tagsInput: Locator;
  readonly publishButton: Locator;
  readonly commentInput: Locator;
  readonly postCommentButton: Locator;
  readonly favoriteArticleButton: Locator;
  readonly unfavoriteArticleButton: Locator;

  constructor(private readonly page: Page) {
    this.newArticleLink = page.getByRole("link", {
      name: /New Article/,
    });
    this.titleInput = page.getByPlaceholder("Article Title");
    this.descriptionInput = page.getByPlaceholder(
      "What's this article about?",
    );
    this.bodyInput = page.getByPlaceholder("Write your article (in markdown)");
    this.tagsInput = page.getByPlaceholder("Enter tags");
    this.publishButton = page.getByRole("button", {
      name: "Publish Article",
      exact: true,
    });
    this.commentInput = page.getByPlaceholder("Write a comment...");
    this.postCommentButton = page.getByRole("button", {
      name: "Post Comment",
      exact: true,
    });
    this.favoriteArticleButton = page
      .getByRole("button", { name: /Article/ })
      .filter({ hasText: /Favorite Article/ })
      .filter({ hasNotText: /Unfavorite Article/ })
      .first();
    this.unfavoriteArticleButton = page
      .getByRole("button", { name: /Unfavorite Article/ })
      .first();
  }

  async openEditor(): Promise<void> {
    await this.newArticleLink.click();
    await this.page.waitForURL(/\/editor$/);
    await this.titleInput.waitFor({ state: "visible" });
  }

  async openArticle(slug: string): Promise<void> {
    await this.page.goto(`/article/${slug}`);
  }

  async createArticle(
    title: string,
    description: string,
    body: string,
    tag: string,
  ): Promise<void> {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    await this.tagsInput.fill(tag);
    await this.publishButton.click();
  }

  articleTitle(title: string): Locator {
    return this.page.getByRole("heading", { name: title, exact: true });
  }

  async addComment(comment: string): Promise<void> {
    await this.commentInput.fill(comment);
    await this.postCommentButton.click();
  }

  commentBody(comment: string): Locator {
    return this.page.getByText(comment, { exact: true });
  }

  async favorite(): Promise<void> {
    await this.favoriteArticleButton.click();
  }

  async unfavorite(): Promise<void> {
    await this.unfavoriteArticleButton.click();
  }
}
