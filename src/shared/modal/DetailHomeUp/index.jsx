import "./DetailHomeUp.css";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/features/slice/modal/modalSlice";

const DetailHomeUp = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.modals.detailHome);
    const houses = useSelector((state) => state.houses);
    const mainBuildingLevel = useSelector((state) => state.mainBuilding.level);

    // Найти текущий дом по уровню
    const currentHouse = houses.find((house) => house.id === mainBuildingLevel);

    return (
        <div className={`detail-home-modal ${isOpen ? 'open' : ''}`}>
                <div className="modal-content">
                    <h2>{currentHouse.name}</h2>
                    <img src={currentHouse.image} alt={currentHouse.name} className="house-image" />
                    <p>{currentHouse.info}</p>
                    <button onClick={() => dispatch(closeModal("detailHome"))}>OK</button>
                </div>
        </div>
    );
};

export default DetailHomeUp;