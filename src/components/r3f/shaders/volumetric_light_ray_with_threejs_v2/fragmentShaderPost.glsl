varying vec2 vUv;
uniform sampler2D uMap;
float PI = 3.1415926538;
float rand(vec2 co) {
	return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
void main() {
	vec4 c = texture2D(uMap, vUv);
	vec2 toCenter = vec2(0.5) - vUv;
	vec4 original = texture2D(uMap, vUv);
	vec4 color = vec4(0.0);
	float total = 0.0;
	for(float i = 0.0; i < 40.0; i++) {
		float lerp = (i + rand(vec2(gl_FragCoord.xy))) / 40.0;
		float weight = sin(lerp * PI);
		vec4 mysample = texture2D(uMap, vUv + toCenter * lerp * 1.0);
		mysample.rgb *= mysample.a;
		color += mysample * weight;
		total += weight;
	}
	color.a = 1.0;
	color.rgb /= 4.0;
	vec4 finalColor = 1.0 -(1.0 -color) * (1.0 - original);
	gl_FragColor = vec4(toCenter, 0.0, 1.0);
	gl_FragColor = color;
}