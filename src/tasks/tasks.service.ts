import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { WebsocketGateway } from './websocket.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id: id } });
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    await this.tasksRepository.save(newTask);

    const payload = {
      event: 'created',
      id: newTask.id,
    };
    this.websocketGateway.server.emit('task', payload);

    return newTask;
  }

  async update(id: number, task: Partial<Task>): Promise<void> {
    await this.tasksRepository.update(id, task);

    const payload = {
      event: 'updated',
      id: id,
    };
    this.websocketGateway.server.emit('task', payload);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);

    const payload = {
      event: 'deleted',
      id: id,
    };
    this.websocketGateway.server.emit('task', payload);
  }
}
