import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '../../common/pagination/pagination.response';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';
import { FilterAuthorParams } from '../params/filter-author.params';
import { AuthorService } from '../services/author.service';
import { AuthorController } from './author.controller';

describe('AuthorController', () => {
  let authorService: AuthorService;
  let authorController: AuthorController;

  const mockAuthorDto: AuthorDto = {
    firstName: 'John',
    lastName: 'Doe',
    picture: 'path/to/picture',
  };

  const mockAuthor = {
    id: 1,
    ...mockAuthorDto,
    createdAt: new Date('2025-08-26'),
    updatedAt: new Date('2025-08-26'),
  } as Author;

  const mockPaginationResponse: PaginationResponse<Author> = {
    data: [mockAuthor],
    metadata: {
      limit: 100,
      offset: 0,
      total: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorController,
        {
          provide: AuthorService,
          useValue: {
            createAuthor: jest.fn(),
            getAllAuthors: jest.fn(),
            deleteAuthor: jest.fn(),
            editAuthor: jest.fn(),
            getSpecificAuthor: jest.fn(),
          },
        },
      ],
    }).compile();

    authorController = module.get<AuthorController>(AuthorController);
    authorService = module.get<AuthorService>(AuthorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authorController).toBeDefined();
  });

  it('should call create', async () => {
    await authorController.createAuthor(mockAuthorDto);

    expect(authorService.createAuthor).toHaveBeenCalledTimes(1);
    expect(authorService.createAuthor).toHaveBeenCalledWith(mockAuthorDto);
  });

  it('should call delete', async () => {
    await authorController.deleteSpecificAuthor(1);

    expect(authorService.deleteAuthor).toHaveBeenCalledTimes(1);
    expect(authorService.deleteAuthor).toHaveBeenCalledWith(1);
  });

  it('should call editAuthor', async () => {
    await authorController.editSpecificAuthor(1, mockAuthorDto);

    expect(authorService.editAuthor).toHaveBeenCalledTimes(1);
    expect(authorService.editAuthor).toHaveBeenCalledWith(1, mockAuthorDto);
  });

  it('should call getSpecificAuthor', async () => {
    await authorController.getSpecificAuthor(1);

    expect(authorService.getSpecificAuthor).toHaveBeenCalledTimes(1);
    expect(authorService.getSpecificAuthor).toHaveBeenLastCalledWith(1);
  });

  describe('getAllAuthors', () => {
    it('should call getAllAuthors and return paginated response with complex filters', async () => {
      const complexFilters = {
        search: 'test',
        firstName: 'John',
        lastName: 'Doe',
        limit: 10,
        offset: 20,
        sortBy: 'firstName',
        sortOrder: 'ASC',
      } as FilterAuthorParams;

      (authorService.getAllAuthors as jest.Mock).mockResolvedValue(
        mockPaginationResponse,
      );

      const result = await authorController.getAllAuthors(complexFilters);

      expect(authorService.getAllAuthors).toHaveBeenCalledTimes(1);
      expect(authorService.getAllAuthors).toHaveBeenCalledWith(complexFilters);
      expect(result).toEqual(mockPaginationResponse);
    });

    it('should call getAllAuthors with empty filters', async () => {
      const emptyFilters = {} as FilterAuthorParams;
      const emptyResponse = {
        data: [],
        metadata: { limit: 100, offset: 0, total: 0 },
      };
      (authorService.getAllAuthors as jest.Mock).mockResolvedValue(
        emptyResponse,
      );

      const result = await authorController.getAllAuthors(emptyFilters);

      expect(authorService.getAllAuthors).toHaveBeenCalledTimes(1);
      expect(authorService.getAllAuthors).toHaveBeenCalledWith(emptyFilters);
      expect(result).toEqual(emptyResponse);
    });
  });
});
