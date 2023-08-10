import { Mapper } from '@common/ddd';
import { User } from '@common/entities/User';
import { Address } from './domain/value-objects/address.value-object';
import { UserEntity } from './domain/user.entity';
import { UserResponseDto } from './dtos/user.response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper implements Mapper<UserEntity, User, UserResponseDto> {
  toPersistence(entity: UserEntity): User {
    const copy = entity.getProps();
    const record: User = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      email: copy.email,
      country: copy.address.country,
      postalCode: copy.address.postalCode,
      street: copy.address.street,
      role: copy.role,
    };

    return record;
  }

  toDomain(record: User): UserEntity {
    const entity = new UserEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        email: record.email,
        role: record.role,
        address: new Address({
          street: record.street,
          postalCode: record.postalCode,
          country: record.country,
        }),
      },
    });

    return entity;
  }

  toResponse(entity: UserEntity): UserResponseDto {
    const props = entity.getProps();
    const response = new UserResponseDto(entity);
    response.email = props.email;
    response.country = props.address.country;
    response.postalCode = props.address.postalCode;
    response.street = props.address.street;

    return response;
  }
}
