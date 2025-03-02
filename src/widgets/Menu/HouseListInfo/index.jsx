import "./HouseListInfo.css";
import { useSelector } from "react-redux";

export const HouseListInfo = () => {
    const houses = useSelector((state) => state.houses);
    const mainBuildingLevel = useSelector((state) => state.mainBuilding.level);

    return (
        <div className="houses-list">
            {houses.map((house) => {
                const isBlurred = house.id > mainBuildingLevel;

                return (
                    <div
                        key={house.id}
                        className={`house-item ${isBlurred ? "blurred" : ""}`}
                    >
                        <img src={house.image} alt={house.name} className="house-image" />
                        <div className="house-info">
                            <h3>{house.name}</h3>
                            <p>{house.info}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};