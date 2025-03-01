import {MAP_SIZE, SPAWN_OFFSET} from "../settings.js";

export const generatePosition = () => [
    (Math.random() - 0.5) * (MAP_SIZE * 2 - SPAWN_OFFSET), // X
    2,                                                      // Y (высота)
    (Math.random() - 0.5) * (MAP_SIZE * 2 - SPAWN_OFFSET)  // Z
];