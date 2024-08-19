import { Controller } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern({cmd: 'project-create'})
  async create(data: { createProjectDto: CreateProjectDto, userId: number  }) {
    return this.projectsService.create(data.createProjectDto, data.userId);
  }

  @MessagePattern({cmd: 'project-findAll'})
  async findAllProjectsByUser(data: { userId: number }) {
    return this.projectsService.findAllProjectsByUser(data.userId);
  }

  @MessagePattern({cmd: 'project-findOne'})
  findOne(data: { projId: number, userId: number }) {
    return this.projectsService.findOne(data.projId, data.userId);
  }

  @MessagePattern({cmd: 'project-update'})
  async updateProjectById(data: { projId: number, updateProjectDto: UpdateProjectDto, userId: number }) {
    return this.projectsService.updateProjectById(data.projId, data.updateProjectDto, data.userId);
  }

  @MessagePattern({cmd: 'project-remove'})
  async removeProjectById(data: { projId: number, userId: number }) {
    return this.projectsService.removeProjectById(data.projId, data.userId);
  }
}
