import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      username: string;
      sub: number;
      [key: string]: any;
    };
  }
}
