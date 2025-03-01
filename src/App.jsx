import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, useGLTF } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { Background } from "./widgets/Background";
import { Player } from "./widgets/Player";
import {generatePosition} from "./shared/utils/generatePosition.js";
import ResourcesUI from "./widgets/ResourcesUI";

// Универсальный компонент ресурса
function Resource({ type, position, health, onHit, id }) {
    const models = {
        tree: '/assets/tree/model.gltf',
        stone: '/assets/stone/Rook.gltf' // Проверьте путь к модели
    };
    const { scene } = useGLTF(models[type]);

    return (
        <RigidBody position={position} colliders="hull" lockRotations mass={5}>
            <group onPointerDown={() => onHit(id, position, type)}>
                <primitive object={scene.clone()} scale={1.5} />
                <Text position={[0, 2, 0]} fontSize={0.5} color="white">
                    {health}
                </Text>
            </group>
        </RigidBody>
    );
}

function Game() {
    const [resources, setResources] = useState({ wood: 0, stone: 0 });


    // Состояния для ресурсов
    const [trees, setTrees] = useState(
        Array(20).fill().map(() => ({
            position: generatePosition(),
            id: Math.random(),
            health: 10,
            type: 'tree'
        }))
    );

    const [stones, setStones] = useState(
        Array(20).fill().map(() => ({
            position: generatePosition(),
            id: Math.random(),
            health: 15,
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

    // Запуск атаки
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
                            setResources(r => ({
                                ...r,
                                [targetType === 'tree' ? 'wood' : 'stone']:
                                r[targetType === 'tree' ? 'wood' : 'stone'] +
                                (targetType === 'tree' ? 5 : 3)
                            }));
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
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <Physics>
                    <Background />

                    <Player
                        position={[0, 2, 0]}
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
                        position={[0, -1, 0]}
                        args={[50, 1, 50]}
                        restitution={0.2}
                        friction={1}

                    />
                </Physics>

                <OrbitControls />
            </Canvas>

           <ResourcesUI resources={resources}/>
        </div>
    );
}

export default Game;