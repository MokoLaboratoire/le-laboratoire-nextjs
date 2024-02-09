const CurtainShader = {
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
        if(p.x < 0.25) {

        }
        else if(p.x < 0.5) {
            p.x = p.x - 0.25 * uProgress;
        }
        else if(p.x < 0.75) {
            p.x = p.x - 0.35 * uProgress;
        }
        else {
            p.x = p.x - 0.65 * uProgress;
        }
        vec4 color = texture2D(tDiffuse, p);
        gl_FragColor = color;
    }`,
}

export { CurtainShader }
