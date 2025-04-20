export class UrlAlreadySavedError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
