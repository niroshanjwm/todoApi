export class CreateTodoDto {
  todo: string;
  completed: boolean = false;
  userId: number;
}
