import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginationParams } from './pagination.params';

describe('PaginationParams', () => {
  it('should be defined', () => {
    expect(PaginationParams).toBeDefined();
  });

  it('should use default values when no parameters provided', () => {
    const paginationParams = new PaginationParams();

    expect(paginationParams.limit).toBe(100);
    expect(paginationParams.offset).toBe(0);
  });

  it('should transform string numbers to numbers for limit and offset', async () => {
    const plainObject = {
      limit: '50',
      offset: '10',
    };

    const paginationParams = plainToInstance(PaginationParams, plainObject);

    expect(paginationParams.limit).toBe(50);
    expect(paginationParams.offset).toBe(10);
    expect(typeof paginationParams.limit).toBe('number');
    expect(typeof paginationParams.offset).toBe('number');
  });

  it('should reject limit less than 1', async () => {
    const paginationParams = plainToInstance(PaginationParams, {
      limit: 0,
    });

    const errors = await validate(paginationParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should accept limit of 1 or greater', async () => {
    const paginationParams = plainToInstance(PaginationParams, {
      limit: 1,
    });

    const errors = await validate(paginationParams);
    expect(errors).toHaveLength(0);
  });

  it('should reject negative offset', async () => {
    const paginationParams = plainToInstance(PaginationParams, {
      offset: -1,
    });

    const errors = await validate(paginationParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should accept offset of 0 or greater', async () => {
    const paginationParams = plainToInstance(PaginationParams, {
      offset: 0,
    });

    const errors = await validate(paginationParams);
    expect(errors).toHaveLength(0);
  });

  it('should handle both parameters with transformations', async () => {
    const plainObject = {
      limit: '25',
      offset: '10',
    };

    const paginationParams = plainToInstance(PaginationParams, plainObject);
    const errors = await validate(paginationParams);

    expect(errors).toHaveLength(0);
    expect(paginationParams.limit).toBe(25);
    expect(paginationParams.offset).toBe(10);
    expect(typeof paginationParams.limit).toBe('number');
    expect(typeof paginationParams.offset).toBe('number');
  });

  it('should reject invalid limit type', async () => {
    const paginationParams = plainToInstance(PaginationParams, {
      limit: 'invalid',
    });

    const errors = await validate(paginationParams);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should reject invalid offset type', async () => {
    const paginationParams = plainToInstance(PaginationParams, {
      offset: 'invalid',
    });

    const errors = await validate(paginationParams);
    expect(errors.length).toBeGreaterThan(0);
  });
});
