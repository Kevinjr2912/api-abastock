export class CommandBus implements ICommandBus {
  private handlers = new Map<string, ICommandHandler<any, any>>();

  register<T extends ICommand, R = void>(commandName: string, handler: ICommandHandler<T, R>) {
    this.handlers.set(commandName, handler);
  }

  async dispatch<T extends ICommand, R = void>(command: T): Promise<R> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) throw new Error(`No handler for ${command.constructor.name}`);
    return handler.handle(command) as Promise<R>;
  }
}