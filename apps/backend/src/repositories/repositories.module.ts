import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from './repository.entity';

@Module({ imports: [TypeOrmModule.forFeature([Repository])], exports: [TypeOrmModule] })
export class RepositoriesModule {}
