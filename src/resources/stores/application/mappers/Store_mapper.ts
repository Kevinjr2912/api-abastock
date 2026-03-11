import { Store } from "../../domain/entities/Store";
import { CreateStoreCommand } from "../commands/CreateStoreCommand";

export class StoreMapper {
    static fromCreateCommand(command: CreateStoreCommand): Store {
        const { id, userId, name } = command.payload;

        return new Store(id, userId, name);
    }
}
