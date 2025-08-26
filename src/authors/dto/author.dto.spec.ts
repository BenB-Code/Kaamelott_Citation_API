import { validate } from 'class-validator';
import { AuthorDto } from './author.dto';

describe('AuthorDto', () => {
  let authorDto: AuthorDto;

  beforeEach(() => {
    authorDto = new AuthorDto();
    authorDto.firstName = 'Jhon';
    authorDto.lastName = 'Doe';
  });

  it('should create authorDto', async () => {
    const result = await validate(authorDto);

    expect(result.length).toBe(0);
  });

  it('should create authorDto with picture', async () => {
    authorDto.picture = 'path/to/picture';

    const result = await validate(authorDto);

    expect(result.length).toBe(0);
  });

  it('should not create authorDto with invalid firstName, empty string', async () => {
    authorDto.firstName = '';
    const result = await validate(authorDto);

    expect(result.length).toBe(1);
    expect(result[0].property).toBe('firstName');
    expect(result[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should not create authorDto with invalid lastName, empty string', async () => {
    authorDto.lastName = '';
    const result = await validate(authorDto);

    expect(result.length).toBe(1);
    expect(result[0].property).toBe('lastName');
    expect(result[0].constraints).toHaveProperty('isNotEmpty');
  });
});
