import {useSelector} from "react-redux";

const Save = () => {
    const mainBuildingLevel = useSelector((state) => state.mainBuilding.level);
    const resources = useSelector(state => state.resources);

    const handleSave = () => {
        const dataToSave = {
            mainBuildingLevel,
            resources
        };

        // Сохраняем данные в localStorage
        localStorage.setItem('gameData', JSON.stringify(dataToSave));
        alert('Игра сохранена!');
    };

    return (
        <button onClick={handleSave}>
            Сохранить
        </button>
    );
};

export default Save;