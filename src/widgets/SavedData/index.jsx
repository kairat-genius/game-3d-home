import {useEffect} from "react";
import {setMainBuildingLevel} from "@/features/slice/mainBuilding/mainBuildingSlice";

import {useDispatch} from "react-redux";
import {updateResources} from "@/features/slice/resource/resourcesSlice";

const SavedData = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const savedData = localStorage.getItem('gameData');

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            dispatch(setMainBuildingLevel(parsedData.mainBuildingLevel));
            dispatch(updateResources(parsedData.resources));
        }
    }, []);

    return (
        <div>
        </div>
    );
};

export default SavedData;