import { Group } from "three";

export default function Container() {
    return (
        <group>

            <mesh>
                <boxGeometry args={[6, 2.6, 2.4]} />

                <meshStandardMaterial
                    color="#0000ffff"
                />
            </mesh>

        </group>
    );
}