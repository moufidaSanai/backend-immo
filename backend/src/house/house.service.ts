import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HouseService {
  
   constructor(
      @InjectRepository(House)
      private readonly houseRepository: Repository<House>,
    ) {}
  
    async create(houseData: CreateHouseDto) {
      let house =  await this.houseRepository.create(houseData);
      console.log(house)
      return this.houseRepository.save(house)  }
  
    async findAll() {
      return  this.houseRepository.findAndCount({where:{active:true},relations:["userId","offreId","pictures","housedetails","lessorId"]});
    }
  
    async findOne(id: number){
      return await this.houseRepository.findOne({ where: {id: id } ,relations:["userId","offreId","pictures","housedetails","lessorId"]});
    }
  
    async update(id: number, updateHouseDto:UpdateHouseDto) {
      let house = await this.houseRepository.preload({
        id:+id,
        ...updateHouseDto
      })
     return this.houseRepository.save(house)
    }
    delete(id: number) {
      this.houseRepository.delete(id)
    }
    // Méthode pour supprimer plusieurs maisons
    async removeMultiple(toDelete: number[]) {   
  //     console.log("toDelete",toDelete)
  //     let resultDelete: boolean = null
  //     let resultDisable: boolean = null
  //     const allIntegers = toDelete.every(item => Number.isInteger(item));
  // if (!allIntegers) {
  // return;
  // }

  //     if (toDelete.length != 0) {
  //       if (await this.houseRepository.delete(toDelete)) {
  //         resultDelete = true
  //       } else
  //         resultDelete = false
  //     }
  
  //   return true 
  console.log("toDelete", toDelete);

  if (!toDelete.length) {
    console.log("No IDs provided");
    return false;
  }

  if (!toDelete.every(Number.isInteger)) {
    console.log("Invalid ID format");
    return false;
  }

  let success = false;

  for (const id of toDelete) {
    const result = await this.houseRepository.update(id, { active: false });
    if (result.affected > 0) {
      success = true;
    }
    }
    
      
   
  }
  }
