import mongoose, { Schema, Aggregate, Document, Model, SchemaOptions } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

export const configuration: SchemaOptions = { timestamps: true }

export interface PaginadoModel<T extends Document> extends Model<T> {
  aggregatePaginate(
    aggregate: Aggregate<any[]>,
    config: { page: any; limit: any },
  ): Promise<any>
}

export const addOns = <T extends Document>(
  name: string,
  schema: Schema,
  transform?: (row: any) => {},
) => {
  schema.plugin(aggregatePaginate)
  schema.set('toJSON', {
    transform: (doc: any, { __v: any, ...restDoc }: any) => {
      if (!transform) return restDoc
      return transform(doc)
    },
  })

  return mongoose.model<T, PaginadoModel<T>>(name, schema, name)
}
