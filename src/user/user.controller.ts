import { injectable } from 'inversify';

@injectable()
export class UserController {
  constructor() {}

  public getUser() {
    return {
      firstname: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
    };
  }
}
