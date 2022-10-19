import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { FilterableField, PagingStrategies, QueryOptions, UnPagedRelation } from '@eavios/nestjs-query-graphql'

import { SubTaskDTO } from '../../sub-task/dto/sub-task.dto'
import { TagDTO } from '../../tag/dto/tag.dto'

@ObjectType('TodoItem')
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
@UnPagedRelation('subTasks', () => SubTaskDTO, { disableRemove: true })
@UnPagedRelation('tags', () => TagDTO)
export class TodoItemDTO {
  @FilterableField(() => ID)
  id!: number

  @FilterableField()
  title!: string

  @FilterableField({ nullable: true })
  description?: string

  @FilterableField()
  completed!: boolean

  @FilterableField(() => GraphQLISODateTime)
  created!: Date

  @FilterableField(() => GraphQLISODateTime)
  updated!: Date
}
