import { Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateProjectTaskDto} from "./dto/create-project-task.dto";
import {firstValueFrom} from "rxjs";
import {UpdateProjectTaskDto} from "./dto/update-project-task.dto";
import {UpdateTaskColumnDto} from "./dto/update-task-column.dto";

@Injectable()
export class ProjectRmqTasksService {
  constructor(@Inject('project-service') private readonly client: ClientProxy) {}

  async create(data: {
    projId: number,
    createProjectTaskDto: CreateProjectTaskDto
  }) {
    const ob$ = this.client.send({cmd: 'project-task-create'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async update(data: {
    projId: number,
    taskId: number,
    updateProjectTaskDto: UpdateProjectTaskDto
  }) {
    const ob$ = this.client.send({cmd: 'project-task-update'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async changeTaskColumn(data: {
    projId: number,
    colId: number,
    updateTaskColumn: UpdateTaskColumnDto
  }) {
    const ob$ = this.client.send({cmd: 'project-task-changeColumn'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async remove(data: { taskId: number }) {
    const ob$ = this.client.send({cmd: 'project-task-remove'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }
}
