import { Response, Request, NextFunction } from "express";

const asyncWrapper = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

module.exports = asyncWrapper;
