export class GenericError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
