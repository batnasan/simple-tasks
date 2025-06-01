import { Container } from 'inversify';
import { TasksController } from '../tasks/tasks.controller';
import { TasksRouter } from '../tasks/tasks.router';

export const container: Container = new Container();

container.bind(TasksController).toSelf().inTransientScope();
container.bind(TasksRouter).toSelf().inTransientScope();
