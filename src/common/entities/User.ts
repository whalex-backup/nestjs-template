import { UserRoles } from '@src/modules/example/user/domain/user.types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryColumn({
    name: 'id',
  })
  id: string;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'postalCode' })
  postalCode: string;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ type: 'enum', enum: UserRoles, name: 'role' })
  role: UserRoles;

  @Column({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'updatedAt' })
  updatedAt: Date;
}
