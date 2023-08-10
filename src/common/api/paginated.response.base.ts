import { ApiProperty } from '@nestjs/swagger';
import { Paginated } from '@common/ddd';

export abstract class PaginatedResponseDto<T> extends Paginated<T> {
  @ApiProperty({
    example: 999,
    description: 'Total number of imtes',
  })
  readonly count: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
  })
  @ApiProperty({ example: 0, description: 'Page number' })
  readonly page: number;

  @ApiProperty({ isArray: true })
  abstract readonly data: readonly T[];
}
