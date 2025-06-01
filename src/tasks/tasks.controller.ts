import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { UserController } from '../user/user.controller';
import { Task } from './task.schema';
import { ITask, IPartialTaskWithId } from './task.interface';
import { Document } from 'mongoose';
import { TaskService } from './tasks.service';
import { UpdateTaskProvider } from './providers/updateTask.provider';

@injectable()
export class TasksController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(TaskService) private taskService: TaskService,
    @inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider
  ) {}

  public async handlePostTasks(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> =
      await this.taskService.createTask(req.body);

    return task;
  }

  public async handleGetTasks(req: Request, res: Response) {
    const tasks = await this.taskService.findAll();
    return tasks;
  }

  public async handlePatchTasks(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ): Promise<Document> {
    try {
      return await this.updateTaskProvider.updateTask(req.body);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
