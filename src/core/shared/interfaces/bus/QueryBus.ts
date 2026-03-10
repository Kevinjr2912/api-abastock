export class QueryBus implements IQueryBus {
  private handlers = new Map<string, IQueryHandler<any, any>>();

  register<T extends IQuery<TResult>, TResult>(queryName: string, handler: IQueryHandler<T, TResult>) {
    this.handlers.set(queryName, handler);
  }

  async ask<TResult>(query: IQuery<TResult>): Promise<TResult> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) throw new Error(`No handler for ${(query as any).constructor.name}`);
    return handler.handle(query);
  }
}