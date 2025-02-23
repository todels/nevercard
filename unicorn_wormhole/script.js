document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("📂 Attempting to load Unicorn Studio project JSON...");

        // Fetch the JSON file
        const response = await fetch("unicorn_project.json");
        if (!response.ok) throw new Error("❌ Failed to load Unicorn JSON file.");
        const projectData = await response.json();
        console.log("✅ Loaded Unicorn Project Data:", projectData);

        // Get the canvas element
        const canvas = document.querySelector("canvas");
        if (!canvas) {
            throw new Error("❌ Canvas element not found.");
        }
        console.log("✅ Canvas found:", canvas);

        // Initialize WebGL context
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (!gl) {
            throw new Error("❌ WebGL not supported.");
        }
        console.log("✅ WebGL context initialized:", gl);

        // Ensure UnicornStudio is available
        if (typeof UnicornStudio === "undefined") {
            throw new Error("❌ UnicornStudio library is missing.");
        }

        // Initialize Unicorn Studio
        UnicornStudio.init({
            project: projectData,
            container: canvas,
            scale: 1,
            dpi: 1.5,
            lazyload: false,
        }).then(() => {
            console.log("🎉 Unicorn Studio loaded successfully!");
        }).catch(err => {
            console.error("⚠️ Error initializing Unicorn Studio:", err);
        });

    } catch (error) {
        console.error("⚠️ Error loading Unicorn JSON:", error);
    }
});
