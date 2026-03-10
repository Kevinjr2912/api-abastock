import { User } from "../../../users/domain/entities/User";
import { SignUpCommand } from "../commands/SignUpCommand";

export class AuthMapper {

  static fromCreateCommand(command: SignUpCommand, hashedPassword: string): User {
    const {
      id,
      firstName,
      middleName,
      firstSurname,
      secondLastName,
      phoneNumber,
      email
    } = command.payload;

    return new User(
      id,
      firstName,
      middleName,
      firstSurname,
      secondLastName,
      phoneNumber,
      email,
      hashedPassword
    );
  }

}