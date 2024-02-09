const RGBAShader = {
  name: 'DotScreenShader',

  uniforms: {
    tDiffuse: { value: null },
    uProgress: { value: 0 },
  },

  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,

  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uProgress;
    varying vec2 vUv;
    void main() {
        vec2 p = vUv;
        vec4 cr = texture2D(tDiffuse, p + uProgress * vec2(0.1, 0.0));
        vec4 cg = texture2D(tDiffuse, p);
        vec4 cb = texture2D(tDiffuse, p - uProgress * vec2(0.1, 0.0));
        gl_FragColor = vec4(cr.r, cg.g, cb.b, 1.0);
    }`,
}

export { RGBAShader }
