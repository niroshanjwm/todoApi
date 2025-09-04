import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { Todo } from "./entities/todo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationModule } from "src/authentication/authentication.module";

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthenticationModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
