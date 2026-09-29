import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';

export enum UserRole {
  ADMIN = 'admin',
  ENGINEER = 'engineer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ENGINEER })
  role: UserRole;

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;
}
