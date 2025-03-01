import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';

export function Player({ position, target, currentTarget, onReachTarget, onLeaveTarget }) {
    const { scene } = useGLTF('/assets/player/scene.gltf');
    const rigidBodyRef = useRef();
    const speed = 3;
    const attackRange = 1.5;
    const stoppingDistance = 1; // Дистанция остановки равна радиусу атаки
    const [isInRange, setIsInRange] = useState(false);

    useFrame(() => {
        if (!rigidBodyRef.current || !target || !currentTarget.id) return;

        const currentPosition = rigidBodyRef.current.translation();
        const targetVec = new Vector3(target[0], currentPosition.y, target[2]);
        const direction = targetVec.sub(currentPosition);
        const distance = direction.length();

        // Останавливаемся на заданной дистанции
        if (distance > stoppingDistance) {
            direction.normalize().multiplyScalar(speed);
            rigidBodyRef.current.setLinvel({
                x: direction.x,
                y: 0,
                z: direction.z
            }, true);
        } else {
            // Полная остановка при достижении дистанции
            rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        }

        // Проверка зоны атаки с небольшим буфером
        const attackBuffer = 0.2;
        if (distance <= attackRange + attackBuffer) {
            if (!isInRange) {
                setIsInRange(true);
                onReachTarget(currentTarget.id, currentTarget.type);
            }
        } else {
            if (isInRange) {
                setIsInRange(false);
                onLeaveTarget();
            }
        }
    });

    return (
        <RigidBody
            ref={rigidBodyRef}
            position={position}
            lockRotations
            colliders="ball"
            mass={0} // Уменьшаем массу для меньшего воздействия
        >
            <primitive object={scene} scale={0.5} />
        </RigidBody>
    );
}