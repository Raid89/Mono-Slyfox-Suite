import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUsersPaginateQueryDto } from '../dto/get-users.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('Users Module')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('')
  @ApiOperation({ summary: 'Obtener usuarios paginados por empresa' })
  getUsersPaginateByCompany(@Query() query: GetUsersPaginateQueryDto) {
    return this.usersService.getUsersPaginateByCompany(
      query.page,
      query.limit,
      query.companyId
    );
  }

  @Post('')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
