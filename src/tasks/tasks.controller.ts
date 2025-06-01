import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { UserController } from '../user/user.controller';
import { Task } from './task.schema';
import { ITask, IPartialTaskWithId } from './task.interface';
import { Document } from 'mongoose';
import { TaskService } from './tasks.service';
import { UpdateTaskProvider } from './providers/updateTask.provider';
import { GetTasksProvider } from './providers/getTasks.provider';
import { matchedData } from 'express-validator';
import { ITaskPagination } from './interfaces/taskPagination.interface';

@injectable()
export class TasksController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(TaskService) private taskService: TaskService,
    @inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider,
    @inject(GetTasksProvider) private getTasksProvider: GetTasksProvider
  ) {}

  public async handleGetTasks(req: Request, res: Response) {
    const validatedData: Partial<ITaskPagination> = matchedData(req);
    try {
      const tasks: { data: ITask[]; meta: {} } =
        await this.getTasksProvider.findAllTasks(validatedData);
      return tasks;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async handlePostTasks(req: Request<{}, {}, ITask>, res: Response) {
    const validatedData: ITask = matchedData(req);

    try {
      return await this.taskService.createTask(validatedData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async handlePatchTasks(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ): Promise<Document> {
    const validatedData: IPartialTaskWithId = matchedData(req);

    try {
      return await this.updateTaskProvider.updateTask(validatedData);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
