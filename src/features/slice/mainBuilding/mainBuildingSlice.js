
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    level: 1, // Начальный уровень главного дома
};

export const mainBuildingSlice = createSlice({
    name: 'mainBuilding',
    initialState,
    reducers: {
        setMainBuildingLevel: (state, action) => {
            state.level = action.payload; // Обновление уровня
        },
    },
});

export const { setMainBuildingLevel } = mainBuildingSlice.actions;

export default mainBuildingSlice.reducer;
