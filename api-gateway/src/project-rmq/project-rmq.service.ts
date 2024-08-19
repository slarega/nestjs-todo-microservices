import {Inject, Injectable} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

@Injectable()
export class ProjectRmqService {

  constructor(@Inject('project-service') private readonly client: ClientProxy) {
  }
  async create(data: {
    createProjectDto: CreateProjectDto,
    userId: number
  }) {
    const ob$ = this.client.send({cmd: 'project-create'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async findAll(data: { userId: number }) {
    const ob$ = this.client.send({cmd: 'project-findAll'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async findOne(data: {
    projId: number,
    userId: number
  }) {
    const ob$ = this.client.send({cmd: 'project-findOne'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async update(data: {
    projId: number,
    updateProjectDto: UpdateProjectDto,
    userId: number
  }) {
    const ob$ = this.client.send({cmd: 'project-update'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async remove(data: {
    projId: number,
    userId: number
  }) {
    const ob$ = this.client.send({cmd: 'project-remove'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }
}
