import { injectable } from 'inversify';
import { Model, FilterQuery } from 'mongoose';
import { Task } from './task.schema';
import { ITask } from './task.interface';
import { ITaskPagination } from './interfaces/taskPagination.interface';

@injectable()
export class TaskService {
  private taskModel: Model<ITask> = Task;

  public async createTask(taskData: ITask) {
    return await new this.taskModel(taskData).save();
  }

  public async findById(_id: string) {
    return await this.taskModel.findById(_id);
  }

  public async findActive(pageination: ITaskPagination) {
    return await this.taskModel
      .find({
        status: { $in: ['todo', 'inProgress'] },
      })
      .limit(pageination.limit)
      .skip(pageination.page - 1)
      .sort({
        createdAt: pageination.order === 'asc' ? 1 : -1,
      });
  }

  public async findAll(pageination: ITaskPagination) {
    return await this.taskModel
      .find()
      .limit(pageination.limit)
      .skip(pageination.page - 1)
      .sort({
        createdAt: pageination.order === 'asc' ? 1 : -1,
      });
  }

  public async countDocuments(filter?: FilterQuery<ITask>) {
    return await this.taskModel.countDocuments(filter);
  }
}
