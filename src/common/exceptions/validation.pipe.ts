import {
  ArgumentMetadata,
  Injectable,
  Optional,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { TransformerPackage } from '@nestjs/common/interfaces/external/transformer-package.interface';
import { ValidationError } from 'class-validator';

import { IValidationError } from './exception.interface';
import { FieldValidationException } from './field-validation.exception';

const buildError = (errors: ValidationError[], result: IValidationError[]) => {
  errors.forEach((el) => {
    if (el.children) {
      buildError(el.children, result);
    }

    const prop = el.property;
    Object.entries(el.constraints || {}).forEach((constraint) => {
      result.push({
        field: prop,
        rule: constraint[0],
        message: constraint[1],
      });
    });
  });

  return result;
};

let classTransformer: TransformerPackage = {} as any;

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor(@Optional() options?: ValidationPipeOptions) {
    super(options);

    classTransformer = this.loadTransformer(options?.transformerPackage);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;
    if (value?.fieldname === 'file' || value?.fundType) return value;

    if (!metatype || !this.toValidate(metadata)) {
      return this.isTransformEnabled
        ? this.transformPrimitive(value, metadata)
        : value;
    }

    const originalValue = value;
    value = this.toEmptyIfNil(value);

    const isNil = value !== originalValue;
    const isPrimitive = this.isPrimitive(value);
    this.stripProtoKeys(value);

    let entity = classTransformer.plainToClass(
      metatype,
      value,
      this.transformOptions,
    );

    const originalEntity = typeof entity === 'object' ? { ...entity } : entity;
    const isCtorNotEqual = entity.constructor !== metatype;

    if (isCtorNotEqual && !isPrimitive) {
      entity.constructor = metatype;
    } else if (isCtorNotEqual) {
      entity = { constructor: metatype };
    }

    const errors = await this.validate(entity, this.validatorOptions);

    if (errors.length > 0) {
      throw new FieldValidationException(
        'Input data validation failed',
        this.buildError(errors),
      );
    }

    if (isPrimitive) {
      entity = originalEntity;
    }

    if (this.isTransformEnabled) {
      return entity;
    }

    if (
      originalEntity.fieldname &&
      originalEntity.buffer &&
      originalEntity.mimetype
    ) {
      return Object.keys(this.validatorOptions).length > 0
        ? classTransformer.classToPlain(originalEntity, this.transformOptions)
        : value;
    }

    if (isNil) {
      return originalValue;
    }

    return Object.keys(this.validatorOptions).length > 0
      ? classTransformer.classToPlain(entity, this.transformOptions)
      : value;
  }

  private buildError(errors: ValidationError[]) {
    const result: IValidationError[] = buildError(errors, []);

    return result;
  }

  protected toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
