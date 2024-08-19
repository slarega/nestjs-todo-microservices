import { Controller, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger";
import {ProjectRmqTasksService} from './project-rmq-tasks.service';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { UpdateTaskColumnDto } from "./dto/update-task-column.dto";
import { UpdateTaskColumn } from "./entities/update-task-column.entity";
import { JwtAuthGuard } from "../auth-rmq/auth-jwt.guard";
import { ProjectTask } from "./entities/project-task.entity";
import { Request } from "express";

@Controller('project')
@ApiTags('Проекты 3 - задачи')
@ApiSecurity('x-bearer-token')
@UseGuards(JwtAuthGuard)
export class ProjectRmqTasksController {
  constructor(
      private readonly projectTasksService: ProjectRmqTasksService
  ) {}

  @Post(':id/task')
  @ApiOperation({ summary: 'Создать задачу проекта по id / Create a project task by id' })
  @ApiOkResponse({ type: ProjectTask })
  async create(
      @Req() req: Request,
      @Param('id') id: string,
      @Body() createProjectTaskDto: CreateProjectTaskDto) {
        return this.projectTasksService.create(
            {
              projId: +id,
              createProjectTaskDto: createProjectTaskDto
            }
        )
      }

  @Patch(':id/tasks/:tid')
  @ApiOperation({ summary: 'Обновить задачу tid - проекта id / Update task tid - project id' })
  @ApiOkResponse({ type: ProjectTask })
  async update(
      @Param('id') id: string,
      @Param('tid') tid: string,
      @Body() updateProjectTaskDto: UpdateProjectTaskDto) {
        return this.projectTasksService.update(
            {
              projId: +id,
              taskId: +tid,
              updateProjectTaskDto: updateProjectTaskDto
            }
        )
      }

  @Patch(':id/column/:cid')
  @ApiOperation({ summary: 'Изменить столбец задачи / Change task column' })
  @ApiOkResponse({ type: UpdateTaskColumn})
  async changeTaskColumn(
      @Param('id') id: string,
      @Param('cid') cid: string,
      @Body() updateTaskColumn: UpdateTaskColumnDto) {
        return this.projectTasksService.changeTaskColumn(
            {
              projId: +id,
              colId: +cid,
              updateTaskColumn: updateTaskColumn
            }
        )
      }

  @Delete('/task/:tid')
  @ApiOperation({ summary: 'Удалить задачу по tid / Delete task by tid' })
  async remove(@Param('tid') tid: string) {
      return this.projectTasksService.remove(
          { taskId: +tid }
      )
  }
}
