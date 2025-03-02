import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky} from '@react-three/drei';
import { Physics, CuboidCollider } from '@react-three/rapier';
import { Background } from "../widgets/Background/index.jsx";
import { Player } from "../widgets/Player/index.jsx";
import {generatePosition} from "../shared/utils/generatePosition.js";
import ResourcesUI from "../widgets/ResourcesUI/index.jsx";
import Menu from "../widgets/Menu/index.jsx";
import House from "../widgets/House/index.jsx";
import {Resource} from "../widgets/Resource/index.jsx";
import {MainBuilding} from "@/widgets/MainBuilding/index.jsx";
import {useDispatch, useSelector} from 'react-redux';
import { addResource} from '@/features/slice/resource/resourcesSlice.js';
import {STONE, STONE_COUNT, STONE_SPEED, WOOD, WOOD_COUNT, WOOD_SPEED} from "@/shared/settings.js";
import UpgradeModal from "@/shared/modal/UpgradeModal/index.jsx";
import {CurrentLevel} from "@/shared/CurrentLevel/index.jsx"
import TouchControls from "@/widgets/TouchControls/index.jsx";
import DetailHomeUp from "@/shared/modal/DetailHomeUp/index.jsx";
import SavedData from "@/widgets/SavedData/index.jsx";
import Snow from "@/widgets/weather/Snow/index.jsx";
import {BackgroundMusic} from "@/widgets/BackgroundMusic";



function Game() {
    const dispatch = useDispatch();
    const winterSnow = useSelector((state) => state.winter.snow);

    // Состояния для ресурсов
    const [trees, setTrees] = useState(
        Array(WOOD_COUNT).fill().map(() => ({
            position: generatePosition(),
            id: Math.random(),
            health: WOOD_SPEED,
            type: 'tree'
        }))
    );

    const [stones, setStones] = useState(
        Array(STONE_COUNT).fill().map(() => ({
            position: generatePosition(),
            id: Math.random(),
            health: STONE_SPEED,
            type: 'stone'
        }))
    );

    const [targetPosition, setTargetPosition] = useState(null);
    const [currentTarget, setCurrentTarget] = useState({ id: null, type: null });
    const [attackInterval, setAttackInterval] = useState(null);

    // Обработчик клика по ресурсу
    const handleResourceClick = (id, position, type) => {
        stopAttack();
        setTargetPosition(position);
        setCurrentTarget({ id, type });
    };

    // Запуск
    const startAttack = (targetId, targetType) => {
        if (attackInterval || targetId !== currentTarget.id) return;

        const interval = setInterval(() => {
            const updater = {
                tree: setTrees,
                stone: setStones
            }[targetType];

            updater(prev =>
                prev.map(item => {
                    if (item.id === targetId) {
                        const newHealth = item.health - 1;

                        if (newHealth <= 0) {
                            const amount = targetType === 'tree' ? WOOD : STONE;
                            dispatch(addResource({ type: targetType === 'tree' ? 'wood' : 'stone', amount }));
                            stopAttack();
                            setCurrentTarget({ id: null, type: null });
                            setTargetPosition(null);
                            return null;
                        }
                        return { ...item, health: newHealth };
                    }
                    return item;
                }).filter(Boolean)
            );
        }, 1000);

        setAttackInterval(interval);
    };

    const stopAttack = () => {
        if (attackInterval) {
            clearInterval(attackInterval);
            setAttackInterval(null);
        }
    };

    useEffect(() => {
        return () => stopAttack();
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [10, 10, 10], fov: 75 }}>

                <ambientLight intensity={0.7} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <Sky
                    sunPosition={[100, 10, 100]}
                    inclination={0.6}
                    azimuth={0.25}
                    distance={450000}
                    turbidity={10}
                    rayleigh={2}
                    mieCoefficient={0.005}
                    mieDirectionalG={0.8}
                />
                <Physics>
                    <Background />
                    <MainBuilding/>

                    <Player
                        position={[0, 2, 10]}
                        target={targetPosition}
                        currentTarget={currentTarget}
                        onReachTarget={startAttack}
                        onLeaveTarget={stopAttack}
                    />

                    {trees.map((tree) => (
                        <Resource
                            key={tree.id}
                            type="tree"
                            id={tree.id}
                            position={tree.position}
                            health={tree.health}
                            onHit={handleResourceClick}
                        />
                    ))}

                    {stones.map((stone) => (
                        <Resource
                            key={stone.id}
                            type="stone"
                            id={stone.id}
                            position={stone.position}
                            health={stone.health}
                            onHit={handleResourceClick}
                        />
                    ))}

                    <CuboidCollider
                        position={[0, 1, 0]}
                        args={[50, 1, 50]}
                        restitution={0.2}
                        friction={1}

                    />
                </Physics>

                <OrbitControls />
                {winterSnow && <Snow />}
            </Canvas>
            <CurrentLevel/>
            <Menu/>
            <House/>
            <UpgradeModal/>
            <DetailHomeUp/>
            <TouchControls/>
            <SavedData/>
            <BackgroundMusic />

           <ResourcesUI/>
        </div>
    );
}

export default Game;