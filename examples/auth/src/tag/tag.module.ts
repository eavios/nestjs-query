import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@eavios/nestjs-query-graphql'
import { NestjsQueryTypeOrmModule } from '@eavios/nestjs-query-typeorm'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { TagDTO } from './dto/tag.dto'
import { TagInputDTO } from './dto/tag-input.dto'
import { TagEntity } from './tag.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TagEntity])],
      resolvers: [
        {
          DTOClass: TagDTO,
          EntityClass: TagEntity,
          CreateDTOClass: TagInputDTO,
          UpdateDTOClass: TagInputDTO,
          enableAggregate: true,
          enableSubscriptions: true,
          guards: [JwtAuthGuard]
        }
      ]
    })
  ]
})
export class TagModule {}
