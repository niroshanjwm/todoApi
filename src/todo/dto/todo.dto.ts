export class CreateTodoDto {
  todo: string;
  completed: boolean = false;
  userId: number = 266; // hardcoded id
}
