import { MAP_SIZE, SPAWN_OFFSET, MIN_SPAWN_DISTANCE } from "../settings.js";

export const generatePosition = () => {
    let x, z;

    // Генерация позиции до тех пор, пока координаты не окажутся на достаточном расстоянии от центра
    do {
        x = (Math.random() - 0.5) * (MAP_SIZE * 2 - SPAWN_OFFSET); // X
        z = (Math.random() - 0.5) * (MAP_SIZE * 2 - SPAWN_OFFSET); // Z
    } while (Math.abs(x) < MIN_SPAWN_DISTANCE && Math.abs(z) < MIN_SPAWN_DISTANCE);

    return [x, 2, z]; // Y (высота) остается фиксированным
};
