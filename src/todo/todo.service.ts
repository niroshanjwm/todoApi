import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreateTodoDto } from "./dto/todo.dto";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findById(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  findAll(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({
      where: { userId },
      order: { id: "ASC" },
    });
  }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(newTodo);
  }

  update(id: number, createTodoDto: CreateTodoDto): Promise<UpdateResult> {
    return this.todoRepository.update(
      { id, userId: createTodoDto.userId },
      createTodoDto,
    );
  }

  delete(id: number, userId: number): Promise<DeleteResult> {
    return this.todoRepository.delete({ id, userId });
  }
}
