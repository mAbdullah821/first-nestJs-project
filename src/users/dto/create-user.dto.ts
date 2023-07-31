import { UserDto } from './user.dto';
import { optionalAttributes } from '../helpers/optional-attributes.helper';

export class CreateUserDto extends optionalAttributes(UserDto, ['isAdult']) {}
