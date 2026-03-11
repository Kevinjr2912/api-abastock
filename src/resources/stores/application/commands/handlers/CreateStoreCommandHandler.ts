import { ExistingStoreError } from "../../../../../core/shared/errors/ExistingStore_error";
import { IStoreCommandRepository } from "../../../domain/repositories/IStoreCommand_repository";
import { StoreMapper } from "../../mappers/Store_mapper";
import { CreateStoreCommand } from "../CreateStoreCommand";

export class CreateStoreCommandHandler implements ICommandHandler<CreateStoreCommand> {
    constructor(
        private readonly storeRepository: IStoreCommandRepository
    ) {}

    async handle(command: CreateStoreCommand): Promise<void> {
        const { userId, name } = command.payload;

        const storeExists = await this.storeRepository.existsByName(userId, name);
        if (storeExists) throw new ExistingStoreError("A store with this name already exists for this user");

        const store = StoreMapper.fromCreateCommand(command);
        await this.storeRepository.save(store);
    }
}
