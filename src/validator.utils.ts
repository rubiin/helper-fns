import { ValidateIf, ValidationOptions } from 'class-validator';

/**
 *
 *
 * @export
 * @param {ValidationOptions} [validationOptions]
 * @returns
 */
export function IsOptional(validationOptions?: ValidationOptions) {
	return ValidateIf((_, value) => {
		return value !== null && value !== undefined && value !== '';
	}, validationOptions);
}
