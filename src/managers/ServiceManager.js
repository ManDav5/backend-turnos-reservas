import fs from "fs/promises";
import {randomUUID} from "node:crypto"

export class ServiceManager {
    constructor(filePath){
        this.path=filePath;
    }

    async getServices(){
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
            
        } catch (error) {
            return [];
        }
    }

    async getServiceById(id){
        const services=await this.getServices();
        const service= services.find((s) => s.id === id);
        if (!service){
            console.warn("servicio no encontrado.")
            return null;
        }
        return service;
    }

    async addService({name, description, duration, price, category, available}){
        if (
            !name ||
            !description ||
            duration === undefined ||
            price === undefined ||
            !category ||
            available === undefined
        )
        {
            throw new Error("todos los campos son obligatorios.")
        }

        const services = await this.getServices()

        const newService = {
            id: randomUUID(),
            name,
            description,
            duration,
            price,
            category,
            available
        };

        services.push(newService);

        await fs.writeFile(this.path, JSON.stringify(services,null,2), "utf-8");

        return newService;
    }

    async updateService(id, updatedData) {
        const services = await this.getServices();
        const index = services.findIndex((s) => s.id === id);
        if (index === -1) {
            console.warn("Servicio no encontrado");
            return null;
        };

        services[index] = {
            ...services[index],
            ...updatedData,
            id
        };

        await fs.writeFile(this.path, JSON.stringify(services,null,2), "utf-8");
        return services[index];
    }

    async deleteService(id) {
        const services = await this.getServices();
        const serviceIndex = services.findIndex((s)=> s.id ===id);
        if (serviceIndex ===-1){
            console.warn ("Servicio no encontrado");
            return null;
        }

        const [deletedService] = services.splice(serviceIndex,1);
        await fs.writeFile(this.path, JSON.stringify(services, null,2), "utf-8");
        return deletedService;
    }

}
