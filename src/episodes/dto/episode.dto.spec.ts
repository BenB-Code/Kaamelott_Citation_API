import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { EpisodeDto } from './episode.dto';

describe('EpisodeDto', () => {
  it('should be defined', () => {
    expect(EpisodeDto).toBeDefined();
  });

  it('should validate a complete valid episode', async () => {
    const validEpisode = {
      seasonId: 1,
      name: 'Épisode 1',
      number: 1,
      picture: 'path/to/picture.jpg',
    };

    const episodeDto = plainToInstance(EpisodeDto, validEpisode);
    const errors = await validate(episodeDto);

    expect(errors).toHaveLength(0);
    expect(episodeDto.seasonId).toBe(1);
    expect(episodeDto.name).toBe('Épisode 1');
    expect(episodeDto.number).toBe(1);
    expect(episodeDto.picture).toBe('path/to/picture.jpg');
  });

  it('should validate with only required seasonId', async () => {
    const validEpisode = {
      seasonId: 1,
    };

    const episodeDto = plainToInstance(EpisodeDto, validEpisode);
    const errors = await validate(episodeDto);

    expect(errors).toHaveLength(0);
    expect(episodeDto.seasonId).toBe(1);
    expect(episodeDto.name).toBeUndefined();
    expect(episodeDto.number).toBeUndefined();
    expect(episodeDto.picture).toBeUndefined();
  });

  it('should validate with number set to null', async () => {
    const validEpisode = {
      seasonId: 1,
      name: 'Épisode 1',
      number: null,
    };

    const episodeDto = plainToInstance(EpisodeDto, validEpisode);
    const errors = await validate(episodeDto);

    expect(errors).toHaveLength(0);
    expect(episodeDto.seasonId).toBe(1);
    expect(episodeDto.name).toBe('Épisode 1');
    expect(episodeDto.number).toBeNull();
  });

  it('should reject episode without seasonId', async () => {
    const invalidEpisode = {
      name: 'Épisode 1',
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const seasonIdError = errors.find((error) => error.property === 'seasonId');
    expect(seasonIdError).toBeDefined();
    expect(seasonIdError?.constraints).toHaveProperty('isNotEmpty');
  });

  it('should reject episode with invalid seasonId (string)', async () => {
    const invalidEpisode = {
      seasonId: 'invalid',
      name: 'Épisode 1',
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const seasonIdError = errors.find((error) => error.property === 'seasonId');
    expect(seasonIdError).toBeDefined();
    expect(seasonIdError?.constraints).toHaveProperty('isNumber');
  });

  it('should reject episode with negative seasonId', async () => {
    const invalidEpisode = {
      seasonId: -1,
      name: 'Épisode 1',
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const seasonIdError = errors.find((error) => error.property === 'seasonId');
    expect(seasonIdError).toBeDefined();
    expect(seasonIdError?.constraints).toHaveProperty('isPositive');
  });

  it('should reject episode with zero seasonId', async () => {
    const invalidEpisode = {
      seasonId: 0,
      name: 'Épisode 1',
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const seasonIdError = errors.find((error) => error.property === 'seasonId');
    expect(seasonIdError).toBeDefined();
    expect(seasonIdError?.constraints).toHaveProperty('isPositive');
  });

  it('should reject episode with empty name', async () => {
    const invalidEpisode = {
      seasonId: 1,
      name: '',
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const nameError = errors.find((error) => error.property === 'name');
    expect(nameError).toBeDefined();
    expect(nameError?.constraints).toHaveProperty('minLength');
  });

  it('should reject episode with name too long', async () => {
    const invalidEpisode = {
      seasonId: 1,
      name: 'a'.repeat(151), // 151 characters, max is 150
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const nameError = errors.find((error) => error.property === 'name');
    expect(nameError).toBeDefined();
    expect(nameError?.constraints).toHaveProperty('maxLength');
  });

  it('should reject episode with negative number', async () => {
    const invalidEpisode = {
      seasonId: 1,
      number: -1,
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const numberError = errors.find((error) => error.property === 'number');
    expect(numberError).toBeDefined();
    expect(numberError?.constraints).toHaveProperty('isPositive');
  });

  it('should reject episode with zero number', async () => {
    const invalidEpisode = {
      seasonId: 1,
      number: 0,
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const numberError = errors.find((error) => error.property === 'number');
    expect(numberError).toBeDefined();
    expect(numberError?.constraints).toHaveProperty('isPositive');
  });

  it('should reject episode with picture too long', async () => {
    const invalidEpisode = {
      seasonId: 1,
      picture: 'a'.repeat(251), // 251 characters, max is 250
    };

    const episodeDto = plainToInstance(EpisodeDto, invalidEpisode);
    const errors = await validate(episodeDto);

    expect(errors.length).toBeGreaterThan(0);
    const pictureError = errors.find((error) => error.property === 'picture');
    expect(pictureError).toBeDefined();
    expect(pictureError?.constraints).toHaveProperty('maxLength');
  });
});
