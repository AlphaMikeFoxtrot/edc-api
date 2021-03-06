import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Member from 'src/member/member.entity';
import { Duration } from './model';
import Subscriber from '../subscriber/subscriber.entity';
import MembershipType from 'src/membership_type/membership_type.entity';

@Entity('memberships')
export default class Membership extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  duration: Duration;

  @Column()
  fees: number;

  @CreateDateColumn()
  created: number;

  @UpdateDateColumn()
  updated: number;

  @ManyToOne(() => Member, { eager: true })
  createdBy: Member;

  @ManyToOne(() => Member, { eager: true })
  updatedBy: Member;

  @ManyToOne(() => MembershipType, { eager: true })
  membershipType: MembershipType;

  @OneToOne(
    () => Subscriber,
    subscriber => subscriber.membership,
  )
  subscriber: Subscriber;

  @BeforeInsert()
  setup() {
    this.id = uuid();
    const timestamp: number = new Date().getTime();
    this.created = timestamp;
    this.updated = timestamp;
  }

  @BeforeUpdate()
  update() {
    const timestamp: number = new Date().getTime();
    this.updated = timestamp;
  }
}
