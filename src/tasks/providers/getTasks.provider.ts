import { injectable, inject } from 'inversify';
import { TaskService } from '../tasks.service';
import { ITaskPagination } from '../interfaces/taskPagination.interface';
import { ITask } from '../task.interface';

@injectable()
export class GetTasksProvider {
  constructor(@inject(TaskService) private taskService: TaskService) {}

  public async findAllTasks(pagination: Partial<ITaskPagination>): Promise<{
    data: ITask[];
    meta: {};
  }> {
    const tasks: ITask[] = await this.taskService.findActive({
      limit: pagination.limit ?? 10,
      page: pagination.page ?? 1,
      order: pagination.order ?? 'asc',
    });

    const totalTasks = await this.taskService.countDocuments();
    const completedTasks = await this.taskService.countDocuments({
      status: 'completed',
    });
    const todoTasks = await this.taskService.countDocuments({
      status: 'todo',
    });
    const inProgressTasks = await this.taskService.countDocuments({
      status: 'inProgress',
    });

    return {
      data: tasks,
      meta: {
        totalTasks,
        completedTasks,
        todoTasks,
        inProgressTasks,
      },
    };
  }
}
