const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
    console.error("WebGL 2 not supported");
}

// Resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

// Load shaders
async function loadShader(url) {
    const response = await fetch(url);
    return await response.text();
}

// Compile shader
function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

// Load and compile shaders
async function initShaders() {
    const vertexShaderSource = await loadShader("vertex_shader.glsl");
    const fragmentShaderSource = await loadShader("fragment_shader.glsl");

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Shader program link error:", gl.getProgramInfoLog(program));
        return null;
    }

    gl.useProgram(program);
    return program;
}

// Animation loop
async function main() {
    const program = await initShaders();
    if (!program) return;

    const uTime = gl.getUniformLocation(program, "uTime");
    let time = 0;

    function render() {
        time += 0.01;
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uTime, time);
        requestAnimationFrame(render);
    }
    render();
}

main();
