import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { FilterActorParams } from './filter-actor.params';
import { CREATED_AT } from '../../common/constants';

describe('FilterActorParams', () => {
  it('should be defined', () => {
    expect(FilterActorParams).toBeDefined();
  });

  it('should use default sortBy value', () => {
    const filterParams = new FilterActorParams();
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });

  it('should accept valid firstName', async () => {
    const filterParams = plainToInstance(FilterActorParams, {
      firstName: 'Alexandre',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid lastName', async () => {
    const filterParams = plainToInstance(FilterActorParams, {
      lastName: 'Astier',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid sortBy values', async () => {
    const validSortByValues = ['createdAt', 'updatedAt', 'firstName', 'lastName'];

    for (const sortBy of validSortByValues) {
      const filterParams = plainToInstance(FilterActorParams, { sortBy });
      const errors = await validate(filterParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortBy values', async () => {
    const filterParams = plainToInstance(FilterActorParams, {
      sortBy: 'invalidSort',
    });

    const errors = await validate(filterParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should handle complete FilterActorParams with all properties', async () => {
    const plainObject = {
      firstName: 'Alexandre',
      lastName: 'Astier',
      sortBy: 'firstName',
    };

    const filterParams = plainToInstance(FilterActorParams, plainObject);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.firstName).toBe('Alexandre');
    expect(filterParams.lastName).toBe('Astier');
    expect(filterParams.sortBy).toBe('firstName');
  });
});
