import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
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
    return newTask;
  }

  async update(id: number, task: Partial<Task>): Promise<void> {
    await this.tasksRepository.update(id, task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
