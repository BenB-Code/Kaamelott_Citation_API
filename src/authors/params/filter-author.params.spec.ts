import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { CREATED_AT } from '../../common/constants/filters.constant';
import { FilterAuthorParams } from './filter-author.params';

describe('FilterAuthorParams', () => {
  it('should be defined', () => {
    expect(FilterAuthorParams).toBeDefined();
  });

  it('should use default sortBy value', () => {
    const filterParams = new FilterAuthorParams();
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });

  it('should accept valid firstName', async () => {
    const filterParams = plainToInstance(FilterAuthorParams, {
      firstName: 'John',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid lastName', async () => {
    const filterParams = plainToInstance(FilterAuthorParams, {
      lastName: 'Doe',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid sortBy values', async () => {
    const validSortByValues = [
      'createdAt',
      'updatedAt',
      'firstName',
      'lastName',
    ];

    for (const sortBy of validSortByValues) {
      const filterParams = plainToInstance(FilterAuthorParams, { sortBy });
      const errors = await validate(filterParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortBy values', async () => {
    const filterParams = plainToInstance(FilterAuthorParams, {
      sortBy: 'invalidSort',
    });

    const errors = await validate(filterParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should handle complete FilterAuthorParams with all properties', async () => {
    const plainObject = {
      firstName: 'John',
      lastName: 'Doe',
      sortBy: 'firstName',
    };

    const filterParams = plainToInstance(FilterAuthorParams, plainObject);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.firstName).toBe('John');
    expect(filterParams.lastName).toBe('Doe');
    expect(filterParams.sortBy).toBe('firstName');
  });
});
