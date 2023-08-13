class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: any;

  constructor(name: string, httpCode: any, messsage: string) {
    super(messsage);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}
