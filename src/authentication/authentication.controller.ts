import { Body, Controller, Post, NotFoundException } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateAuthDto } from "./dto/auth.dto";
import { UserService } from "src/user/user.service";

@Controller("authentication")
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Post("login")
  async login(@Body() createAuthDto: CreateAuthDto) {
    const username = createAuthDto.username;
    const user = await this.userService.getUser(username);

    if (!user) {
      throw new NotFoundException(`${username} not available`);
    }

    return this.authenticationService.login(user);
  }
}
