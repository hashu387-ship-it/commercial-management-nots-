/* ==========================================================================
   THREE.JS HERO SCENE
   Wireframe geometry + aurora particle field with mouse parallax
   ========================================================================== */

(function () {
  let scene, camera, renderer, particles, knot, knotInner, raf;
  let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
  let scroll = 0, targetScroll = 0;

  window.addEventListener('load', () => setTimeout(initThree, 200));

  function initThree() {
    if (typeof THREE === 'undefined') return;
    const container = document.getElementById('three-bg');
    if (!container) return;

    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 6;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* Particle field — aurora-coloured */
    const count = 700;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const violet = [0.55, 0.36, 0.96];
    const cyan = [0.02, 0.71, 0.83];
    const rose = [0.96, 0.25, 0.37];

    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const t = Math.random();
      const c = t < 0.33 ? violet : t < 0.66 ? cyan : rose;
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* Centre piece — torus knot with wireframe + filled inner */
    const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.4, 220, 36, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    const innerGeo = new THREE.TorusKnotGeometry(1.4, 0.35, 100, 24, 2, 3);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    knotInner = new THREE.Mesh(innerGeo, innerMat);
    knotInner.scale.set(1.1, 1.1, 1.1);
    scene.add(knotInner);

    /* Glow sphere behind */
    const glowGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    /* Mouse + scroll listeners */
    document.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener('scroll', () => {
      targetScroll = window.scrollY;
    });
    window.addEventListener('resize', onResize);

    animate();
  }

  function onResize() {
    const container = document.getElementById('three-bg');
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function animate() {
    raf = requestAnimationFrame(animate);

    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;
    scroll += (targetScroll - scroll) * 0.08;

    if (particles) {
      particles.rotation.y += 0.0006;
      particles.rotation.x = mouseY * 0.15;
      particles.rotation.z = mouseX * 0.05;
    }

    if (knot) {
      knot.rotation.x += 0.002;
      knot.rotation.y += 0.004;
      knot.position.x = mouseX * 0.4;
      knot.position.y = mouseY * 0.3;
    }

    if (knotInner) {
      knotInner.rotation.x -= 0.001;
      knotInner.rotation.y -= 0.003;
      knotInner.position.x = mouseX * 0.4;
      knotInner.position.y = mouseY * 0.3;
    }

    /* Scroll: zoom camera in + fade scene */
    const scrollNorm = Math.min(scroll / window.innerHeight, 1);
    if (camera) {
      camera.position.z = 6 + scrollNorm * 8;
      camera.rotation.z = scrollNorm * 0.15;
    }

    renderer.render(scene, camera);
  }
})();
