import { useSelector } from "react-redux";
import './ResourcesUI.css';

const ResourcesUI = () => {
    const resources = useSelector(state => state.resources);

    return (
        <div className="resources-ui">
            <div className="resource-item">
                <span className="icon">🌳</span>
                <span>{resources.wood}</span>
            </div>
            <div className="resource-item">
                <span className="icon">⛏️</span>
                <span>{resources.stone}</span>
            </div>
        </div>
    );
};

export default ResourcesUI;
