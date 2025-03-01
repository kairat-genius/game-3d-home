import { useGLTF } from '@react-three/drei';
import {RigidBody} from "@react-three/rapier";
import {MAP_SIZE} from "../../shared/settings.js";

export function Background() {
    const { scene } = useGLTF('/assets/background/scene.gltf');
    return (
        <RigidBody type="fixed" colliders="trimesh">
            <primitive
                object={scene}
                position={[0, 0, 0]}
                scale={[MAP_SIZE/2, MAP_SIZE/2, MAP_SIZE/2]}
            />
        </RigidBody>
    );
}

