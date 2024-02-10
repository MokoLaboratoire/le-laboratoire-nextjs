uniform float time;
uniform float progress;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;
varying float vDebug;
float PI = 3.1415926538;
void main() {
	vec3 color = vec3(213.0 / 255.0, 127.0 / 255.0, 70.0 / 255.0);
	gl_FragColor = vec4(vec3(vColor.r * color), 1.0);
	/* gl_FragColor = vec4(vec3(1.0), 1.0); */
	/* gl_FragColor = vec4(vec3(vDebug), 1.0); */
}