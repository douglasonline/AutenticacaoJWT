import { AppDataSource } from "../data-source";
import { Films } from "../entities/Films";

export const filmsRepository = AppDataSource.getRepository(Films)