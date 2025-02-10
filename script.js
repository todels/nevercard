/* WebGL Unicorn Animation Setup */

import { useEffect, useRef } from "react";

export default function UnicornAnimation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl2");
        if (!gl) {
            console.error("WebGL 2 not supported");
            return;
        }

        const vertexShaderSource = `#version 300 es
        precision mediump float;
        in vec3 aVertexPosition;
        in vec2 aTextureCoord;
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        out vec2 vTextureCoord;
        void main() {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            vTextureCoord = aTextureCoord;
        }`;

        const fragmentShaderSource = `#version 300 es
        precision mediump float;
        in vec2 vTextureCoord;
        out vec4 fragColor;
        uniform float uTime;
        void main() {
            float color = sin(uTime + vTextureCoord.x * 3.14);
            fragColor = vec4(color, 0.0, 1.0, 1.0);
        }`;

        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compile failed", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link failed", gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);
        let time = 0;
        function render() {
            time += 0.01;
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform1f(gl.getUniformLocation(program, "uTime"), time);
            requestAnimationFrame(render);
        }
        render();
    }, []);

    return <canvas ref={canvasRef} width={500} height={500} style={{ width: "100%", height: "100%" }} />;
}
