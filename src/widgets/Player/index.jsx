import {useGLTF, useAnimations, Text} from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Vector3, Quaternion } from "three";
import { useSelector, useDispatch } from 'react-redux';
import { setForward, setBackward, setLeft, setRight } from '@/features/slice/player/controlsSlice';

export function Player({ position, target, currentTarget, onReachTarget, onLeaveTarget }) {
    const { scene, animations } = useGLTF("/assets/player/scene.gltf");
    const { actions } = useAnimations(animations, scene);
    const rigidBodyRef = useRef();
    const speed = 3;
    const attackRange = 1.5;
    const stoppingDistance = 1;
    const [isInRange, setIsInRange] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [isManualControl, setIsManualControl] = useState(false);
    const inactivityTimeoutRef = useRef(null);

    const movement = useSelector((state) => state.controls.movement);
    const dispatch = useDispatch();

    const resetManualControl = () => {
        if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
        }
        inactivityTimeoutRef.current = setTimeout(() => {
            setIsManualControl(false);
        }, 2000);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "w":
                case "ArrowUp":
                case "ц":
                    dispatch(setForward(true));
                    setIsManualControl(true);
                    resetManualControl();
                    break;
                case "s":
                case "ArrowDown":
                case "ы":
                    dispatch(setBackward(true));
                    setIsManualControl(true);
                    resetManualControl();
                    break;
                case "a":
                case "ArrowLeft":
                case "ф":
                    dispatch(setLeft(true));
                    setIsManualControl(true);
                    resetManualControl();
                    break;
                case "d":
                case "ArrowRight":
                case "в":
                    dispatch(setRight(true));
                    setIsManualControl(true);
                    resetManualControl();
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.key) {
                case "w":
                case "ArrowUp":
                case "ц":
                    dispatch(setForward(false));
                    break;
                case "s":
                case "ArrowDown":
                case "ы":
                    dispatch(setBackward(false));
                    break;
                case "a":
                case "ArrowLeft":
                case "ф":
                    dispatch(setLeft(false));
                    break;
                case "d":
                case "ArrowRight":
                case "в":
                    dispatch(setRight(false));
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }
        };
    }, [dispatch]);

    useFrame(() => {
        if (!rigidBodyRef.current) return;

        const currentPosition = rigidBodyRef.current.translation();
        let moveDirection = new Vector3();

        // Если включено ручное управление, игнорируем автоматическое движение к цели
        if (!isManualControl && target && currentTarget?.id) {
            const targetVec = new Vector3(target[0], currentPosition.y, target[2]);
            const direction = targetVec.sub(currentPosition);
            const distance = direction.length();

            if (distance > stoppingDistance) {
                direction.normalize().multiplyScalar(speed);
                rigidBodyRef.current.setLinvel({ x: direction.x, y: 0, z: direction.z }, true);

                const angle = Math.atan2(direction.x, direction.z);
                const quaternion = new Quaternion();
                quaternion.setFromAxisAngle(new Vector3(0, 1, 0), angle);
                rigidBodyRef.current.setRotation(quaternion, true);

                if (!isMoving) {
                    setIsMoving(true);
                    actions["animation"].play();
                }
            } else {
                rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);

                if (isMoving) {
                    setIsMoving(false);
                    actions["animation"].stop();
                }
            }

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
        } else {
            // Ручное управление
            if (movement.forward) moveDirection.z -= 1;
            if (movement.backward) moveDirection.z += 1;
            if (movement.left) moveDirection.x -= 1;
            if (movement.right) moveDirection.x += 1;

            if (moveDirection.length() > 0) {
                moveDirection.normalize().multiplyScalar(speed);
                rigidBodyRef.current.setLinvel({ x: moveDirection.x, y: 0, z: moveDirection.z }, true);

                const angle = Math.atan2(moveDirection.x, moveDirection.z);
                const quaternion = new Quaternion();
                quaternion.setFromAxisAngle(new Vector3(0, 1, 0), angle);
                rigidBodyRef.current.setRotation(quaternion, true);

                if (!isMoving) {
                    setIsMoving(true);
                    actions["animation"].play();
                }
            } else {
                rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);

                if (isMoving) {
                    setIsMoving(false);
                    actions["animation"].stop();
                }
            }
        }
    });

    return (
        <RigidBody
            ref={rigidBodyRef}
            position={position}
            lockRotations
            colliders="ball"
            mass={0}
        >
            <primitive object={scene} scale={0.2} rotation={[0, Math.PI / 2, 0]}/>
        </RigidBody>
    );
}