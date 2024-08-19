import { Controller } from '@nestjs/common';
import { ProjectTasksService } from './project-tasks.service';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { ApiSecurity, ApiTags} from "@nestjs/swagger";
import { UpdateTaskColumnDto } from "./dto/update-task-column.dto";
import { MessagePattern } from "@nestjs/microservices";

@Controller('project')
@ApiTags('Проекты 3 - задачи')
@ApiSecurity('x-bearer-token')
export class ProjectTasksController {
  constructor(private readonly projectTasksService: ProjectTasksService) {}

  @MessagePattern({cmd: 'project-task-create'})
  create(data: {projId: number, createProjectTaskDto: CreateProjectTaskDto}) {
    return this.projectTasksService.create(data.projId, data.createProjectTaskDto)
  }

  @MessagePattern({cmd: 'project-task-update'})
  update(data: {projId: number, taskId: number, updateProjectTaskDto: UpdateProjectTaskDto }) {
    return this.projectTasksService.update(data.projId, data.taskId, data.updateProjectTaskDto);
  }

  @MessagePattern({cmd: 'project-task-changeColumn'})
  changeTaskColumn(data: {projId: number, colId: number, updateTaskColumn: UpdateTaskColumnDto }) {
    return this.projectTasksService.changeTaskColumn(data.projId, data.colId, data.updateTaskColumn)
  }

  @MessagePattern({cmd: 'project-task-remove'})
  remove(data: { taskId: number }) {
    return this.projectTasksService.remove(data.taskId)
  }
}
