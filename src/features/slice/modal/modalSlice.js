import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modals: {
        upgrade: false,
        detailHome: false,
    }
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modals[action.payload] = true;
        },
        closeModal: (state, action) => {
            state.modals[action.payload] = false;
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
