import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthenticationService {
  login(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }
}
