/* ==========================================================================
   THREE.JS — Stack of project plates with margin ribbon
   ========================================================================== */

(function () {
  let scene, camera, renderer, group, particles, ribbon, raf;
  let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
  let scroll = 0, targetScroll = 0;

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', () => setTimeout(start, 150));

  function start() {
    if (typeof THREE === 'undefined') return;
    const container = document.getElementById('three-bg');
    if (!container) return;

    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 1.5, 10);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    group = new THREE.Group();
    scene.add(group);

    /* Stack of project plates */
    const plateCount = 6;
    const plateWidth = 3.2;
    const plateDepth = 3.2;
    const plateGap = 0.55;
    const stackHeight = (plateCount - 1) * plateGap;

    for (let i = 0; i < plateCount; i++) {
      const y = i * plateGap - stackHeight / 2;
      const intensity = i / (plateCount - 1);

      /* Filled plate — subtle */
      const fillMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().lerpColors(new THREE.Color(0x0a0a14), new THREE.Color(0x1a2a3a), intensity),
        transparent: true,
        opacity: 0.6,
      });
      const fill = new THREE.Mesh(new THREE.BoxGeometry(plateWidth, 0.06, plateDepth), fillMat);
      fill.position.y = y;
      group.add(fill);

      /* Wireframe edges — cyan, brighter at top */
      const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(plateWidth, 0.06, plateDepth));
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.35 + intensity * 0.45,
      });
      const wire = new THREE.LineSegments(edges, edgeMat);
      wire.position.y = y;
      group.add(wire);

      /* Highlight dots at corners */
      const dotGeo = new THREE.SphereGeometry(0.03, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.8 });
      [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([dx, dz]) => {
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(dx * plateWidth / 2, y, dz * plateDepth / 2);
        group.add(dot);
      });
    }

    /* Margin ribbon — helix winding around the stack */
    const ribbonPoints = [];
    const ribbonTurns = 2.2;
    const ribbonSegments = 220;
    const ribbonRadius = plateWidth * 0.78;
    const ribbonHeight = stackHeight + 0.4;
    for (let i = 0; i <= ribbonSegments; i++) {
      const t = i / ribbonSegments;
      const angle = t * Math.PI * 2 * ribbonTurns;
      const y = -ribbonHeight / 2 + t * ribbonHeight;
      const r = ribbonRadius * (0.92 + 0.08 * Math.sin(t * Math.PI * 4));
      ribbonPoints.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
    }
    const ribbonCurve = new THREE.CatmullRomCurve3(ribbonPoints);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 220, 0.025, 6, false);
    const ribbonMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.85,
    });
    ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    group.add(ribbon);

    /* Outer glow sphere */
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(4, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.025,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(glow);

    /* Ambient particle field */
    const count = 500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = [0.13, 0.83, 0.93];
    const violet = [0.55, 0.36, 0.96];
    const rose = [0.96, 0.25, 0.37];
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const t = Math.random();
      const c = t < 0.6 ? cyan : t < 0.85 ? violet : rose;
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    scene.add(particles);

    /* Initial tilt for isometric feel */
    group.rotation.x = -0.15;
    group.rotation.y = 0.55;

    /* Mouse + scroll */
    document.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener('scroll', () => { targetScroll = window.scrollY; });
    window.addEventListener('resize', onResize);

    loop();
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

  function loop() {
    raf = requestAnimationFrame(loop);

    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;
    scroll += (targetScroll - scroll) * 0.08;

    if (group) {
      /* Base slow rotation + mouse parallax */
      group.rotation.y += 0.0025;
      group.rotation.x = -0.15 + mouseY * 0.12;
      const baseY = 0.55;
      group.rotation.z = mouseX * 0.05;
    }

    if (particles) {
      particles.rotation.y += 0.0004;
      particles.rotation.x = mouseY * 0.08;
    }

    /* Scroll: tilt forward + dolly out */
    const scrollNorm = Math.min(scroll / (window.innerHeight * 1.2), 1);
    if (camera) {
      camera.position.z = 10 + scrollNorm * 6;
      camera.position.y = 1.5 - scrollNorm * 1.2;
      camera.lookAt(0, scrollNorm * -0.5, 0);
    }
    if (group) {
      group.position.y = -scrollNorm * 1.2;
    }

    renderer.render(scene, camera);
  }
})();
