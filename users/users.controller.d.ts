import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createProfileDto: CreateUserDto): Promise<User>;
    findAll(page: number, limit: number): Promise<InfinityPaginationResultType<User>>;
    findOne(id: string): Promise<NullableType<User>>;
    update(id: number, updateProfileDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
