
import { useSelector} from "react-redux";

import "./CurrentLevel.css";

export const CurrentLevel = () => {

    const mainBuildingLevel = useSelector((state) => state.mainBuilding.level);

    return (
            <span className="level-badge">
                 🏠 Уровень {mainBuildingLevel}
            </span>

    );
};
