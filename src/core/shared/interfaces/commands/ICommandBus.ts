// El T extends ICommand restringe que solo puedas despachar objetos marcados como comandos. No puedes pasar cualquier objeto random.
interface ICommandBus {
  dispatch<T extends ICommand, R = void>(command: T): Promise<R>;
}