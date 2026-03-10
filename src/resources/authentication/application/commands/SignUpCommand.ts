import { CreateUserDto } from "../dtos/inputs/CreateUser_dto";

export class SignUpCommand {
  constructor(public readonly payload: CreateUserDto) {}
}