export interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
    sub: number;
  };
}
