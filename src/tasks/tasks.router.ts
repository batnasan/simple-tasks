import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { TasksController } from './tasks.controller';
import { injectable, inject } from 'inversify';
import { ITask, IPartialTaskWithId } from './task.interface';
import { createTaskValidator } from './validators/createTask.validator';

@injectable()
export class TasksRouter {
  public router: Router;

  constructor(
    @inject(TasksController) private tasksController: TasksController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', async (req: Request, res: Response) => {
      const allTasks = await this.tasksController.handleGetTasks(req, res);
      res.json(allTasks);
    });
    this.router.post(
      '/create',
      createTaskValidator,
      async (req: Request<{}, {}, ITask>, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const newTask = await this.tasksController.handlePostTasks(req, res);
          res.json(newTask);
        } else {
          res.json(result.array());
        }
      }
    );
    this.router.patch(
      '/update',
      async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
        const updatedTask = await this.tasksController.handlePatchTasks(
          req,
          res
        );
        res.json(updatedTask);
      }
    );
  }
}
