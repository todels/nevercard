document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("📂 Attempting to load Unicorn Studio project JSON...");

        // Fetch the Unicorn JSON file
        const response = await fetch("unicorn_project.json");
        if (!response.ok) throw new Error("❌ Failed to load Unicorn JSON file. Check if the file exists.");

        const projectData = await response.json();
        console.log("✅ Loaded Unicorn Project Data:", projectData);

        // Check if UnicornStudio library is available
        if (typeof UnicornStudio === "undefined") {
            throw new Error("❌ UnicornStudio library is not loaded. Check the script import in index.html");
        }

        // Initialize Unicorn Studio with JSON data
        UnicornStudio.init({
            project: projectData,  // Directly passing JSON object
            container: document.getElementById("unicorn-container"),
            scale: 1,
            dpi: 1.5,
            lazyload: false,
        }).then(() => {
            console.log("🎉 Unicorn Studio project loaded successfully!");
        }).catch(err => {
            console.error("⚠️ Error initializing Unicorn Studio:", err);
        });

    } catch (error) {
        console.error("⚠️ Error loading Unicorn JSON:", error);
    }
});
