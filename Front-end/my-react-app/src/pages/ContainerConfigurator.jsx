import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox, } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import CONTAINERS from "../assets/containers";
// ─── Data ─────────────────────────────────────────────────────────────────────
const { CATEGORIES, SIZES, PRESET_COLORS } = CONTAINERS;

// ─── Corrugated texture generator (canvas → texture) ──────────────────────────
function makeRibTexture(baseColor, axis = "x") {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = axis === "x" ? size : size / 4;
  c.height = size;
  const ctx = c.getContext("2d");

  const col = new THREE.Color(baseColor);
  const r = Math.round(col.r * 255), g = Math.round(col.g * 255), b = Math.round(col.b * 255);

  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(0, 0, c.width, c.height);

  const ribW = axis === "x" ? size / 18 : c.width;
  const count = axis === "x" ? 18 : 1;

  for (let i = 0; i < count; i++) {
    const x = i * ribW;
    // shadow groove
    const grad = ctx.createLinearGradient(x, 0, x + ribW, 0);
    grad.addColorStop(0, `rgba(0,0,0,0.0)`);
    grad.addColorStop(0.1, `rgba(0,0,0,0.18)`);
    grad.addColorStop(0.3, `rgba(0,0,0,0.28)`);
    grad.addColorStop(0.5, `rgba(0,0,0,0.10)`);
    grad.addColorStop(0.7, `rgba(255,255,255,0.12)`);
    grad.addColorStop(0.9, `rgba(255,255,255,0.06)`);
    grad.addColorStop(1.0, `rgba(0,0,0,0.0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, ribW, c.height);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function makeBumpTexture(axis = "x") {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = axis === "x" ? size : size / 4;
  c.height = size;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, c.width, c.height);
  const ribW = size / 18;
  for (let i = 0; i < 18; i++) {
    const x = i * ribW;
    const grad = ctx.createLinearGradient(x, 0, x + ribW, 0);
    grad.addColorStop(0, "#808080");
    grad.addColorStop(0.25, "#404040");
    grad.addColorStop(0.5, "#808080");
    grad.addColorStop(0.75, "#c0c0c0");
    grad.addColorStop(1, "#808080");
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, ribW, c.height);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// ─── Container 3D model ───────────────────────────────────────────────────────
function ContainerModel({ catId, L, H, W, color }) {
  const groupRef = useRef();
  const fw = 0.055;

  const sideTex = makeRibTexture(color, "x");
  const bumpTex = makeBumpTexture("x");
  const frontTex = makeRibTexture(color, "z");

  sideTex.repeat.set(L * 2.2, H * 2.2);
  bumpTex.repeat.set(L * 2.2, H * 2.2);
  frontTex.repeat.set(W * 2.2, H * 2.2);

  const bodyMat = new THREE.MeshStandardMaterial({
    map: sideTex,
    bumpMap: bumpTex,
    bumpScale: 0.012,
    metalness: 0.05,
    roughness: 0.78,
  });
  const frontMat = new THREE.MeshStandardMaterial({
    map: frontTex,
    bumpMap: bumpTex,
    bumpScale: 0.012,
    metalness: 0.05,
    roughness: 0.78,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: "#2a2e35",
    metalness: 0.45,
    roughness: 0.55,
  });
  const darkMat = new THREE.MeshStandardMaterial({ color: "#1a1c20", roughness: 0.9 });
  const handleMat = new THREE.MeshStandardMaterial({ color: "#4a5260", metalness: 0.65, roughness: 0.35 });
  const floorMat = new THREE.MeshStandardMaterial({ color: "#3a3000", roughness: 0.95 });
  const roofMat = new THREE.MeshStandardMaterial({ color: "#2e3238", metalness: 0.2, roughness: 0.7 });

  const hl = L / 2, hw = W / 2, hh = H / 2;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── Side panels (left & right) ── */}
      <mesh material={bodyMat} castShadow receiveShadow position={[0, hh, -hw + 0.009]}>
        <boxGeometry args={[L - fw * 2, H - fw * 2, 0.016]} />
      </mesh>
      <mesh material={bodyMat} castShadow receiveShadow position={[0, hh, hw - 0.009]}>
        <boxGeometry args={[L - fw * 2, H - fw * 2, 0.016]} />
      </mesh>

      {/* ── Front panel ── */}
      <mesh material={frontMat} castShadow receiveShadow position={[-hl + 0.008, hh, 0]}>
        <boxGeometry args={[0.016, H - fw * 2, W - fw * 2]} />
      </mesh>

      {/* ── Door panels (rear) ── */}
      <mesh material={frontMat} castShadow receiveShadow position={[hl - 0.008, hh, W * 0.26]}>
        <boxGeometry args={[0.016, H - fw * 2 - 0.01, W * 0.46]} />
      </mesh>
      <mesh material={frontMat} castShadow receiveShadow position={[hl - 0.008, hh, -W * 0.26]}>
        <boxGeometry args={[0.016, H - fw * 2 - 0.01, W * 0.46]} />
      </mesh>

      {/* ── Roof ── */}
      {catId !== "opentop" && (
        <mesh material={roofMat} castShadow receiveShadow position={[0, H - fw / 2, 0]}>
          <boxGeometry args={[L - fw * 2, fw * 0.6, W - fw * 2]} />
        </mesh>
      )}

      {/* ── Floor ── */}
      <mesh material={floorMat} castShadow receiveShadow position={[0, fw * 0.4, 0]}>
        <boxGeometry args={[L - fw * 2, fw * 0.65, W - fw * 2]} />
      </mesh>

      {/* ── Frame: 4 vertical corner posts ── */}
      {[[-hl, -hw], [hl, -hw], [-hl, hw], [hl, hw]].map(([px, pz], i) => (
        <mesh key={i} material={frameMat} castShadow position={[px, hh, pz]}>
          <boxGeometry args={[fw, H + 0.01, fw]} />
        </mesh>
      ))}

      {/* ── Frame: top & bottom rails (Z axis) ── */}
      {[0, H].map((ry, i) => (
        <group key={i}>
          <mesh material={frameMat} castShadow position={[0, ry, hw]}><boxGeometry args={[L + 0.01, fw * 0.65, fw * 0.65]} /></mesh>
          <mesh material={frameMat} castShadow position={[0, ry, -hw]}><boxGeometry args={[L + 0.01, fw * 0.65, fw * 0.65]} /></mesh>
          <mesh material={frameMat} castShadow position={[hl, ry, 0]}><boxGeometry args={[fw * 0.65, fw * 0.65, W + 0.01]} /></mesh>
          <mesh material={frameMat} castShadow position={[-hl, ry, 0]}><boxGeometry args={[fw * 0.65, fw * 0.65, W + 0.01]} /></mesh>
        </group>
      ))}

      {/* ── Door center divider ── */}
      <mesh material={darkMat} position={[hl + 0.004, hh, 0]}>
        <boxGeometry args={[0.008, H - fw * 2, 0.01]} />
      </mesh>

      {/* ── Door locking bars ── */}
      {[W * 0.22, -W * 0.22].map((dz, i) => (
        <group key={i}>
          <mesh material={handleMat} castShadow position={[hl + 0.022, hh, dz]}>
            <boxGeometry args={[0.016, H * 0.52, 0.016]} />
          </mesh>
          <mesh material={handleMat} castShadow position={[hl + 0.028, hh * 0.88, dz]}>
            <boxGeometry args={[0.038, 0.038, 0.038]} />
          </mesh>
          <mesh material={handleMat} castShadow position={[hl + 0.028, hh * 1.12, dz]}>
            <boxGeometry args={[0.038, 0.038, 0.038]} />
          </mesh>
        </group>
      ))}

      {/* ── Fork pockets ── */}
      {[-L * 0.25, L * 0.25].map((px, i) =>
        [-hw * 0.45, hw * 0.45].map((pz, j) => (
          <mesh key={`${i}-${j}`} material={darkMat} position={[px, fw * 0.28, pz]}>
            <boxGeometry args={[0.2, fw * 0.5, 0.12]} />
          </mesh>
        ))
      )}

      {/* ── CSC plate (front) ── */}
      <mesh material={new THREE.MeshStandardMaterial({ color: "#ddd", metalness: 0.3, roughness: 0.6 })} position={[-hl - 0.003, H * 0.65, 0]}>
        <boxGeometry args={[0.006, 0.1, 0.16]} />
      </mesh>

      {/* ── Reefer unit ── */}
      {catId === "reefer" && (
        <group position={[-hl - 0.13, hh, 0]}>
          <mesh material={new THREE.MeshStandardMaterial({ color: "#1e2530", metalness: 0.2, roughness: 0.6 })} castShadow>
            <boxGeometry args={[0.22, H * 0.9, W * 0.9]} />
          </mesh>
          {[-3, -1.5, 0, 1.5, 3].map((fi, i) => (
            <mesh key={i} material={new THREE.MeshStandardMaterial({ color: "#3a4455", metalness: 0.5, roughness: 0.5 })} position={[0.06, 0, fi * W * 0.15]}>
              <boxGeometry args={[0.05, H * 0.72, 0.012]} />
            </mesh>
          ))}
        </group>
      )}

      {/* ── Open top bows ── */}
      {catId === "opentop" && Array.from({ length: Math.round(L / 0.3) + 1 }, (_, i) => (
        <mesh key={i} material={new THREE.MeshStandardMaterial({ color: "#5a3e22", roughness: 0.9 })}
          position={[-hl + fw + i * (L - fw * 2) / Math.round(L / 0.3), H + 0.016, 0]} castShadow>
          <boxGeometry args={[0.028, 0.028, W + 0.015]} />
        </mesh>
      ))}

      {/* ── Tank cylinder ── */}
      {catId === "tank" && (
        <mesh material={new THREE.MeshStandardMaterial({ color: color, metalness: 0.55, roughness: 0.35 })}
          rotation={[0, 0, Math.PI / 2]} castShadow position={[0, H * 0.5 + W * 0.38 * 0.06, 0]}>
          <cylinderGeometry args={[W * 0.4, W * 0.4, L * 0.88, 36]} />
        </mesh>
      )}
    </group>
  );
}

// ─── Auto-rotate wrapper ───────────────────────────────────────────────────────
function AutoRotate({ children, enabled }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (enabled && ref.current) ref.current.rotation.y += delta * 0.4;
  });
  return <group ref={ref}>{children}</group>;
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ cat, szKey, color, autoRotate }) {
  const sz = SIZES[szKey];
  return (
    <>
      <Environment preset="city" />

      {/* Main sun */}
      <directionalLight
        position={[4, 8, 5]} intensity={2.2} castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5} shadow-camera-far={30}
        shadow-camera-left={-6} shadow-camera-right={6}
        shadow-camera-top={6} shadow-camera-bottom={-6}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-4, 4, -3]} intensity={0.7} color="#d0e8ff" />
      <directionalLight position={[0, 3, -8]} intensity={0.3} color="#ffe8d0" />
      <ambientLight intensity={0.5} />

      <ContactShadows
        position={[0, -0.005, 0]}
        opacity={0.45} scale={12} blur={2.5} far={6} color="#334"
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#eaecf0" roughness={0.9} />
      </mesh>

      <AutoRotate enabled={autoRotate}>
        <group position={[-(sz.L * 0.15), 0, 0]}>
          <ContainerModel catId={cat.id} L={sz.L} H={sz.H} W={sz.W} color={color} />
        </group>
      </AutoRotate>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ContainerConfigurator() {
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [sz, setSz] = useState("20DC");
  const [color, setColor] = useState("#1a3a6b");
  const [autoRotate, setAutoRotate] = useState(true);
  const navigate = useNavigate();
  const szData = SIZES[sz];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-800">Container Configurator</h1>
          <p className="text-xs text-slate-400">Tùy chỉnh container theo nhu cầu của bạn</p>
        </div>
        <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
          {cat.name} · {szData.label}
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Category ── */}
        <div className="w-48 bg-white border-r border-slate-200 p-3 flex flex-col gap-1.5 overflow-y-auto flex-shrink-0">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Loại container</p>
          {CATEGORIES.map(c => (
            <button key={c.id}
              onClick={() => { setCat(c); setColor(c.color); if (!c.sizes.includes(sz)) setSz(c.sizes[0]); }}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left transition-all ${cat.id === c.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:bg-slate-50"
                }`}>
              <span className="text-sm">{c.icon}</span>
              <div>
                <div className={`text-[11px] font-medium leading-tight ${cat.id === c.id ? "text-blue-700" : "text-slate-700"}`}>{c.name}</div>
                <div className="text-[9.5px] text-slate-400 leading-tight mt-0.5">{c.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* ── CENTER: Canvas ── */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative" style={{ minHeight: 400 }}>
            <Canvas
              shadows
              camera={{ position: [4.5, 2.2, 5.5], fov: 38 }}
              style={{ background: "linear-gradient(160deg, #dce8f4 0%, #eef2f8 100%)" }}
              gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
            >
              <Suspense fallback={null}>
                <Scene cat={cat} szKey={sz} color={color} autoRotate={autoRotate} />
                <OrbitControls
                  enablePan={false}
                  minDistance={2.5} maxDistance={12}
                  minPolarAngle={0.2} maxPolarAngle={Math.PI / 2.1}
                  onStart={() => setAutoRotate(false)}
                />
              </Suspense>
            </Canvas>

            {/* Overlay badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-200 shadow-sm uppercase tracking-wide pointer-events-none">
              {cat.name} · {szData.label}
            </div>
            {/* Hint */}
            <div className="absolute bottom-3 right-3 text-[9px] text-slate-400 pointer-events-none">
              Kéo để xoay · Cuộn để zoom
            </div>
            {/* Auto-rotate toggle */}
            <button
              onClick={() => setAutoRotate(v => !v)}
              className={`absolute bottom-3 left-3 text-[10px] px-2.5 py-1 rounded-lg border transition-all ${autoRotate ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-slate-200 text-slate-500"
                }`}>
              {autoRotate ? "⏸ Dừng xoay" : "▶ Tự xoay"}
            </button>
          </div>

          {/* Size bar */}
          <div className="bg-white border-t border-slate-200 px-5 py-2.5 flex items-center gap-3 flex-shrink-0">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Kích thước</span>
            <div className="flex gap-2 flex-wrap">
              {cat.sizes.map(s => (
                <button key={s} onClick={() => setSz(s)}
                  className={`px-4 py-1.5 rounded-lg border text-xs font-medium transition-all ${sz === s
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}>
                  {SIZES[s].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Controls ── */}
        <div className="w-56 bg-white border-l border-slate-200 p-4 flex flex-col gap-5 overflow-y-auto flex-shrink-0">

          {/* Color picker */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Màu sơn container</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESET_COLORS.map(c => (
                <button key={c.hex}
                  onClick={() => setColor(c.hex)}
                  title={c.name}
                  style={{ background: c.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.14)" }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${color === c.hex ? "border-slate-700 scale-110" : "border-transparent"
                    }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                className="w-8 h-7 rounded cursor-pointer border border-slate-200 p-0.5" />
              <span className="text-[10px] text-slate-400 font-mono">{color}</span>
            </div>
          </div>

          {/* Specs */}
          <div className="flex-1">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Thông số kỹ thuật</p>
            <div className="flex flex-col divide-y divide-slate-100">
              {[
                ["Loại", cat.name],
                ["Kích thước", szData.label],
                ["Chiều cao", szData.htype],
                ["Thể tích", szData.vol],
                ["Tải trọng", szData.gw],
                ["TEU", szData.teu],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5">
                  <span className="text-[10px] text-slate-400">{k}</span>
                  <span className="text-[10px] font-semibold text-slate-700">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button onClick={() => navigate("/services")} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-sm">
            Đặt thuê container →
          </button>
        </div>
      </div>
    </div>
  );
}
