export interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
    sub: number;
  };
}

export type AuthorizedPayload = {
  username: string;
  sub: number;
};
