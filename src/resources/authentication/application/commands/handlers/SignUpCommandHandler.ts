import { ExistingEmailError } from "../../../../../core/shared/errors/ExistingEmail_error";

import { AuthMapper } from "../../mappers/Auth_mapper";
import { BcryptService } from "../../services/Bcrypt_service";
import { SignUpCommand } from "../SignUpCommand";
import { AuthWriteRepository } from '../../../domain/repositories/IAuthCommand_repository';

export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly authRepository: AuthWriteRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async handle(command: SignUpCommand): Promise<void> {
    const { email, password } = command.payload;

    const emailTaken = await this.authRepository.existsByEmail(email);
    if (emailTaken) throw new ExistingEmailError("Email is already in use");

    const hashedPassword = await this.bcryptService.hashPassword(password);
    
    await this.authRepository.save(AuthMapper.fromCreateCommand(command, hashedPassword));
  }
}