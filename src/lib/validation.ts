import { GitHubValidationError } from './api';

export const mapValidationErrors = (
  errors: GitHubValidationError[] | undefined | null,
): { [key: string]: string } => {
  const validationErrors: Record<string, string> = {};

  if (Array.isArray(errors)) {
    errors.forEach(({ field, message }) => {
      validationErrors[field] = message;
    });
  }

  return validationErrors;
};
