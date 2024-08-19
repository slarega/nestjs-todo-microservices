import { Controller} from '@nestjs/common'
import { ProjectColumnsService } from './project-columns.service'
import { CreateProjectColumnDto } from './dto/create-project-column.dto'
import { UpdateProjColOrderDto } from "./dto/update-proj-col-order.dto"
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class ProjectColumnsController {
  constructor(
      private readonly projectColumnsService: ProjectColumnsService
  ) {}

  @MessagePattern({cmd: 'project-column-create'})
  create(data: {projId: number, createProjectColumnDto: CreateProjectColumnDto}) {
    return this.projectColumnsService.create(data.projId, data.createProjectColumnDto)
  }

  @MessagePattern({cmd: 'project-column-all'})
  findAll() {
    return this.projectColumnsService.findAll()
  }

  @MessagePattern({cmd: 'project-column-order'})
  changeOrder(data: { projId: number, updateProjColOrderDto: UpdateProjColOrderDto}){
    return this.projectColumnsService.changeOrder(data.projId, data.updateProjColOrderDto)
  }

  @MessagePattern({cmd: 'project-column-remove'})
  remove(data: { projId: number, colId: number }) {
    return this.projectColumnsService.remove(data.projId, data.colId)
  }
}
