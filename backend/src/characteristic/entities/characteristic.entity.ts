import { House } from 'src/house/entities/house.entity';
import { Housedetail } from 'src/housedetail/entities/housedetail.entity';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('characteristic')
export class Characteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { name: 'title', nullable: true })
  title: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;
  @Column('text', { name: 'image', nullable: true })
   image: string;

  @Column('text', { name: 'nom', nullable: true })
  nom: string;
  
 
  @Column('text', { name: 'condition', nullable: true })
  condition: string;

  @Column('int', { name: 'quantity', nullable: true })
  quantity: number;

  @Column('boolean', { name: 'isavaible', nullable: true })
  isavaible: boolean;

  @Column('boolean', { name: 'active', nullable: true })
  active: boolean;

  @Column('date', { name: 'createdAt', nullable: true })
  created_at: Date;

  @Column('int', { name: 'createdBy', nullable: true })
  created_by: number;

  @Column('date', { name: 'updatedAt', nullable: true })
  updated_at: Date;

  @Column('int', { name: 'updatedBy', nullable: true })
  updated_by: number;

  @Column('date', { name: 'deleted_at', nullable: true })
  deleted_at: Date;
@OneToMany(() => Housedetail, (housedetail: Housedetail) => housedetail.equipementId,{cascade:true})
        characteristics: Housedetail[];

  @Column('int', { name: 'deleted_by', nullable: true })
  deleted_by: number;

  @BeforeInsert()
  setCreateDate() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  setUpdateDate() {
    this.updated_at = new Date();
  }
}