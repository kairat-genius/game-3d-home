
import { Text, useGLTF } from '@react-three/drei';
import {RigidBody} from '@react-three/rapier';


// Универсальный компонент ресурса
export function Resource({ type, position, health, onHit, id }) {
    const models = {
        tree: '/assets/tree/derevo.gltf',
        stone: '/assets/stone/kamen.gltf'
    };
    const { scene } = useGLTF(models[type]);

    return (
        <RigidBody position={position} colliders="hull" type="fixed">
            <group onPointerDown={() => onHit(id, position, type)}>
                <primitive object={scene.clone()} scale={type === 'tree' ? 0.8 : 1.5} />
                <Text position={[0, type === 'tree' ? 3 : 1.5, 0]} fontSize={0.5} color="white">
                    {health}
                </Text>
            </group>
        </RigidBody>
    );
}

