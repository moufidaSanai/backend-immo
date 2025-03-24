import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHousedetailDto } from './dto/create-housedetail.dto';
import { UpdateHousedetailDto } from './dto/update-housedetail.dto';
import { Housedetail } from './entities/housedetail.entity';

@Injectable()
export class HousedetailService {
  constructor(
    @InjectRepository(Housedetail)
    private housedetailRepository: Repository<Housedetail>,
  ) {}

  async create(createHousedetailDto: CreateHousedetailDto): Promise<Housedetail> {
    const housedetail = this.housedetailRepository.create(createHousedetailDto);
    return await this.housedetailRepository.save(housedetail);
  }

  async findAll(): Promise<Housedetail[]> {
  return await this.housedetailRepository.find({relations:['houseId','characterisrtics','equipments']});
  }

  async findOne(id: number): Promise<Housedetail> {
    const housedetail = await this.housedetailRepository.findOne({ where: { id } });
    if (!housedetail) {
      throw new NotFoundException(`Housedetail with ID ${id} not found`);
    }
    return housedetail;
  }

  async update(id: number, updateHousedetailDto: UpdateHousedetailDto){
  let  houseDeatil=  await this.housedetailRepository.preload({id:id,
      ...updateHousedetailDto

    })
    this.housedetailRepository.save(houseDeatil)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.housedetailRepository.delete(id);
  }
}
