import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { CreateTaskDto, UpdateTaskDto } from "./dto/task.dto";

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  let repo: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [TasksController],
      providers: [
        TasksService,
        AuthGuard,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(),
            sign: jest.fn(),
          }
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch all tasks', async () => {
    const result: Task[] = [];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should fetch a single task', async () => {
    const result: Task = new Task();
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);
    expect(await controller.findOne('1')).toBe(result);
  });

  it('should create a task', async () => {
    const taskDto: CreateTaskDto = { title: 'Test task', completed: false };
    const result: Task = new Task();
    jest.spyOn(service, 'create').mockImplementation(async () => result);
    expect(await controller.create(taskDto)).toBe(result);
  });

  it('should update a task', async () => {
    const taskDto: UpdateTaskDto = { title: 'Updated task', completed: true };
    jest.spyOn(service, 'update').mockImplementation(async () => undefined);
    expect(await controller.update(1, taskDto)).toBe(undefined);
  });

  it('should remove a task', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
    expect(await controller.remove('1')).toBe(undefined);
  });
});
