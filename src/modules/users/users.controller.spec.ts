import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controllers';
import { UserService } from './users.services';

describe('UserController', () => {
    let usrsController: UserController;
    let usrsService: UserService;

    const mocukUsersService = {};
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService],
      })
      .overrideProvider(UserService)
      .useClass(mocukUsersService)
      .compile();
      
      usrsService = app.get<UserService>(UserService);
      usrsController = app.get<UserController>(UserController);
    });
  
    describe('root', () => {
      it('should return "Hello World!"', async () => {
        const result = ['users']
        console.log(result)
        jest.spyOn(usrsService, 'findAll').mockImplementation
        expect(usrsController.findAll()).toBe(result);
      });
    });
  });
  
