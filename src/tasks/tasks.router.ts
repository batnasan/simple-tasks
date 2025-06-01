import { Router, Request, Response } from 'express';
import { TasksController } from './tasks.controller';
import { injectable, inject } from 'inversify';

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
    this.router.get('/', (req: Request, res: Response) => {
      const newTask = this.tasksController.handleGetTasks();
      res.json(newTask);
    });
    this.router.post('/create', (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePostTasks();
      res.json(newTask);
    });
    this.router.patch('/update', (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePatchTasks();
      res.json(newTask);
    });
  }
}
