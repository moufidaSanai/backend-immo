import { Characteristic } from "src/characteristic/entities/characteristic.entity";
import { Equipement } from "src/equipement/entities/equipement.entity";
import { House } from "src/house/entities/house.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('housedetail')
export class Housedetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('date',{name:"createAt",nullable:true})
    createAt:Date;
    @Column('date',{name:"update",nullable:true})
    updateAt:Date;
    @Column('integer',{name:"createby",nullable:true})
    createBy:number;
    @Column('integer',{name:"updatedBy",nullable:true})
    updatedBy:number;
    @Column('boolean',{name:"active",nullable:true})
    isActive:boolean
    @Column('integer',{name:"quantity", nullable:true})
    quantity:number
    
    @ManyToOne(() => House, (house: House) => house.housedetails)
    @JoinColumn({ name: "houseId" })
    houseId: number | null;

    @ManyToOne(() => Characteristic, (characteristic: Characteristic) => characteristic.id)
    @JoinColumn({ name: "characteristicId" })
    characteristicId: number | null;

    @ManyToOne(() => Equipement, (equipement: Equipement) => equipement.id)
    @JoinColumn({ name: "equipementId" })
    equipementId: number | null;






   

    @ManyToOne(() => House, (house: House) => house.id)
    @JoinColumn({ name: "houseid" })
    productId: number | null;

 

@BeforeInsert()
CreateATDate(): void{
this.createAt=new Date()
}
}
