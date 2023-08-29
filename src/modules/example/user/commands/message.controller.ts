import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserHttpController } from './create-user/create-user.http.controller';

type API = 'create_user';

@Controller()
export class MessageController {
  constructor(private createUser: CreateUserHttpController) {}

  @MessagePattern('TEST_QUEUE')
  async W2DB_SWAP(message: { api: API } & any): Promise<any> {
    switch (message.api) {
      case 'create_user':
        return this.createUser.create(message);
    }
  }
}
