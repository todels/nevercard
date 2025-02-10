document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("📂 Loading Unicorn Studio project JSON...");

        // Fetch JSON from your hosted server (GitHub Pages)
        const response = await fetch("unicorn_project.json");
        if (!response.ok) throw new Error("❌ Failed to load Unicorn JSON file.");
        const projectData = await response.json();
        console.log("✅ Loaded Unicorn Project Data:", projectData);

        // Check if UnicornStudio is available
        if (typeof UnicornStudio === "undefined") {
            throw new Error("❌ UnicornStudio library is not loaded. Check the script import in index.html");
        }

        // Initialize Unicorn Studio with your local JSON
        UnicornStudio.init({
            project: projectData, // Use your hosted JSON
            container: document.querySelector("[data-us-project]"), // Attach to the existing div
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
