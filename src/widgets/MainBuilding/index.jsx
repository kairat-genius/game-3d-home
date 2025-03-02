import {useDispatch, useSelector} from 'react-redux';
import { Text, useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import {openModal} from "@/features/slice/modal/modalSlice";

// компонент главного дома
export function MainBuilding() {
    const mainBuildingLevel = useSelector((state) => state.mainBuilding.level);
    const { scene } = useGLTF(`/assets/main-building/${mainBuildingLevel}/dom.gltf`);
    const dispatch = useDispatch();

    const scale = mainBuildingLevel === 3 ? 2 : 1;

    return (
        <RigidBody key={mainBuildingLevel} position={[0, 1.9, 0]} colliders="hull" type="fixed" lockRotations>
            <group>
                <primitive object={scene} scale={scale} onClick={() => dispatch(openModal('upgrade'))} />
                <Text position={[0, 3, 0]} fontSize={0.5} color="white">
                    {mainBuildingLevel} уровень
                </Text>
            </group>
        </RigidBody>
    );
}
