// Es un contrato genérico. El T dice "este handler maneja específicamente comandos de tipo T".
interface ICommandHandler<T extends ICommand, R = void> {
  handle(command: T): Promise<R>;
}