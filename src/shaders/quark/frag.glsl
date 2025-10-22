float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 coordinates = gl_FragCoord.xy;

  float random_number = random(coordinates);

  gl_FragColor = vec4(0.0, 0.0, 1.0, float(random_number));
}
