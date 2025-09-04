import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException("Missing authorization header");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Invalid authorization format");
    }

    try {
      const payload = await this.jwtService.verifyAsync<{
        username: string;
        sub: number;
      }>(token);
      request.user = payload;
      return true;
    } catch (err) {
      const message = (err as Error).message || "Invalid or expired token";
      throw new UnauthorizedException(message);
    }
  }
}
