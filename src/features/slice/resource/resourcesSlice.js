import { createSlice } from '@reduxjs/toolkit';
import {STONE_COUNT, WOOD_COUNT} from "@/shared/settings.js";

const initialState = {
    wood: 0,
    stone: 0,
    tree: WOOD_COUNT,
    rock: STONE_COUNT,
};

const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        addResource: (state, action) => {
            const { type, amount } = action.payload;
            state[type] += amount;

            if (type === 'wood') {
                state.tree = Math.max(0, state.tree - 1);
            } else if (type === 'stone') {
                state.rock = Math.max(0, state.rock - 1);
            }
        },
        updateResources: (state, action) => {
            const { wood, stone, tree, rock } = action.payload;


            if (wood !== undefined) state.wood = wood;
            if (stone !== undefined) state.stone = stone;
            if (tree !== undefined) state.tree = tree;
            if (rock !== undefined) state.rock = rock;
        },
        subtractResource: (state, action) => {
            const { type, amount } = action.payload;
            state[type] = Math.max(0, state[type] - amount);
        },
    },
});

export const {addResource, subtractResource, updateResources} = resourcesSlice.actions;

export default resourcesSlice.reducer;
