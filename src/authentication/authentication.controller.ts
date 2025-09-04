import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateAuthDto } from "./dto/auth.dto";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("login")
  login(@Body() createAuthDto: CreateAuthDto): any {
    return this.authenticationService.login(createAuthDto);
  }
}
