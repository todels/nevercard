document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Fetch and load the JSON file
        const response = await fetch("unicorn_project.json"); // Ensure this file is in your repo
        if (!response.ok) {
            throw new Error("Failed to load Unicorn JSON file");
        }
        const projectData = await response.json();

        // Initialize Unicorn Studio with your JSON data
        UnicornStudio.init({
            project: projectData,
            container: document.getElementById("unicorn-container"),
            scale: 1,
            dpi: 1.5,
            lazyload: false,
        }).then(() => {
            console.log("Unicorn Studio project loaded successfully.");
        }).catch((err) => {
            console.error("Error initializing Unicorn Studio:", err);
        });

    } catch (error) {
        console.error("Error loading Unicorn JSON:", error);
    }
});
