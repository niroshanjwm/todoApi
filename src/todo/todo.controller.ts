import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Todo } from "./entities/todo.entity";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/todo.dto";
import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm/browser";
import { JwtAuthGuard } from "src/authentication/jwt-auth.guard";
import { CurrentUser } from "src/authentication/current-user.decorator";
import { type AuthorizedPayload } from "src/types/request";

@UseGuards(JwtAuthGuard)
@Controller("todo")
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Todo> {
    const todo = await this.todosService.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  @Get()
  findAll(@CurrentUser() user: AuthorizedPayload): Promise<Todo[]> {
    return this.todosService.findAll(user.sub);
  }

  @Post()
  create(
    @CurrentUser() user: AuthorizedPayload,
    @Body() createTodoDto: CreateTodoDto
  ): Promise<Todo> {
    return this.todosService.create({ ...createTodoDto, userId: user.sub });
  }

  @Patch(":id")
  update(
    @CurrentUser() user: AuthorizedPayload,
    @Param("id") id: number,
    @Body() createTodoDto: CreateTodoDto
  ): Promise<UpdateResult> {
    return this.todosService.update(id, { ...createTodoDto, userId: user.sub });
  }

  @Delete(":id")
  delete(
    @CurrentUser() user: AuthorizedPayload,
    @Param("id") id: number
  ): Promise<DeleteResult> {
    return this.todosService.delete(id, user.sub);
  }
}
