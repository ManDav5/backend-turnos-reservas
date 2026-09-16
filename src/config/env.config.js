import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars=["PORT","NODE_ENV"];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error("Error de configuración: Variable de entorno indefinida '${envVar}' en el archivo .env");
    }
}

export const config = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV
}