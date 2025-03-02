import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {closeModal, openModal} from '@/features/slice/modal/modalSlice';
import './UpgradeModal.css';
import {setMainBuildingLevel} from "@/features/slice/mainBuilding/mainBuildingSlice";
import {subtractResource} from "@/features/slice/resource/resourcesSlice";
import {setWinter} from "@/features/slice/winter/winterSlice.js";

const UpgradeModal = () => {
    const isOpen = useSelector(state => state.modal.modals.upgrade);

    const houses = useSelector(state => state.houses);
    const mainBuildingLevel = useSelector((state) => state.mainBuilding.level);
    const resources = useSelector(state => state.resources);
    const dispatch = useDispatch();

    const nextHouse = houses.find(house => house.id === mainBuildingLevel + 1);
    const canUpgrade = nextHouse && resources.wood >= nextHouse.wood && resources.stone >= nextHouse.stone;


    const onUpgrade = () => {
        if (!canUpgrade) return;
        dispatch(setMainBuildingLevel(mainBuildingLevel + 1));
        dispatch(subtractResource({ type: 'wood', amount: nextHouse.wood }));
        dispatch(subtractResource({ type: 'stone', amount: nextHouse.stone }));
        if (mainBuildingLevel === 3){
            dispatch(setWinter(true));
        }
        dispatch(openModal('detailHome'))
        dispatch(closeModal('upgrade'));
    };


    return (
        <div className={`upgrade-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h3>Улучшение здания</h3>
                {nextHouse ? (
                    <>
                        <p>Требуется для улучшения:</p>
                        <p>🌳 Дерево: {nextHouse.wood}</p>
                        <p>⛏️ Камень: {nextHouse.stone}</p>
                        <div className="modal-buttons">
                            <button onClick={onUpgrade} disabled={!canUpgrade}>
                                Улучшить
                            </button>
                            <button onClick={() => dispatch(closeModal('upgrade'))}>Отмена</button>
                        </div>
                    </>
                ) : (
                    <p>Вы достигли максимального уровня!</p>
                )}
                <button className="close-btn" onClick={() => dispatch(closeModal('upgrade'))}>×</button>
            </div>
        </div>
    );
};

export default UpgradeModal;
