import { UserCredentialsDto } from "../dtos/inputs/UserCredentials_dto";

export class SignInQuery implements IQuery<string> {
    constructor(public readonly payload: UserCredentialsDto) {}
}