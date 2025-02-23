document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("📂 Attempting to load Unicorn Studio project JSON...");

        const response = await fetch("unicorn_project.json");
        if (!response.ok) throw new Error("❌ Failed to load Unicorn JSON file.");
        const projectData = await response.json();
        console.log("✅ Loaded Unicorn Project Data:", projectData);

        const unicornContainer = document.querySelector(`[data-us-project="${projectData.id}"]`);
        if (!unicornContainer) {
            throw new Error(`❌ Container with data-us-project="${projectData.id}" not found!`);
        }
        console.log("✅ Container found:", unicornContainer);

        if (typeof UnicornStudio === "undefined") {
            throw new Error("❌ UnicornStudio library not loaded.");
        }

        UnicornStudio.init({
            project: projectData,
            container: unicornContainer,
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