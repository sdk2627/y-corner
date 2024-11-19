import { Equipment } from "../interfaces/Equipment.interface";
import db from "../db/db.json";

export interface Db {
    equipment: Equipment[];
}

export class EquipmentService {
    private db: Db;

    public constructor() {
        this.db = db;
    }

    public async getAllEquipment(): Promise<Equipment[]> {
        return this.db.equipment;
    }
}