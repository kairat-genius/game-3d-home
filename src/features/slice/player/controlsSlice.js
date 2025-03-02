// features/controls/controlsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movement: {
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false
    },
    // Можно добавить другие элементы управления (например, touch)
};

const controlsSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        setForward: (state, action) => {
            state.movement.forward = action.payload;
        },
        setBackward: (state, action) => {
            state.movement.backward = action.payload;
        },
        setLeft: (state, action) => {
            state.movement.left = action.payload;
        },
        setRight: (state, action) => {
            state.movement.right = action.payload;
        },
        setJump: (state, action) => {
            state.movement.jump = action.payload;
        },
        // Можно добавить другие редьюсеры для touch-управления
    },
});

export const { setForward, setBackward, setLeft, setRight, setJump } = controlsSlice.actions;
export default controlsSlice.reducer;