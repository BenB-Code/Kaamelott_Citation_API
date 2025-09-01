import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { CREATED_AT } from '../../common/constants/filters.constant';
import { FilterShowParams } from './filter-show.params';

describe('FilterShowParams', () => {
  it('should be defined', () => {
    expect(FilterShowParams).toBeDefined();
  });

  it('should use default sortBy value', () => {
    const filterParams = new FilterShowParams();
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });

  it('should accept valid name', async () => {
    const filterParams = plainToInstance(FilterShowParams, {
      name: 'John',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid mediaType', async () => {
    const filterParams = plainToInstance(FilterShowParams, {
      mediaType: 'film',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid sortBy values', async () => {
    const validSortByValues = ['createdAt', 'updatedAt', 'name', 'mediaType'];

    for (const sortBy of validSortByValues) {
      const filterParams = plainToInstance(FilterShowParams, { sortBy });
      const errors = await validate(filterParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortBy values', async () => {
    const filterParams = plainToInstance(FilterShowParams, {
      sortBy: 'invalidSort',
    });

    const errors = await validate(filterParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should handle complete FilterShowParams with all properties', async () => {
    const plainObject = {
      name: 'Kaamelott',
      mediaType: 'film',
      sortBy: 'name',
    };

    const filterParams = plainToInstance(FilterShowParams, plainObject);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.name).toBe('Kaamelott');
    expect(filterParams.mediaType).toBe('film');
    expect(filterParams.sortBy).toBe('name');
  });
});
