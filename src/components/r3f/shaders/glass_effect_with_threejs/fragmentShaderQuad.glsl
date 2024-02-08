uniform sampler2D uTexture;
uniform sampler2D uGrain;
varying vec2 vUv;
void main() {
    vec4 c = texture2D(uTexture, vUv);
	vec4 grain = texture2D(uGrain, vUv);

    float dist = length(vUv - vec2(0.5));
    if(dist > 0.5) discard;
    float r = 0.49;

    float g_out = pow(dist / r, 110.0);
    float mag_out = 0.5 - cos(g_out - 1.0);
    vec2 uvOut = dist > r ? vUv * mag_out * (vUv - vec2(0.5)) : vUv;

    float g_in = pow(dist / r, -10.0);
    vec2 g_in_power = vec2(sin(vUv.x - 0.5), sin(vUv.y - 0.5));
    float mag_in = 0.5 - cos(g_in - 1.0);
    vec2 uvIn = dist > r ? vUv : (vUv - vec2(0.5)) * mag_in * g_in_power;

	gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
	gl_FragColor = c;
	gl_FragColor = grain;

    vec2 uv_display = vUv + uvOut * 0.1 + uvIn * 0.1 + (grain.rg - vec2(0.5)) * 0.1;
    vec4 cc = texture2D(uTexture, uv_display);

	gl_FragColor = vec4(uvOut, 0.0, 1.0);
	gl_FragColor = vec4(vec3(uvIn, 0.0), 1.0);
	gl_FragColor = vec4(vec3(vUv, 0.0), 1.0);
	gl_FragColor = cc;
}