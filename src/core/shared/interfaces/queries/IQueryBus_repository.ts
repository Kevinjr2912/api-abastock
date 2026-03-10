interface IQueryBus {
  ask<TResult>(query: IQuery<TResult>): Promise<TResult>;
}