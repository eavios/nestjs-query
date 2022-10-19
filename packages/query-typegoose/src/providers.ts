import { FactoryProvider } from '@nestjs/common'
import { AssemblerSerializer, getQueryServiceToken } from '@eavios/nestjs-query-core'
import { DocumentType, mongoose, ReturnModelType } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { isClass } from 'is-class'
import { getModelToken } from 'nestjs-typegoose'

import { TypegooseQueryService } from './services'
import { TypegooseClass, TypegooseClassWithOptions, TypegooseDiscriminator } from './typegoose-interface.helpers'

type ClassOrDiscriminator = TypegooseClassWithOptions | TypegooseDiscriminator
type TypegooseInput = TypegooseClass | ClassOrDiscriminator

const isTypegooseClass = (item: TypegooseInput): item is TypegooseClass => isClass(item)

const isTypegooseClassWithOptions = (item: ClassOrDiscriminator): item is TypegooseClassWithOptions =>
  isTypegooseClass(item.typegooseClass)

AssemblerSerializer((obj: mongoose.Document) => obj.toObject({ virtuals: true }))(mongoose.Document)

function ensureProperInput(item: TypegooseInput): ClassOrDiscriminator | undefined {
  if (isTypegooseClass(item)) {
    return { typegooseClass: item }
  }
  if (isTypegooseClassWithOptions(item)) {
    return item
  }
  return undefined
}

function createTypegooseQueryServiceProvider<Entity extends Base>(
  model: TypegooseClass | TypegooseClassWithOptions
): FactoryProvider {
  const inputModel = ensureProperInput(model)
  if (!inputModel) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Model definitions ${model} is incorrect.`)
  }
  const modelName = inputModel.typegooseClass?.name

  return {
    provide: getQueryServiceToken({ name: modelName }),
    useFactory(ModelClass: ReturnModelType<new () => Entity>) {
      // initialize default serializer for documents, this is the type that mongoose returns from queries
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      AssemblerSerializer((obj: DocumentType<unknown>) => obj.toObject({ virtuals: true }))(ModelClass)

      return new TypegooseQueryService(ModelClass)
    },
    inject: [getModelToken(modelName)]
  }
}

export const createTypegooseQueryServiceProviders = (models: (TypegooseClass | TypegooseClassWithOptions)[]): FactoryProvider[] =>
  models.map((model) => createTypegooseQueryServiceProvider(model))
