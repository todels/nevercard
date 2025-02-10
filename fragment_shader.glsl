#version 300 es
precision mediump float;
in vec2 vTextureCoord;
out vec4 fragColor;
uniform float uTime;
void main() {
    float color = sin(uTime + vTextureCoord.x * 3.14);
    fragColor = vec4(color, 0.0, 1.0, 1.0);
}
