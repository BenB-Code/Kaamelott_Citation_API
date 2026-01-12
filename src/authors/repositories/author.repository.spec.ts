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
    leftJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getOneOrFail: jest.fn(),
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
    repository = module.get<Partial<Repository<Author>>>(getRepositoryToken(Author));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authorRepository).toBeDefined();
  });

  it('should call create', async () => {
    await authorRepository.create(mockAuthorDto);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockAuthorDto);
  });

  it('should call delete', async () => {
    await authorRepository.delete({ id: mockAuthor.id });

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith({ id: mockAuthor.id });
  });

  it('should call update', async () => {
    await authorRepository.update(mockAuthor);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(mockAuthor);
  });

  it('should call selectOneBy', async () => {
    mockQueryBuilder.getOneOrFail = jest.fn().mockResolvedValue(mockAuthor);

    const result = await authorRepository.selectOneBy({
      firstName: 'John',
      lastName: 'Doe',
      id: 12,
    });

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('author');
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('author.citations', 'citation');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
      'author.id',
      'author.firstName',
      'author.lastName',
      'author.picture',
      'author.createdAt',
      'author.updatedAt',
      'citation.id',
    ]);
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      `LOWER(author."firstName") = LOWER(:firstName)`,
      { firstName: 'John' },
    );
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      `LOWER(author."lastName") = LOWER(:lastName)`,
      { lastName: 'Doe' },
    );
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(`author.id = :id`, {
      id: 12,
    });
    expect(result).toEqual(mockAuthor);
  });

  describe('selectBy', () => {
    const mockAuthors = [mockAuthor];
    const mockCount = 1;

    beforeEach(() => {
      jest.clearAllMocks();
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([mockAuthors, mockCount]);
    });

    it('should handle complex filters and query building', async () => {
      const complexFilters = {
        firstName: 'John',
        lastName: 'Doe',
        search: 'test',
        limit: 20,
        offset: 10,
        sortBy: 'firstName',
        sortOrder: 'DESC',
      } as FilterAuthorParams;

      const result = await authorRepository.selectBy(complexFilters);

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('author');
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith('author.citations', 'citation');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'author.id',
        'author.firstName',
        'author.lastName',
        'author.picture',
        'author.createdAt',
        'author.updatedAt',
        'citation.id',
      ]);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(author."firstName") = LOWER(:firstName)`,
        { firstName: complexFilters.firstName },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `LOWER(author."lastName") = LOWER(:lastName)`,
        { lastName: complexFilters.lastName },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        `(LOWER(author."firstName") ILIKE LOWER(:search) OR LOWER(author."lastName") ILIKE LOWER(:search))`,
        { search: `%${complexFilters.search}%` },
      );

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        `author.${complexFilters.sortBy}`,
        complexFilters.sortOrder,
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(complexFilters.offset);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(complexFilters.limit);
      expect(result).toEqual([mockAuthors, mockCount]);
    });

    it('should handle empty filters with pagination only', async () => {
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

    it('should return empty result when no authors found', async () => {
      const basicFilters = {
        limit: 10,
        offset: 0,
        sortBy: 'id',
        sortOrder: 'ASC',
      } as FilterAuthorParams;
      mockQueryBuilder.getManyAndCount = jest.fn().mockResolvedValue([[], 0]);

      const result = await authorRepository.selectBy(basicFilters);

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
