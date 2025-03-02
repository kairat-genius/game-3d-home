
import { createSlice } from '@reduxjs/toolkit';
import { houses } from "@/features/slice/houses/default.js";

export const housesSlice = createSlice({
    name: 'houses',
    initialState: houses,
});


export default housesSlice.reducer;
