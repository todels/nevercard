document.addEventListener("DOMContentLoaded", () => {
    console.log("🦄 Unicorn Studio animation starting...");

    // Ensure Unicorn Studio is loaded
    if (!window.UnicornStudio) {
        console.error("UnicornStudio library is not loaded.");
        return;
    }

    const unicornInstance = new UnicornStudio({
        projectId: "GPpr4MReDZOYyaXPRnIL",
        container: document.querySelector("[data-us-project='GPpr4MReDZOYyaXPRnIL']")
    });

    unicornInstance.start().then(() => {
        console.log("✨ Unicorn animation running successfully!");
    }).catch(error => {
        console.error("❌ Unicorn animation failed to start:", error);
    });

    // Debugging the canvas
    const canvas = document.querySelector("canvas");
    console.log("🎨 Canvas detected:", canvas);

    if (canvas) {
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("2d");

        if (!gl) {
            console.error("⚠️ WebGL not supported.");
        } else {
            console.log("✅ WebGL Context:", gl);
        }
    } else {
        console.error("⚠️ No canvas found.");
    }
});
