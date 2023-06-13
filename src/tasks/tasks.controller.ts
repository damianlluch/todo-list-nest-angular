import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(Number(id));
  }

  @Post()
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Partial<Task>): Promise<void> {
    return this.tasksService.update(Number(id), task);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(Number(id));
  }
}
