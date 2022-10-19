import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@eavios/nestjs-query-graphql'
import { NestjsQueryTypeOrmModule } from '@eavios/nestjs-query-typeorm'

import { SubTaskDTO } from './dto/sub-task.dto'
import { CreateSubTaskDTO } from './dto/subtask-input.dto'
import { SubTaskUpdateDTO } from './dto/subtask-update.dto'
import { SubTaskEntity } from './sub-task.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([SubTaskEntity])],
      resolvers: [
        {
          DTOClass: SubTaskDTO,
          EntityClass: SubTaskEntity,
          CreateDTOClass: CreateSubTaskDTO,
          UpdateDTOClass: SubTaskUpdateDTO,
          enableSubscriptions: true
        }
      ]
    })
  ]
})
export class SubTaskModule {}
