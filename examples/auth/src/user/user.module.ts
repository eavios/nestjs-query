import { Module } from '@nestjs/common'
import { NestjsQueryTypeOrmModule } from '@eavios/nestjs-query-typeorm'

import { UserEntity } from './user.entity'

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
  exports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])]
})
export class UserModule {}
