import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { RigidBody } from '@react-three/rapier';
import { useSelector } from "react-redux";
import {useGLTF} from "@react-three/drei";

export function Background() {
    const mainBuildingLevel = useSelector((state) => state.mainBuilding.level);

    const materials = useLoader(MTLLoader, '/assets/background/leto/Karta_leto.mtl');
    const obj = useLoader(OBJLoader, '/assets/background/leto/Karta_leto.obj', (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    const { scene } = useGLTF("/assets/background/zima/sneg.gltf");

    return (
        <RigidBody type="fixed" colliders="trimesh">
            {mainBuildingLevel === 4 ? (
                <primitive
                    object={scene}
                    position={[0, 1, 0]}
                    scale={1}
                />
            ) : (
                <primitive
                    object={obj}
                    position={[0, 1, 0]}
                    scale={1}
                />
            )}
        </RigidBody>
    );
}