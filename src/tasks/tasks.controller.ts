import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { UserController } from '../user/user.controller';
import { Task } from './task.schema';
import { ITask } from './task.interface';
import { Document } from 'mongoose';

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  public async handlePostTasks(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> = new Task(req.body);

    await task.save();

    return task;
  }

  public async handleGetTasks(req: Request, res: Response) {
    const tasks = await Task.find();
    return tasks;
  }

  public handlePatchTasks() {
    return {
      title: 'This is a title',
      description: 'Task description',
    };
  }
}
