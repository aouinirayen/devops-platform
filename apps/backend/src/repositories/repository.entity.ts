import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';

export enum GitProvider {
  GITHUB = 'github',
  GITLAB = 'gitlab',
}

@Entity('repositories')
export class Repository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: GitProvider, default: GitProvider.GITHUB })
  provider: GitProvider;

  @Column()
  url: string;

  @Column({ default: 'main' })
  branch: string;

  @Column({ nullable: true })
  encryptedToken?: string;

  @ManyToOne(() => Project, (project) => project.repositories, { onDelete: 'CASCADE' })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;
}
