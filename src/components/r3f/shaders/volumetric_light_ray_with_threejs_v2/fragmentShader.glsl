varying vec2 vUv;
uniform sampler2D uMap;
void main() {
	vec4 c = texture2D(uMap, fract(vUv * 10.0));
	gl_FragColor = vec4(vUv, 0.0, 1.0);
	gl_FragColor = vec4(vec3(1.0 - c.r), 1.0);
}