import { Store } from "../entities/Store";

export interface IStoreCommandRepository {
    save(store: Store): Promise<void>;
    existsByName(userId: string, name: string): Promise<boolean>;
}
