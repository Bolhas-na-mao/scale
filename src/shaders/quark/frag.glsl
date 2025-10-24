uniform vec3 uColor;
uniform vec3 uCameraPosition;
varying vec3 vNormal; // direção da superfície
varying vec3 vPosition; // posição da superfície

void main() {
  vec3 viewDirection = normalize(uCameraPosition - vPosition);

  float fresnel = dot(viewDirection, vNormal);

  fresnel = clamp(1.0 - fresnel, 0.2, 1.0);

  gl_FragColor = vec4(uColor, fresnel);
}
