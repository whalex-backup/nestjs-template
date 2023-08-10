import { ApiProperty } from '@nestjs/swagger';

export class IdResponse {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({ example: '2cd8ab1-6950-ba14-54ecdsads' })
  readonly id: string;
}
