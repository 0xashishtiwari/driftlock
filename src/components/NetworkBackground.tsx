import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let cancelled = false
    let disposeScene = () => {}

    const initializeScene = async () => {
      let THREE: typeof import('three')
      try {
        THREE = await import('three')
      } catch (error) {
        console.error('Unable to load Three.js for the network background.', error)
        return
      }

      if (cancelled) return
      const canvas = canvasRef.current
      const container = canvas?.parentElement
      if (!canvas || !container) return

      let renderer: import('three').WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        })
      } catch (error) {
        console.error('Unable to initialize the Three.js network background.', error)
        return
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40)
      camera.position.z = 8.2

      const network = new THREE.Group()
      scene.add(network)

      const points: import('three').Vector3[] = []
      const pointCount = 72
      const radius = 2.1
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
      const accentPoints = new Set([8, 19, 30, 41, 52, 63])

      for (let index = 0; index < pointCount; index += 1) {
        const y = 1 - (index / (pointCount - 1)) * 2
        const ringRadius = Math.sqrt(1 - y * y)
        const angle = goldenAngle * index
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * ringRadius * radius,
            y * radius,
            Math.sin(angle) * ringRadius * radius,
          ),
        )

      }

      const pointGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const pointColors = new Float32Array(pointCount * 3)
      const pointColorAttribute = new THREE.BufferAttribute(pointColors, 3)
      pointGeometry.setAttribute('color', pointColorAttribute)
      const pointMaterial = new THREE.PointsMaterial({
        size: 0.06,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 1,
      })
      network.add(new THREE.Points(pointGeometry, pointMaterial))

      const edgeMaterial = new THREE.LineBasicMaterial({
        color: '#a3a3a3',
        transparent: true,
        opacity: 0.5,
      })
      const edgePositions: number[] = []
      points.forEach((point, index) => {
        const neighbors = points
          .map((candidate, candidateIndex) => ({
            candidate,
            candidateIndex,
            distance: point.distanceTo(candidate),
          }))
          .filter(({ candidateIndex }) => candidateIndex !== index)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3)

        neighbors.forEach(({ candidate, candidateIndex }) => {
          if (candidateIndex > index) {
            edgePositions.push(
              point.x, point.y, point.z,
              candidate.x, candidate.y, candidate.z,
            )
          }
        })
      })

      const edgeGeometry = new THREE.BufferGeometry()
      edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3))
      network.add(new THREE.LineSegments(edgeGeometry, edgeMaterial))

      const shellMaterial = new THREE.MeshBasicMaterial({
        color: '#737373',
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      })
      const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(radius, 1),
        shellMaterial,
      )
      network.add(shell)

      const orbiters: Array<{ group: import('three').Group; speed: number }> = []
      const orbitalMaterials: Array<{
        material: import('three').MeshBasicMaterial
        accent: boolean
      }> = []
      const orbitalGeometries: import('three').BufferGeometry[] = []

      for (let index = 0; index < 3; index += 1) {
        const accent = index === 1
        const group = new THREE.Group()
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: '#a3a3a3',
          transparent: true,
          opacity: accent ? 0.48 : 0.32,
          depthWrite: false,
        })
        const ringGeometry = new THREE.TorusGeometry(radius * 1.32, 0.008, 5, 144)
        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        group.add(ring)

        const satelliteMaterial = new THREE.MeshBasicMaterial({ color: '#fff1d6' })
        const satelliteGeometry = new THREE.SphereGeometry(0.065, 14, 10)
        const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial)
        satellite.position.x = radius * 1.32
        group.add(satellite)

        const glowMaterial = new THREE.MeshBasicMaterial({
          color: '#fff1d6',
          transparent: true,
          opacity: 0.18,
          depthWrite: false,
        })
        const glow = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 12, 8),
          glowMaterial,
        )
        glow.position.copy(satellite.position)
        group.add(glow)

        group.rotation.set(
          0.45 + index * 0.65,
          0.35 + index * 0.3,
          index * 0.7,
        )
        network.add(group)
        orbiters.push({ group, speed: index === 1 ? -0.003 : 0.0024 })
        orbitalMaterials.push(
          { material: ringMaterial, accent },
          { material: satelliteMaterial, accent: true },
          { material: glowMaterial, accent: true },
        )
        orbitalGeometries.push(ringGeometry, satelliteGeometry, glow.geometry)
      }

      const updateTheme = () => {
        const styles = getComputedStyle(document.documentElement)
        const lineColor = styles.getPropertyValue('--network-line').trim() || '#a3a3a3'
        const pointColor = new THREE.Color(
          styles.getPropertyValue('--network-point').trim() || '#a3a3a3',
        )
        const accentColor = new THREE.Color(
          styles.getPropertyValue('--network-accent').trim() || '#fff1d6',
        )

        points.forEach((_, index) => {
          const color = accentPoints.has(index) ? accentColor : pointColor
          pointColorAttribute.setXYZ(index, color.r, color.g, color.b)
        })
        pointColorAttribute.needsUpdate = true
        edgeMaterial.color.set(lineColor)
        shellMaterial.color.set(lineColor)
        orbitalMaterials.forEach(({ material, accent }) => {
          material.color.set(accent ? accentColor : lineColor)
        })
      }

      updateTheme()
      const themeObserver = new MutationObserver(updateTheme)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })

      let targetX = 0
      let targetY = 0
      let rotation = 0
      let frame = 0

      const resize = () => {
        const { width, height } = container.getBoundingClientRect()
        if (width === 0 || height === 0) return
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        network.position.x = width < 640 ? 0.25 : 1.7
        camera.updateProjectionMatrix()
        network.scale.setScalar(width < 640 ? 0.52 : 1)
      }

      const onPointerMove = (event: PointerEvent) => {
        const bounds = container.getBoundingClientRect()
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          targetX = 0
          targetY = 0
          return
        }
        targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.7
        targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.5
      }

      const renderFrame = () => {
        rotation = (rotation + 0.0018) % (Math.PI * 2)
        network.rotation.y += (rotation + targetX - network.rotation.y) * 0.055
        network.rotation.x += (targetY - network.rotation.x) * 0.055
        orbiters.forEach(({ group, speed }) => {
          group.rotation.z += speed
        })
        pointMaterial.size = 0.052 + (Math.sin(performance.now() * 0.0015) + 1) * 0.008
        renderer.render(scene, camera)
        frame = window.requestAnimationFrame(renderFrame)
      }

      resize()
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)

      if (reduceMotion) {
        renderer.render(scene, camera)
      } else {
        window.addEventListener('pointermove', onPointerMove, { passive: true })
        frame = window.requestAnimationFrame(renderFrame)
      }

      const cleanup = () => {
        window.cancelAnimationFrame(frame)
        window.removeEventListener('pointermove', onPointerMove)
        resizeObserver.disconnect()
        themeObserver.disconnect()
        pointGeometry.dispose()
        pointMaterial.dispose()
        edgeGeometry.dispose()
        edgeMaterial.dispose()
        orbitalGeometries.forEach((geometry) => geometry.dispose())
        orbitalMaterials.forEach(({ material }) => material.dispose())
        shell.geometry.dispose()
        shellMaterial.dispose()
        renderer.dispose()
      }

      if (cancelled) cleanup()
      else disposeScene = cleanup
    }

    void initializeScene()
    return () => {
      cancelled = true
      disposeScene()
    }
  }, [reduceMotion])

  return (
    <div
      aria-hidden="true"
      className="network-background pointer-events-none absolute inset-x-0 top-0 h-[760px] overflow-hidden"
    >
      <canvas ref={canvasRef} className="network-canvas absolute inset-0 h-full w-full" />
      <div className="network-fade absolute inset-0" />
    </div>
  )
}
