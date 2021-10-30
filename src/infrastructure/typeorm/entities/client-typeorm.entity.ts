import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
}