import {
  Body,
  Controller,
  Post,
  NotFoundException,
  UnauthorizedException,
  Get,
  UseGuards,
} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateAuthDto } from "./dto/auth.dto";
import { UserService } from "src/user/user.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { CurrentUser } from "./current-user.decorator";
import { type AuthorizedPayload } from "src/types/request";

@Controller("authentication")
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService
  ) {}

  @Post("login")
  async login(@Body() createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    const user = await this.userService.getUser(username);
    if (!user) {
      throw new NotFoundException(`${username} not available`);
    }
    const passwordValid = await this.authenticationService.validPassword(
      password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException(`Invalid username or password`);
    }
    return this.authenticationService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@CurrentUser() user: AuthorizedPayload) {
    if (!user) {
      throw new UnauthorizedException("User not found in request");
    }
    return { username: user.username };
  }
}
