interface IQueryHandler<T extends IQuery<TResult>, TResult> {
  handle(query: T): Promise<TResult>;
}