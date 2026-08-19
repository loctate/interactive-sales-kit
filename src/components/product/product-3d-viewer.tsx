"use client";

import {
  type ElementType,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FurnitureVariant } from "@/types/furniture";

const ModelViewerElement = "model-viewer" as ElementType;

type Rgba = [number, number, number, number];

type TextureInfoApi = {
  setTexture: (texture: null) => void;
};

type ModelMaterialApi = {
  name: string;
  isLoaded: boolean;
  isActive: boolean;
  ensureLoaded: () => Promise<void>;
  pbrMetallicRoughness: {
    baseColorFactor: Rgba;
    baseColorTexture: TextureInfoApi | null;
    setBaseColorFactor: (color: string | Rgba) => void;
  };
};

type ModelApi = {
  materials: Readonly<ModelMaterialApi[]>;
};

type ModelViewerApi = HTMLElement & {
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  availableVariants?: string[];
  model?: ModelApi;
};

type Product3DViewerProps = {
  src: string;
  productLabel: string;
  activeVariant: FurnitureVariant;
  assetLabel: string;
  assetNote: string;
  targetMaterialNames?: string[];
  preserveBaseColorTexture?: boolean;
};

const DEFAULT_ORBIT = "0deg 75deg 105%";
const DEFAULT_TARGET = "auto auto auto";
const DEFAULT_FOV = "45deg";

const NON_UPHOLSTERY_PATTERN =
  /(wood|timber|metal|steel|chrome|leg|frame|base|hardware|screw|bolt|roller|roulette|rubber|ceramic|pba)/i;

function hexToRgb01(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "").trim();

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return [1, 1, 1];
  }

  return [
    Number.parseInt(normalized.slice(0, 2), 16) / 255,
    Number.parseInt(normalized.slice(2, 4), 16) / 255,
    Number.parseInt(normalized.slice(4, 6), 16) / 255,
  ];
}

function getRecolorTargets(
  materials: Readonly<ModelMaterialApi[]>,
  targetMaterialNames: string[],
) {
  if (targetMaterialNames.length > 0) {
    const wanted = new Set(
      targetMaterialNames.map((name) => name.trim().toLowerCase()),
    );

    const exactMatches = materials.filter((material) =>
      wanted.has((material.name ?? "").trim().toLowerCase()),
    );

    if (exactMatches.length > 0) {
      return exactMatches;
    }
  }

  const activeUpholstery = materials.filter(
    (material) =>
      material.isActive &&
      !NON_UPHOLSTERY_PATTERN.test(material.name ?? ""),
  );

  if (activeUpholstery.length > 0) {
    return activeUpholstery;
  }

  const likelyUpholstery = materials.filter(
    (material) => !NON_UPHOLSTERY_PATTERN.test(material.name ?? ""),
  );

  return likelyUpholstery.length > 0
    ? likelyUpholstery.slice(0, 1)
    : materials.slice(0, 1);
}

async function applyVariantColor(
  viewer: ModelViewerApi,
  color: string,
  targetMaterialNames: string[],
  preserveBaseColorTexture: boolean,
): Promise<string[]> {
  const materials = viewer.model?.materials ?? [];
  const targets = getRecolorTargets(materials, targetMaterialNames);
  const [red, green, blue] = hexToRgb01(color);

  await Promise.all(
    targets.map(async (material) => {
      if (!material.isLoaded) {
        await material.ensureLoaded();
      }

      if (!preserveBaseColorTexture) {
        material.pbrMetallicRoughness.baseColorTexture?.setTexture(null);
      }

      const currentAlpha =
        material.pbrMetallicRoughness.baseColorFactor?.[3] ?? 1;

      material.pbrMetallicRoughness.setBaseColorFactor([
        red,
        green,
        blue,
        currentAlpha,
      ]);
    }),
  );

  return targets.map(
    (material, index) => material.name?.trim() || `Target ${index + 1}`,
  );
}

export function Product3DViewer({
  src,
  productLabel,
  activeVariant,
  assetLabel,
  assetNote,
  targetMaterialNames = [],
  preserveBaseColorTexture = false,
}: Product3DViewerProps) {
  const viewerRef = useRef<ModelViewerApi | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);
  const [materialNames, setMaterialNames] = useState<string[]>([]);
  const [recoloredMaterials, setRecoloredMaterials] = useState<string[]>([]);
  const [colorSyncError, setColorSyncError] = useState<string | null>(null);

  const targetMaterialKey = useMemo(
    () => targetMaterialNames.join("|"),
    [targetMaterialNames],
  );

  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      const materials = viewer.model?.materials ?? [];

      setLoaded(true);
      setVariants(viewer.availableVariants ?? []);
      setMaterialNames(
        materials.map(
          (material, index) => material.name?.trim() || `Material ${index + 1}`,
        ),
      );

      void applyVariantColor(
        viewer,
        activeVariant.hex,
        targetMaterialNames,
        preserveBaseColorTexture,
      )
        .then((targets) => {
          setRecoloredMaterials(targets);
          setColorSyncError(null);
        })
        .catch((error: unknown) => {
          console.error("[3D COLOR SYNC]", error);
          setColorSyncError(
            error instanceof Error ? error.message : "Unknown material error",
          );
        });
    };

    viewer.addEventListener("load", handleLoad);

    return () => {
      viewer.removeEventListener("load", handleLoad);
    };
  }, [
    activeVariant.hex,
    preserveBaseColorTexture,
    targetMaterialKey,
    targetMaterialNames,
  ]);

  useEffect(() => {
    if (!loaded) return;

    const viewer = viewerRef.current;
    if (!viewer) return;

    let cancelled = false;

    void applyVariantColor(
      viewer,
      activeVariant.hex,
      targetMaterialNames,
      preserveBaseColorTexture,
    )
      .then((targets) => {
        if (cancelled) return;

        setRecoloredMaterials(targets);
        setColorSyncError(null);
      })
      .catch((error: unknown) => {
        if (cancelled) return;

        console.error("[3D COLOR SYNC]", error);
        setColorSyncError(
          error instanceof Error ? error.message : "Unknown material error",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [
    activeVariant.hex,
    loaded,
    preserveBaseColorTexture,
    targetMaterialKey,
    targetMaterialNames,
  ]);

  function resetView() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.cameraOrbit = DEFAULT_ORBIT;
    viewer.cameraTarget = DEFAULT_TARGET;
    viewer.fieldOfView = DEFAULT_FOV;
  }

  return (
    <div className="overflow-hidden border border-white/10 bg-[#111318]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Interactive 3D
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            {productLabel} · {activeVariant.name}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={[
              "border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em]",
              colorSyncError
                ? "border-red-400/30 bg-red-400/[0.05] text-red-300"
                : "border-amber-300/25 bg-amber-300/[0.05] text-amber-300",
            ].join(" ")}
          >
            {colorSyncError ? "Color Sync Error" : "Color Sync Active"}
          </span>

          <button
            type="button"
            onClick={() => setAutoRotate((current) => !current)}
            className={[
              "border px-3 py-2 text-xs transition",
              autoRotate
                ? "border-amber-300 bg-amber-300/[0.06] text-amber-300"
                : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white",
            ].join(" ")}
          >
            {autoRotate ? "Auto Rotate: ON" : "Auto Rotate"}
          </button>

          <button
            type="button"
            onClick={resetView}
            className="border border-white/10 px-3 py-2 text-xs text-zinc-400 transition hover:border-white/25 hover:text-white"
          >
            Reset View
          </button>
        </div>
      </div>

      <div className="relative min-h-[520px] bg-[#0d0f12]">
        {!loaded ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d0f12]">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-amber-300" />
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                Loading 3D model
              </p>
            </div>
          </div>
        ) : null}

        <ModelViewerElement
          ref={viewerRef}
          src={src}
          alt={`${productLabel} interactive 3D product model`}
          camera-controls=""
          auto-rotate={autoRotate ? "" : undefined}
          rotation-per-second="20deg"
          interaction-prompt="auto"
          shadow-intensity="1"
          shadow-softness="0.8"
          exposure="1"
          camera-orbit={DEFAULT_ORBIT}
          camera-target={DEFAULT_TARGET}
          field-of-view={DEFAULT_FOV}
          min-camera-orbit="auto auto 45%"
          max-camera-orbit="auto auto 180%"
          style={{
            width: "100%",
            height: "520px",
            background: "transparent",
          }}
        />

        <div className="pointer-events-none absolute left-5 top-5 border border-amber-300/25 bg-black/60 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
            {assetLabel}
          </p>
          <p className="mt-1 text-[10px] text-zinc-500">{assetNote}</p>
        </div>

        <div className="pointer-events-none absolute bottom-5 right-5 border border-white/10 bg-black/60 px-4 py-3 text-right">
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            Active Sales Variant
          </p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <span
              className="h-3 w-3 rounded-full border border-white/20"
              style={{ backgroundColor: activeVariant.hex }}
            />
            <span className="text-xs font-semibold text-white">
              {activeVariant.colorLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 border-t border-white/10 px-6 py-6 sm:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Interaction
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Drag rotate · Scroll/pinch zoom
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            GLB Variants
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            {loaded ? `${variants.length} terdeteksi` : "Menunggu model"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Materials
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            {loaded ? `${materialNames.length} material` : "Menunggu model"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Color Targets
          </p>
          <p
            className="mt-2 truncate text-sm text-zinc-300"
            title={recoloredMaterials.join(", ")}
          >
            {colorSyncError
              ? "Sync gagal — lihat console"
              : loaded
                ? recoloredMaterials.length > 0
                  ? recoloredMaterials.join(", ")
                  : "Tidak ada target"
                : "Menunggu model"}
          </p>
        </div>
      </div>
    </div>
  );
}
