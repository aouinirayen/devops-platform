import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Repository } from '../repositories/repository.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Repository, (repo) => repo.project)
  repositories: Repository[];

  @CreateDateColumn()
  createdAt: Date;
}
