"use client";

import { useEffect, useRef } from "react";
import { BinaryRain } from "@/components/BinaryRain";

/*
 * Latar WebGL 3D: hujan biner di ruang berkedalaman.
 *
 * Bedanya dengan BinaryRain (CSS): di sini tiap digit hidup di koordinat 3D
 * sungguhan, jadi ada perspektif, kabut jarak (yang jauh meredup ke hitam),
 * dan kamera yang bergerak mengikuti scroll — itulah parallax-nya. Layer ini
 * `fixed`, jadi konten di atasnya bergerak lebih cepat daripada latar.
 *
 * `three` (~600 KB) di-load on-demand di dalam effect, jadi tidak ikut bundle
 * awal halaman. BinaryRain versi CSS tetap dirender di bawah canvas sebagai
 * fallback: kalau WebGL tidak tersedia atau gagal, canvas dibiarkan transparan
 * dan latar CSS yang tampil — halaman tidak pernah kosong.
 *
 * prefers-reduced-motion: hanya satu frame statis, tanpa loop animasi.
 */

const JUMLAH_GLYPH = 700;
const BENTANG_X = 46;
const BENTANG_Y = 62;
const Z_DEKAT = -2;
const Z_JAUH = -72;
const WARNA_LATAR = 0x050505;

type ModulThree = typeof import("three");

function buatTeksturGlyph(THREE: ModulThree, karakter: string) {
  const kanvas = document.createElement("canvas");
  kanvas.width = 64;
  kanvas.height = 128;
  const ctx = kanvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, kanvas.width, kanvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 92px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(karakter, kanvas.width / 2, kanvas.height / 2);
  }
  const tekstur = new THREE.CanvasTexture(kanvas);
  tekstur.colorSpace = THREE.SRGBColorSpace;
  return tekstur;
}

type Glyph = {
  x: number;
  y: number;
  z: number;
  skala: number;
  cepat: number;
  geser: number;
};

function buatLajur(THREE: ModulThree, karakter: string, jumlah: number) {
  const geometri = new THREE.PlaneGeometry(1.15, 2.3);
  const tekstur = buatTeksturGlyph(THREE, karakter);
  const material = new THREE.MeshBasicMaterial({
    map: tekstur,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.5,
    fog: true,
  });

  const mesh = new THREE.InstancedMesh(geometri, material, jumlah);
  mesh.frustumCulled = false;

  const data: Glyph[] = Array.from({ length: jumlah }, () => ({
    x: (Math.random() - 0.5) * BENTANG_X,
    y: (Math.random() - 0.5) * BENTANG_Y * 2,
    z: Z_JAUH + Math.random() * (Z_DEKAT - Z_JAUH),
    skala: 0.6 + Math.random() * 1.1,
    cepat: 1.6 + Math.random() * 4.4,
    geser: Math.random() * Math.PI * 2,
  }));

  // digit yang dekat lebih terang, yang jauh tenggelam ke kabut
  const warna = new THREE.Color();
  data.forEach((d, i) => {
    const kedalaman = (d.z - Z_JAUH) / (Z_DEKAT - Z_JAUH);
    const terang = 0.18 + kedalaman * 0.72;
    mesh.setColorAt(i, warna.setRGB(terang, terang, terang));
  });

  return { mesh, data, geometri, material, tekstur };
}

function mulai(
  THREE: ModulThree,
  canvas: HTMLCanvasElement,
  fallback: HTMLElement | null,
) {
  const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const modeDev = process.env.NODE_ENV !== "production";
  let siap = false;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(WARNA_LATAR, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(WARNA_LATAR, 20, 78);

  const kamera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);

  const separuh = Math.round(JUMLAH_GLYPH / 2);
  const lajur = [
    buatLajur(THREE, "0", separuh),
    buatLajur(THREE, "1", JUMLAH_GLYPH - separuh),
  ];
  lajur.forEach((l) => scene.add(l.mesh));

  const ukuran = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    kamera.aspect = w / h;
    kamera.updateProjectionMatrix();
  };
  ukuran();

  const dummy = new THREE.Object3D();
  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let waktu = 0;
  let frames = 0;
  let raf = 0;
  let terakhir = performance.now();

  const gambar = (dt: number) => {
    waktu += dt;

    // kamera turun mengikuti scroll → parallax; pointer menambah kedalaman.
    // Di-clamp biar halaman panjang tidak "keluar" dari bentang digit.
    const progress = Math.min(
      window.scrollY / Math.max(window.innerHeight, 1),
      6,
    );
    target.y = -progress * 2.6;
    target.x = pointer.x * 1.5;
    kamera.position.x += (target.x - kamera.position.x) * 0.05;
    kamera.position.y += (target.y - kamera.position.y) * 0.06;
    kamera.rotation.z += (-pointer.x * 0.05 - kamera.rotation.z) * 0.04;
    kamera.rotation.x += (pointer.y * 0.05 - kamera.rotation.x) * 0.04;

    for (const l of lajur) {
      l.data.forEach((d, i) => {
        d.y -= d.cepat * dt;
        if (d.y < -BENTANG_Y) d.y += BENTANG_Y * 2;
        dummy.position.set(
          d.x + Math.sin((waktu + d.geser) * 0.3) * 0.35,
          d.y,
          d.z,
        );
        dummy.scale.setScalar(d.skala);
        dummy.rotation.z = Math.sin((waktu + d.geser) * 0.2) * 0.05;
        dummy.updateMatrix();
        l.mesh.setMatrixAt(i, dummy.matrix);
      });
      l.mesh.instanceMatrix.needsUpdate = true;
    }

    renderer.render(scene, kamera);
    canvas.style.opacity = "1";

    // WebGL sudah terbukti jalan → latar CSS dilepas biar tidak dobel hujan
    if (!siap) {
      siap = true;
      if (fallback) fallback.style.opacity = "0";
    }

    if (modeDev) {
      canvas.dataset.depthFrames = String(++frames);
      canvas.dataset.depthCamY = kamera.position.y.toFixed(3);
      canvas.dataset.depthScroll = String(Math.round(window.scrollY));
    }
  };

  function loop() {
    const now = performance.now();
    const dt = Math.min((now - terakhir) / 1000, 0.05);
    terakhir = now;
    gambar(dt);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (raf || kurangiGerak) return;
    terakhir = performance.now();
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  }

  const onResize = () => ukuran();
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  gambar(0); // frame pertama langsung tampil, lalu baru loop
  start();

  return () => {
    stop();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVisibility);
    lajur.forEach((l) => {
      scene.remove(l.mesh);
      l.mesh.dispose();
      l.geometri.dispose();
      l.tekstur.dispose();
      l.material.dispose();
    });
    renderer.dispose();
  };
}

export function WebGLDepth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let batal = false;
    let bersih: (() => void) | undefined;

    void (async () => {
      try {
        const THREE = await import("three");
        if (batal) return;
        bersih = mulai(THREE, canvas, fallbackRef.current);
      } catch {
        // WebGL tidak tersedia — canvas tetap transparan, BinaryRain CSS yang tampil
      }
    })();

    return () => {
      batal = true;
      bersih?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* fallback kalau WebGL gagal / belum siap — memudar begitu frame pertama jadi */}
      <div ref={fallbackRef} className="transition-opacity duration-1000">
        <BinaryRain />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
      />
    </div>
  );
}
