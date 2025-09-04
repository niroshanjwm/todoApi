import { Body, Controller, Get, Post } from "@nestjs/common";
import { Todo } from "./entities/todo.entity";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/todo.dto";

@Controller("todo")
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }
}
