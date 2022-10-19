import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { FilterableCursorConnection, FilterableField, KeySet, QueryOptions } from '@eavios/nestjs-query-graphql'

import { AuthGuard } from '../../auth.guard'
import { SubTaskDTO } from '../../sub-task/dto/sub-task.dto'
import { TagDTO } from '../../tag/dto/tag.dto'

@ObjectType('TodoItem')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@FilterableCursorConnection('subTasks', () => SubTaskDTO, { disableRemove: true, guards: [AuthGuard] })
@FilterableCursorConnection('tags', () => TagDTO, { guards: [AuthGuard] })
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

  @Field()
  age!: number

  @FilterableField()
  priority!: number

  @FilterableField({ nullable: true })
  createdBy?: string

  @FilterableField({ nullable: true })
  updatedBy?: string
}
