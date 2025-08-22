
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { AppLogger } from '@slyfox-platform/logger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RolesRepository } from 'src/modules/roles/roles/repositories/roles.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: AppLogger,
    private readonly rolesRepository: RolesRepository,
  ) { }

  async getUsersPaginateByCompany(page = 1, limit = 10, companyId) {
    try {
      this.logger.log(`Obteniendo usuarios para la empresa: ID: ${companyId}`, 'UsersService');
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        this.usersRepository.findUsersPaginateByCompany(skip, limit, companyId),
        this.usersRepository.countUsersByCompany(companyId)
      ]);

      if (total < 1) throw new NotFoundException('No se han encontrado usuarios para esta empresa.');

      return {
        data: users,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      this.logger.error(`Error capturado: ${error.message}`, error.stack, 'UsersService');
      throw error;
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      this.logger.log(`Creando usuario: ${createUserDto.email}`, 'UsersService');
      // Validar que el rol pertenezca a la empresa usando REST
      let role: any;
      try {
        role = await this.rolesRepository.findById(createUserDto.role_id);
      } catch (err) {
        this.logger.warn(`No se pudo obtener el rol ${createUserDto.role_id} desde el microservicio de roles: ${err.message}`);
        throw new BadRequestException('No se pudo validar el rol seleccionado.');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!role || role.company_id !== createUserDto.company_id) {
        this.logger.warn(`Rol ${createUserDto.role_id} no pertenece a la empresa ${createUserDto.company_id}`);
        throw new BadRequestException('El rol seleccionado no pertenece a la empresa.');
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.usersRepository.createUser({
        ...createUserDto,
        password_hash: hashedPassword,
        password: undefined // remove plain password
      });
      return user;
    } catch (error) {
      this.logger.error(`Error creando usuario: ${error.message}`, error.stack, 'UsersService');
      throw new BadRequestException(error.message);
    }
  }

  async getUserById(id: number) {
    try {
      this.logger.log(`Buscando usuario por id: ${id}`, 'UsersService');
      const user = await this.usersRepository.findUserById(id);
      if (!user) throw new NotFoundException('Usuario no encontrado');
      return user;
    } catch (error) {
      this.logger.error(`Error buscando usuario: ${error.message}`, error.stack, 'UsersService');
      throw error;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      this.logger.log(`Actualizando usuario id: ${id}`, 'UsersService');
      const data: any = { ...updateUserDto };
      if (updateUserDto.password) {
        data.password_hash = await bcrypt.hash(updateUserDto.password, 10);
        delete data.password;
      }
      const user = await this.usersRepository.updateUser(id, data);
      if (!user) throw new NotFoundException('Usuario no encontrado.');
      return user;
    } catch (error) {
      this.logger.error(`Error actualizando usuario: ${error.message}`, error.stack, 'UsersService');
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      this.logger.log(`Eliminando usuario id: ${id}`, 'UsersService');
      const user = await this.usersRepository.deleteUser(id);
      if (!user) throw new NotFoundException('Usuario no encontrado.');
      return user;
    } catch (error) {
      this.logger.error(`Error eliminando usuario: ${error.message}`, error.stack, 'UsersService');
      throw error;
    }
  }
}

