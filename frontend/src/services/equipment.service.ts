import { Equipment } from "../interfaces/Equipment.interface";
import { DatabaseService } from "./database.service";

export class EquipmentService extends DatabaseService {

    public async getAllEquipment(): Promise<Equipment[]> {
        const equipment = fetch(`${this.dbUrl}/equipment`);
        return equipment.then(response => response.json());
    }

}