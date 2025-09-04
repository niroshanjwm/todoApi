import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Todo } from "./entities/todo.entity";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/todo.dto";
import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm/browser";

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
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() createTodoDto: CreateTodoDto
  ): Promise<UpdateResult> {
    return this.todosService.update(id, createTodoDto);
  }

  @Delete(":id")
  delete(@Param("id") id: number): Promise<DeleteResult> {
    return this.todosService.delete(id);
  }
}
