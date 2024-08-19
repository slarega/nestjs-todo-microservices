import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ProjectFullDataEntityEntity } from "./entities/project-full-data.entity";
import { AuthRmqService } from "../auth-rmq/auth-rmq.service";
import { JwtAuthGuard } from "../auth-rmq/auth-jwt.guard";
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto} from "./dto/update-project.dto";
import { ProjectEntity } from "./entities/project.entity";
import { ProjectRmqService } from './project-rmq.service';
import { Request } from 'express';

@Controller('projects')
@ApiTags('Проекты 1 - основное')
@ApiSecurity('x-bearer-token')
@UseGuards(JwtAuthGuard)
export class ProjectRmqController {
  constructor(
      private readonly projectsService: ProjectRmqService,
      private readonly authServiceService: AuthRmqService
      ) {}

  // private async getUser(
  //     @Req() req: Request) {
  //       const token: string = req.headers['x-bearer-token'].toString().split(' ')[1]
  //       let user = await this.authServiceService.verifyJwt(token)
  //       console.log(user)
  //       return await user
  // }

  @Post()
  @ApiOperation({ summary: 'Создать проект / Create a project' })
  @ApiOkResponse({type: ProjectEntity})
  async create(
      @Req() req: Request,
      @Body() createProjectDto: CreateProjectDto) {
        const token: string = req.headers['x-bearer-token'].toString().split(' ')[1]
        const user = await this.authServiceService.verifyJwt(token)
        return this.projectsService.create(
            {
                createProjectDto: createProjectDto,
                userId: user.id
            }
        )
      }

  @Get()
  @ApiOperation({ summary: 'Получить все проекты пользователя / Get all user projects' })
  @ApiOkResponse({type: ProjectEntity, isArray: true})
  async findAllProjectsByUser(
      @Req() req: Request) {
        const token: string = req.headers['x-bearer-token'].toString().split(' ')[1]
        const user = await this.authServiceService.verifyJwt(token)
        // console.log(this.getUser(req))
        return this.projectsService.findAll(
            { userId: user.id }
        )
      }

  @Get(':id')
  @ApiOperation({ summary: 'Получить проект пользователя по id / Get user project by id' })
  @ApiOkResponse({type: ProjectFullDataEntityEntity})
  async findOne(
      @Req() req: Request,
      @Param('id') id: string) {
        const token: string = req.headers['x-bearer-token'].toString().split(' ')[1]
        const user = await this.authServiceService.verifyJwt(token)
        return this.projectsService.findOne(
            {
                projId: +id,
                userId: user.id
            }
        )
      }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные проекта / Update project data by id' })
  @ApiOkResponse({type: ProjectEntity})
  async updateProjectById(
      @Param('id') id: string,
      @Req() req: Request,
      @Body() updateProjectDto: UpdateProjectDto) {
        const token: string = req.headers['x-bearer-token'].toString().split(' ')[1]
        const user = await this.authServiceService.verifyJwt(token)
        return this.projectsService.update(
            {
                projId: +id,
                updateProjectDto: updateProjectDto,
                userId: user.id
            }
        )
      }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект по id / Delete project by id' })
  @ApiOkResponse({type: ProjectEntity})
  async removeProjectById(
      @Req() req: Request,
      @Param('id') id: string) {
        const token: string = req.headers['x-bearer-token'].toString().split(' ')[1]
        const user = await this.authServiceService.verifyJwt(token)
        return this.projectsService.remove(
            {
                projId: +id,
                userId: user.id
            }
        )
      }
}
