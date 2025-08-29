import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { CREATED_AT } from '../../common/constants/filters.constant';
import { FilterCharacterParams } from './filter-character.params';

describe('FilterCharacterParams', () => {
  it('should be defined', () => {
    expect(FilterCharacterParams).toBeDefined();
  });

  it('should use default sortBy value', () => {
    const filterParams = new FilterCharacterParams();
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });

  it('should accept valid name', async () => {
    const filterParams = plainToInstance(FilterCharacterParams, {
      name: 'Arthur',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid sortBy values', async () => {
    const validSortByValues = ['createdAt', 'updatedAt', 'name'];

    for (const sortBy of validSortByValues) {
      const filterParams = plainToInstance(FilterCharacterParams, { sortBy });
      const errors = await validate(filterParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortBy values', async () => {
    const filterParams = plainToInstance(FilterCharacterParams, {
      sortBy: 'invalidSort',
    });

    const errors = await validate(filterParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should handle complete FilterCharacterParams with all properties', async () => {
    const plainObject = {
      name: 'Arthur',
      sortBy: 'name',
    };

    const filterParams = plainToInstance(FilterCharacterParams, plainObject);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.name).toBe('Arthur');
    expect(filterParams.sortBy).toBe('name');
  });
});
