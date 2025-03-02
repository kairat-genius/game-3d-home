
import { configureStore } from '@reduxjs/toolkit';
import housesReducer from '@/features/slice/houses/housesSlice';
import mainBuildingReducer from '@/features/slice/mainBuilding/mainBuildingSlice';
import resourcesReducer from "@/features/slice/resource/resourcesSlice"
import modalReducer from "@/features/slice/modal/modalSlice"
import controlsReducer from "@/features/slice/player/controlsSlice"
import winterReducer from "@/features/slice/winter/winterSlice"
import musicSettingsReducer from '@/features/slice/music/musicSettingsSlice';

export const store = configureStore({
    reducer: {
        houses: housesReducer,
        mainBuilding: mainBuildingReducer,
        resources: resourcesReducer,
        modal: modalReducer,
        controls: controlsReducer,
        winter: winterReducer,
        musicSettings: musicSettingsReducer,
    },
});
