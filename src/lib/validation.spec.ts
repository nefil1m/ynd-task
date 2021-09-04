import { mapValidationErrors } from './validation';

describe('validation utils', () => {
  describe('mapValidationErrors', () => {
    it('should not crash on nil value', () => {
      expect(mapValidationErrors(null)).toEqual({});
    });

    it('should map validation errors', () => {
      const errors = [{
        field: 'name',
        message: 'name is required',
      }, {
        field: 'city',
        message: 'city cannot be longer than 256',
      }];

      expect(mapValidationErrors(errors)).toEqual({
        name: 'name is required',
        city: 'city cannot be longer than 256',
      });
    });
  });
});