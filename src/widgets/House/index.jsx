import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./House.css";
import { openModal} from "@/features/slice/modal/modalSlice";

const House = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Используем useSelector для получения списка домов из Redux
    const houses = useSelector(state => state.houses);
    const mainBuildingLevel = useSelector((state) => state.mainBuilding.level);
    const resources = useSelector(state => state.resources);
    const dispatch = useDispatch();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleHouseClick = (house) => {
        if (house.id === mainBuildingLevel + 1) {
            handleToggle();
            dispatch(openModal('upgrade'));
        }
    };

    const getHouseStyle = (house) => {
        if (house.id < mainBuildingLevel) {
            return "green"; // Уровни ниже
        } else if (house.id === mainBuildingLevel) {
            return "default";
        } else if (house.id === (mainBuildingLevel + 1)) {
            // Проверяем ресурсы для текущего уровня
            if (resources.wood >= house.wood && resources.stone >= house.stone) {
                return "yellow blurred"; // Согласован для улучшения
            } else {
                return "grey blurred"; // Недостаточно ресурсов
            }
        } else if (house.id > mainBuildingLevel) {
            return "red blurred"; // Уровни выше
        }

    };


    return (
        <div className="houses-wrapper">
            <span className="houses-toggle-btn" onClick={handleToggle}>
                {isOpen ? "Закрыть список домов" : "Показать дома"}
            </span>

            <div className={`houses-list-1 ${isOpen ? "houses-open" : "houses-closed"}`}>
                {houses.map(house => (
                    <div
                        key={house.id}
                        className={`house ${getHouseStyle(house)}`}
                        onClick={() => handleHouseClick(house)}
                    >
                        <img src={house.image} alt={house.name}/>
                        <div className="house-detail">
                            <h3>{house.name}</h3>
                            <div className={`house-resources ${house.stone === 0 && house.wood === 0 ? 'free' : ''}`}>
                                {house.stone > 0 ? (
                                    <p>⛏️{house.stone}</p>
                                ) : (
                                    <p>⛏️Бесплатно</p>
                                )}
                                {house.wood > 0 ? (
                                    <p>🌳{house.wood}</p>
                                ) : (
                                    <p>🌳Бесплатно</p>
                                )}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default House;