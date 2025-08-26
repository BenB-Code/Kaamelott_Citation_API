import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';
import { AuthorRepository } from './author.repository';

describe('AuthorRepository', () => {
  let authorRepository: AuthorRepository;
  let repository: Partial<Repository<Author>>;

  const mockAuthorDto: AuthorDto = {
    firstName: 'Jhon',
    lastName: 'Doe',
    picture: 'path/to/picture',
  };
  const mockAuthor = {
    id: 12,
    ...mockAuthorDto,
    createdAt: new Date('08-26-2025'),
    updatedAt: new Date('08-26-2025'),
  } as Author;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorRepository,
        {
          provide: getRepositoryToken(Author),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
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
});
