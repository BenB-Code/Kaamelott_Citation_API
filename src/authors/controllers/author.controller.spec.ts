import { Test, TestingModule } from '@nestjs/testing';
import { AuthorDto } from '../dto/author.dto';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorController,
        {
          provide: AuthorService,
          useValue: {
            createAuthor: jest.fn(),
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
    await authorController.deleteSpecificAuthor({ id: '1' });

    expect(authorService.deleteAuthor).toHaveBeenCalledTimes(1);
    expect(authorService.deleteAuthor).toHaveBeenCalledWith('1');
  });

  it('should call editAuthor', async () => {
    await authorController.editSpecificAuthor({ id: '1' }, mockAuthorDto);

    expect(authorService.editAuthor).toHaveBeenCalledTimes(1);
    expect(authorService.editAuthor).toHaveBeenCalledWith('1', mockAuthorDto);
  });

  it('should call getSpecificAuthor', async () => {
    await authorController.getSpecificAuthor({ id: '1' });

    expect(authorService.getSpecificAuthor).toHaveBeenCalledTimes(1);
    expect(authorService.getSpecificAuthor).toHaveBeenLastCalledWith('1');
  });
});
