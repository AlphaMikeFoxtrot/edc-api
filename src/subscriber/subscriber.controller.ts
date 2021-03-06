import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  Param,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import Subscriber from './subscriber.entity';
import { CreateSubscriberDTO, UpdateSubscriberDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ExtractMember } from 'src/common';
import Member from 'src/member/member.entity';

@Controller('subscriber')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard())
export class SubscriberController {
  constructor(private service: SubscriberService) {}

  @Get('/:id')
  async getSubscriber(
    @Param('id') id: string,
  ): Promise<Subscriber | Subscriber[]> {
    return this.service.get(id);
  }

  @Get()
  async get(
    @Query('id') id: string,
    @Query('q') q: string,
  ): Promise<Subscriber | Subscriber[]> {
    return this.service.get(id, q);
  }

  @Post()
  async createSubscriber(
    @Body() dto: CreateSubscriberDTO,
    @ExtractMember() member: Member,
  ): Promise<Subscriber> {
    return this.service.createSubscriber(dto, member);
  }

  @Patch('/:id')
  async updateSubscriber(
    @Param('id') id: string,
    @Body() dto: UpdateSubscriberDTO,
    @ExtractMember() member: Member,
  ): Promise<void> {
    return this.service.updateSubscriber(id, dto, member);
  }

  @Delete('/:id')
  async deleteSubscriber(@Param('id') id: string): Promise<boolean> {
    return this.service.deleteSubscriber(id);
  }
}
