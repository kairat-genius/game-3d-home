import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';

function Snow() {
    const snowRef = useRef();

    const positions = useMemo(() => {
        return Array.from({ length: 1000 }, () => [
            Math.random() * 100 - 50,
            Math.random() * 50,
            Math.random() * 100 - 50,
        ]).flat();
    }, []);

    useFrame(() => {
        if (snowRef.current) {
            const positionsArray = snowRef.current.geometry.attributes.position.array;

            // Обновляем позиции снежинок
            for (let i = 0; i < positionsArray.length; i += 3) {
                positionsArray[i + 1] -= 0.05;
                positionsArray[i] += Math.sin(positionsArray[i + 1] * 0.1) * 0.05;

                if (positionsArray[i + 1] < -10) {
                    positionsArray[i + 1] = 10;
                }
            }

            snowRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={snowRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={new Float32Array(positions)}
                    itemSize={3}
                    count={positions.length / 3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.2} color="white" transparent opacity={0.8} />
        </points>
    );
}

export default Snow;