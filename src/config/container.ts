import { Container } from 'inversify';
import { TasksController } from '../tasks/tasks.controller';

export const container: Container = new Container();

container.bind(TasksController).toSelf().inTransientScope();
