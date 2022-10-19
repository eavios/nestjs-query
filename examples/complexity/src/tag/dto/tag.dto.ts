import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { CursorConnection, FilterableField, QueryOptions } from '@eavios/nestjs-query-graphql'

import { TodoItemDTO } from '../../todo-item/dto/todo-item.dto'

@ObjectType('Tag')
@QueryOptions({ enableTotalCount: true })
@CursorConnection('todoItems', () => TodoItemDTO, { complexity: 10 })
export class TagDTO {
  @FilterableField(() => ID, { complexity: 1 })
  id!: number

  @FilterableField({ complexity: 1 })
  name!: string

  @FilterableField(() => GraphQLISODateTime, { complexity: 1 })
  created!: Date

  @FilterableField(() => GraphQLISODateTime, { complexity: 1 })
  updated!: Date
}
