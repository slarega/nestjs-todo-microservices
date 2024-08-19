import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { CreateProjectColumnDto } from './dto/create-project-column.dto'
import { ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger"
import { UpdateProjColOrderDto } from "./dto/update-proj-col-order.dto"
import { JwtAuthGuard } from "../auth-rmq/auth-jwt.guard";
import {ProjectRmqColumnsService} from "./project-rmq-columns.service";

@Controller('project')
@ApiTags('Проекты 2 - столбцы')
@ApiSecurity('x-bearer-token')
@UseGuards(JwtAuthGuard)
export class ProjectRmqColumnsController {
  constructor(
      private readonly projectColumnsService: ProjectRmqColumnsService
  ) {}

  @Post(':id/column')
  @ApiOperation({ summary: 'Добавить-создать столбец в проект по id / Add-create column in project by id' })
  async create(
      @Param('id') id: string,
      @Body() createProjectColumnDto: CreateProjectColumnDto) {
        return this.projectColumnsService.create(
            {
              projId: +id,
              createProjectColumnDto: createProjectColumnDto
            }
        )
      }

  @Get('all-columns')
  @ApiOperation({ summary: 'Получить все существующие столбцы / Get all existing columns' })
  async findAll() {
    return this.projectColumnsService.findAll({})
  }

  @Patch(':id/columnOrder')
  @ApiOperation({ summary: 'Изменить порядок столбцов в проекте по id / Change order of columns in project by id' })
  async changeOrder(
      @Param('id') id: string,
      @Body() updateProjColOrderDto: UpdateProjColOrderDto){
        return this.projectColumnsService.changeOrder(
            {
              projId: +id,
              updateProjColOrderDto: updateProjColOrderDto
            }
        )
      }

  @Delete(':id/column/:cid')
  @ApiOperation({ summary: 'Удалить столбец из проекта по id / Delete a column from a project by id' })
  async remove(
      @Param('id') id: string,
      @Param('cid') cid: string) {
        return this.projectColumnsService.remove(
            {
              projId: +id,
              colId: +cid }
        )
      }
}
