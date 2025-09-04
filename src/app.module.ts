import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./todo/todo.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todo/entities/todo.entity";
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { UserService } from "./user/user.service";
import { User } from "./user/entities/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "test@123",
      database: "todo_db",
      entities: [Todo, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Todo, User]),
    TodoModule,
  ],
  controllers: [AppController, AuthenticationController],
  providers: [AppService, AuthenticationService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
