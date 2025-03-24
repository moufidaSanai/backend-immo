import { Module } from '@nestjs/common';
import { HousedetailService } from './housedetail.service';
import { HousedetailController } from './housedetail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Housedetail } from './entities/housedetail.entity';

@Module({
  controllers: [HousedetailController],
  providers: [HousedetailService],
  imports:[TypeOrmModule.forFeature([Housedetail])]
})
export class HousedetailModule {}
