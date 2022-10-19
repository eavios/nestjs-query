import { Inject } from '@nestjs/common'
import { Class } from '@eavios/nestjs-query-core'

import { getCustomAuthorizerToken } from '../auth'

export const InjectCustomAuthorizer = <DTO>(DTOClass: Class<DTO>): ParameterDecorator =>
  Inject(getCustomAuthorizerToken(DTOClass))
