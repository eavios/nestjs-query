import { NestjsQueryGraphQLModule } from '@eavios/nestjs-query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryMongooseModule } from '@eavios/nestjs-query-mongoose';
import { TagInputDTO } from './dto/tag-input.dto';
import { TagDTO } from './dto/tag.dto';
import { TagEntity, TagEntitySchema } from './tag.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([{ document: TagEntity, name: TagEntity.name, schema: TagEntitySchema }]),
      ],
      resolvers: [
        {
          DTOClass: TagDTO,
          EntityClass: TagEntity,
          CreateDTOClass: TagInputDTO,
          UpdateDTOClass: TagInputDTO,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class TagModule {}
