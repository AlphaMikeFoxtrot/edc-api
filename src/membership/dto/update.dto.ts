import { IsOptional } from 'class-validator';
import Center from 'src/center/center.entity';
import { Duration } from '../model';
import MembershipType from 'src/membership_type/membership_type.entity';

export default class UpdateMembershipDTO {
  @IsOptional()
  duration: Duration;

  @IsOptional()
  fees: number;

  @IsOptional()
  membershipType: MembershipType;
}
