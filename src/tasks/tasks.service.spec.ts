import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';


describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all tasks', async () => {
    const testTask: Task[] = [new Task()];
    jest.spyOn(repo, 'find').mockResolvedValue(testTask);
    expect(await service.findAll()).toEqual(testTask);
  });

  it('should find one task', async () => {
    const testTask = new Task();
    jest.spyOn(repo, 'findOne').mockResolvedValue(testTask);
    expect(await service.findOne(1)).toEqual(testTask);
  });

  it('should create a task', async () => {
    const testTask = new Task();
    jest.spyOn(repo, 'create').mockReturnValue(testTask);
    jest.spyOn(repo, 'save').mockResolvedValue(undefined);
    expect(await service.create(testTask)).toEqual(testTask);
  });

  it('should update a task', async () => {
    const testTask = new Task();
    jest.spyOn(repo, 'update').mockResolvedValue(undefined);
    expect(await service.update(1, testTask)).toEqual(undefined);
  });

  it('should delete a task', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue(undefined);
    expect(await service.remove(1)).toEqual(undefined);
  });
});
