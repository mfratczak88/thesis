import { validateSync } from 'class-validator';

export const Validate = (target: any) => {
  const original = target;

  const f: any = function(...args: any[]) {
    const instance = new original(...args);
    const validationErrors = validateSync(instance);

    if (validationErrors.length) {
      const errors = validationErrors.flatMap(error => Object.values(error.constraints));
      throw new ValidationError(target, errors);

    }
    return instance;
  };
  f.prototype = original.prototype;
  return f;
};

export class ValidationError extends Error {
  constructor(ctor: Function, errors: string[]) {
    super(`Validation of class ${ctor.name} failed. Errors: ${errors.join(',')}`);
  }
}