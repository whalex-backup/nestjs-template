import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from './domain-event.base';
import { Entity } from './entity.base';
import { RequestContextService } from '@common/application/context/app.request.context';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvents: DomainEvent): void {
    this._domainEvents.push(domainEvents);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(logger: Logger, eventEmitter: EventEmitter2) {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(RequestContextService.getContext());
        return eventEmitter.emitAsync(event.constructor.name, event);
      }),
    );
    this.clearEvents();
  }
}
