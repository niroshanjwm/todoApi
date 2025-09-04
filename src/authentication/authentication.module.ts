import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from "./authentication.service";

@Module({
  imports: [
    JwtModule.register({
      secret: "mySuperSecretKey",
      signOptions: { expiresIn: "8h" },
    }),
  ],
  providers: [AuthenticationService],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
