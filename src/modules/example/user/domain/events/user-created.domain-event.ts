import { DomainEvent, DomainEventProps } from '@common/ddd';

export class UserCreatedDomainEvent extends DomainEvent {
  readonly email: string;

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.email = props.email;
  }
}
