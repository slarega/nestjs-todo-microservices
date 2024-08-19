import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from "../prisma/prisma.service";
import { Project, //User
} from "@prisma/client";
import { ProjectNotFoundException } from "../exceptions/projectNotFound.exception";

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, ownerId: number): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        ownerId: ownerId,
        projectData: {
          create: [
            {column: {
              connectOrCreate: {
                where: { name: "to do" },
                create: { name: "to do" }
              }}
            },
            {column: {
              connectOrCreate: {
                where: { name: "in progress" },
                create: { name: "in progress" }
              }}
            },
            {column: {
              connectOrCreate: {
                where: { name: "done" },
                create: { name: "done" }
              }}
            }
          ]
        },
        columnOrder: [1, 2, 3]
      }
    })
  }

  async findAllProjectsByUser(userId: number){
    return this.prisma.project.findMany({
      where: {ownerId: userId},
      select: {
        id: true,
        name: true,
        createDate: true
      },
      // orderBy: { createDate: 'asc' }
    })
  }

  async findOne(id: number, ownerId: number) {
    return this.prisma.project.findUnique({
      where: {id, ownerId: ownerId},
      include: {
        projectData: {
          select: {
            relId: true,
            column: true,
            task: true
          },
          orderBy: [
            { columnId: 'asc' },
            { task: {
              deadline: 'asc'
            }}
          ]
        }
      },
    })
  }

  async updateProjectById(id: number, updateProjectDto: UpdateProjectDto, ownerId: number): Promise<Project> {
    try {
      return await this.prisma.project.update({
        where: {
          id,
          ownerId: ownerId
        },
        data: updateProjectDto
      })
    } catch (err) {
      if (err.code === 'P2025') {
        throw new ProjectNotFoundException(id)
      }
      throw new HttpException('Что-то пошло не так', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeProjectById(id: number, ownerId: number)
  {
    try {
      return await this.prisma.project.delete({
        where: {
          id,
          ownerId: ownerId
        },
        include: {
          projectData: true
        }
      })
    } catch (err) {
      if (err.code === 'P2025') {
        throw new ProjectNotFoundException(id)
      }
      throw new HttpException('Что-то пошло не так', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
