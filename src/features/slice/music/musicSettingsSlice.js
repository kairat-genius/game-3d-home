import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    volume: 0.5,
    isMusicEnabled: false,
};

const musicSettingsSlice = createSlice({
    name: 'musicSettings',
    initialState,
    reducers: {
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        toggleMusic: (state) => {
            state.isMusicEnabled = !state.isMusicEnabled;
        },
    },
});

export const { setVolume, toggleMusic } = musicSettingsSlice.actions;
export default musicSettingsSlice.reducer;