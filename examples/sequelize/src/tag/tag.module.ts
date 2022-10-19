import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@eavios/nestjs-query-graphql'
import { NestjsQuerySequelizeModule } from '@eavios/nestjs-query-sequelize'

import { TagDTO } from './dto/tag.dto'
import { TagInputDTO } from './dto/tag-input.dto'
import { TagEntity } from './tag.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQuerySequelizeModule.forFeature([TagEntity])],
      resolvers: [
        {
          DTOClass: TagDTO,
          EntityClass: TagEntity,
          CreateDTOClass: TagInputDTO,
          UpdateDTOClass: TagInputDTO,
          enableAggregate: true
        }
      ]
    })
  ]
})
export class TagModule {}
