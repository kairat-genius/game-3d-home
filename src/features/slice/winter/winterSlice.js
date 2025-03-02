
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snow: false,
};

export const winterSlice = createSlice({
    name: 'winter',
    initialState,
    reducers: {
        setWinter: (state, action) => {
            state.snow = action.payload;
        },
    },
});

export const { setWinter } = winterSlice.actions;

export default winterSlice.reducer;
