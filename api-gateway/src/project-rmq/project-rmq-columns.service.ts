import {Inject, Injectable} from '@nestjs/common'
import {firstValueFrom} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import {CreateProjectColumnDto} from "./dto/create-project-column.dto";
import {UpdateProjColOrderDto} from "./dto/update-proj-col-order.dto";

@Injectable()
export class ProjectRmqColumnsService {
  constructor(
      @Inject('project-service') private readonly client: ClientProxy
  ) {}

  async create(data: {
    projId: number,
    createProjectColumnDto: CreateProjectColumnDto
  }) {
    const ob$ = this.client.send({cmd: 'project-column-create'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async findAll(data: {}) {
    const ob$ = this.client.send({cmd: 'project-column-all'}, {})
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async changeOrder(data: {
    projId: number,
    updateProjColOrderDto: UpdateProjColOrderDto
  }) {
    const ob$ = this.client.send({cmd: 'project-column-order'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }

  async remove(data: {
    projId: number,
    colId: number
  }) {
    const ob$ = this.client.send({cmd: 'project-column-remove'}, data)
    return await firstValueFrom(ob$).catch((err) => console.error(err))
  }
}
