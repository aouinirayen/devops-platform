import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async create(email: string, passwordHash: string) {
    // Le premier utilisateur créé devient administrateur
    const count = await this.repo.count();
    const role = count === 0 ? UserRole.ADMIN : UserRole.ENGINEER;
    return this.repo.save(this.repo.create({ email, passwordHash, role }));
  }
}
