import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';
import { FilterAuthorParams } from '../params/filter-author.params';
import { AuthorRepository } from './author.repository';

describe('AuthorRepository', () => {
  let authorRepository: AuthorRepository;
  let repository: Partial<Repository<Author>>;

  const mockAuthorDto: AuthorDto = {
    firstName: 'John',
    lastName: 'Doe',
    picture: 'path/to/picture',
  };
  const mockAuthor = {
    id: 12,
    ...mockAuthorDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Author;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
  } as unknown as SelectQueryBuilder<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorRepository,
        {
          provide: getRepositoryToken(Author),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
            findOneByOrFail: jest.fn(),
            findBy: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
      ],
    }).compile();

    authorRepository = module.get<AuthorRepository>(AuthorRepository);
    repository = module.get<Partial<Repository<Author>>>(
      getRepositoryToken(Author),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authorRepository).toBeDefined();
  });

  it('should call create', () => {
    authorRepository.create(mockAuthorDto);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockAuthorDto);
  });

  it('should call delete', () => {
    authorRepository.delete(`${mockAuthor.id}`);

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(`${mockAuthor.id}`);
  });

  it('should call update', () => {
    authorRepository.update(mockAuthor);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockAuthor);
  });

  it('should call selectOneBy', () => {
    authorRepository.selectOneBy({ firstName: 'John', id: 12 });

    expect(repository.findOneByOrFail).toHaveBeenCalledTimes(1);
    expect(repository.findOneByOrFail).toHaveBeenCalledWith({
      firstName: 'John',
      id: 12,
    });
  });

  describe('selectBy', () => {
    const mockFilterParams: FilterAuthorParams = {
      limit: 100,
      offset: 0,
      search: 'ast',
      sortBy: 'lastName',
      sortOrder: 'DESC',
    } as FilterAuthorParams;

    const mockAuthors = [mockAuthor];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest
        .fn()
        .mockResolvedValue([mockAuthors, mockCount]);
    });

    it('should call selectBy with basic filter', async () => {
      const result = await authorRepository.selectBy(mockFilterParams);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('author');
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(author."firstName") ILIKE LOWER(:search) OR LOWER(author."lastName") ILIKE LOWER(:search))`,
        { search: `%${mockFilterParams.search}%` },
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `author.${mockFilterParams.sortBy}`,
        mockFilterParams.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(
        mockFilterParams.offset,
      );
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(
        mockFilterParams.limit,
      );
      expect(result).toEqual([mockAuthors, mockCount]);
    });

    it('should handle firstName filter', async () => {
      const firstNameFilter = {
        firstName: 'John',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'ASC',
      } as FilterAuthorParams;

      await authorRepository.selectBy(firstNameFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(author."firstName") = LOWER(:firstName)`,
        { firstName: firstNameFilter.firstName },
      );
    });

    it('should handle lastName filter', async () => {
      const lastNameFilter = {
        lastName: 'Doe',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'ASC',
      } as FilterAuthorParams;

      await authorRepository.selectBy(lastNameFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(author."lastName") = LOWER(:lastName)`,
        { lastName: lastNameFilter.lastName },
      );
    });

    it('should handle search filter', async () => {
      const searchFilter = {
        search: 'test',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'ASC',
      } as FilterAuthorParams;

      await authorRepository.selectBy(searchFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(author."firstName") ILIKE LOWER(:search) OR LOWER(author."lastName") ILIKE LOWER(:search))`,
        { search: `%${searchFilter.search}%` },
      );
    });

    it('should handle multiple filters', async () => {
      const multipleFilters = {
        firstName: 'John',
        lastName: 'Doe',
        search: 'test',
        limit: 20,
        offset: 10,
        sortBy: 'firstName',
        sortOrder: 'DESC',
      } as FilterAuthorParams;

      await authorRepository.selectBy(multipleFilters);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(author."firstName") = LOWER(:firstName)`,
        { firstName: multipleFilters.firstName },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(author."lastName") = LOWER(:lastName)`,
        { lastName: multipleFilters.lastName },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(author."firstName") ILIKE LOWER(:search) OR LOWER(author."lastName") ILIKE LOWER(:search))`,
        { search: `%${multipleFilters.search}%` },
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `author.${multipleFilters.sortBy}`,
        multipleFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(
        multipleFilters.offset,
      );
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(multipleFilters.limit);
    });

    it('should handle empty filters with defaults', async () => {
      const emptyFilters = {
        limit: 100,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterAuthorParams;

      await authorRepository.selectBy(emptyFilters);

      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalled();
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `author.${emptyFilters.sortBy}`,
        emptyFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(emptyFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(emptyFilters.limit);
    });

    it('should handle pagination parameters', async () => {
      const paginationFilter = {
        limit: 50,
        offset: 25,
        sortBy: 'updatedAt',
        sortOrder: 'ASC',
      } as FilterAuthorParams;

      await authorRepository.selectBy(paginationFilter);

      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(25);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(50);
    });

    it('should handle sorting parameters', async () => {
      const sortingFilter = {
        sortBy: 'firstName',
        sortOrder: 'ASC',
        limit: 10,
        offset: 0,
      } as FilterAuthorParams;

      await authorRepository.selectBy(sortingFilter);

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'author.firstName',
        'ASC',
      );
    });

    it('should return empty result when no authors found', async () => {
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await authorRepository.selectBy(mockFilterParams);

      expect(result).toEqual([[], 0]);
    });

    it('should properly construct case-insensitive queries', async () => {
      const caseFilter = {
        firstName: 'JOHN',
        lastName: 'DOE',
        search: 'TEST',
        limit: 10,
        offset: 0,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      } as FilterAuthorParams;

      await authorRepository.selectBy(caseFilter);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(author."firstName") = LOWER(:firstName)`,
        { firstName: 'JOHN' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(author."lastName") = LOWER(:lastName)`,
        { lastName: 'DOE' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(author."firstName") ILIKE LOWER(:search) OR LOWER(author."lastName") ILIKE LOWER(:search))`,
        { search: '%TEST%' },
      );
    });
  });
});
