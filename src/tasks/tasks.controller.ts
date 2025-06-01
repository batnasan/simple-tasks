import { injectable, inject } from 'inversify';
import { UserController } from '../user/user.controller';

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  public handlePostTasks() {
    return {
      title: 'This is a title',
      description: 'Task description',
    };
  }

  public handleGetTasks() {
    return [
      {
        title: 'This is a title',
        description: 'Task description',
      },
    ];
  }

  public handlePatchTasks() {
    return {
      title: 'This is a title',
      description: 'Task description',
    };
  }
}
