import { Equipment } from "../interfaces/Equipment.interface";
import { DatabaseService } from "./database.service";
import {API_URL_EQUIPMENT, API_URL_EQUIPMENTS} from "@/constants/apiConst.ts";
import {api} from "@/lib/api.ts";
import {getToken} from "@/utils/getToken.ts";

export class EquipmentService extends DatabaseService {
    public async getAllEquipment(): Promise<Equipment[]> {
        const token = getToken();
        try {
            const data = await api<Equipment[]>(
              API_URL_EQUIPMENTS,
              {
                  method: "GET",
                  headers: { Authorization: `Bearer ${token}` },
              },
              process.env.VITE_API_URL || ""
            );

            if (!data) {
                throw new Error("Réponse invalide du serveur : equipments manquant.");
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Une erreur inconnue est survenue.");
            }
        }
    }

    public async getEquipment(id: string): Promise<Equipment> {
        const token = getToken();

        try {
            const endpoint = API_URL_EQUIPMENT.replace("{id}", id);

            const data = await api<Equipment>(
              endpoint,
              {
                  method: "GET",
                  headers: { Authorization: `Bearer ${token}` },
              },
              process.env.VITE_API_URL || ""
            );

            if (!data) {
                throw new Error("Réponse invalide du serveur : equipment manquant.");
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Une erreur inconnue est survenue.");
            }
        }
    }
}