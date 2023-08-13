class BaseError extends Error {
  public readonly name: string;
  public readonly statusCode: any;

  constructor(name: string, statusCode: any, messsage: string) {
    super(messsage);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}
