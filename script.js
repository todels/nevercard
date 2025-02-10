document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("📂 Attempting to load Unicorn Studio project JSON...");

        // Fetch the JSON file
        const response = await fetch("unicorn_project.json");
        if (!response.ok) throw new Error("❌ Failed to load Unicorn JSON file.");
        const projectData = await response.json();
        console.log("✅ Loaded Unicorn Project Data:", projectData);

        // Get the correct ID from the JSON
        const unicornContainerId = projectData.id;
        console.log(`🦄 Using Container ID: ${unicornContainerId}`);

        // Check if the container exists in the document
        const unicornContainer = document.getElementById(unicornContainerId);
        if (!unicornContainer) {
            throw new Error(`❌ Container with ID "${unicornContainerId}" not found in the HTML!`);
        }
        console.log("✅ Container found:", unicornContainer);

        // Check if UnicornStudio is available
        if (typeof UnicornStudio === "undefined") {
            throw new Error("❌ UnicornStudio library is not loaded. Check the script import in index.html");
        }

        // Initialize Unicorn Studio with JSON data
        UnicornStudio.init({
            project: projectData,
            container: unicornContainer,
            scale: 1,
            dpi: 1.5,
            lazyload: false,
        }).then(() => {
            console.log("🎉 Unicorn Studio project loaded successfully!");
            
            // Check after 5 seconds if anything is injected
            setTimeout(() => {
                console.log("📡 Checking if Unicorn Studio injected elements...");
                console.log(unicornContainer.innerHTML);
            }, 5000);

        }).catch(err => {
            console.error("⚠️ Error initializing Unicorn Studio:", err);
        });

    } catch (error) {
        console.error("⚠️ Error loading Unicorn JSON:", error);
    }
});
