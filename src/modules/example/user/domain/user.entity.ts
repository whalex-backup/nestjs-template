import { AggregateRoot, AggregateID } from '@common/ddd';
import { UserCreatedDomainEvent } from './events/user-created.domain-event';
import { CreateUserProps, UserProps, UserRoles } from './user.types';
import { v4 } from 'uuid';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateUserProps): UserEntity {
    const id = v4();
    const props: UserProps = { ...create, role: UserRoles.guest };
    const user = new UserEntity({ id, props });

    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        email: props.email,
        ...props.address.unpack(),
      }),
    );
    return user;
  }

  get role(): UserRoles {
    return this.props.role;
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
