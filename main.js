const { Octokit } = require("@octokit/rest")

const express = require("express")
const app = express()
const PORT = 3000

const octokit = new Octokit()

async function getFileNames(owner, repo, path) {
    try {
        const response = await octokit.rest.repos.getContent({
            owner,
            repo,
            path, // Optional: Specify a folder path
        })

        // Extract file names from the response
        const fileNames = response.data.map((file) => file.name)
        return fileNames
    } catch (error) {
        throw console.error("Error fetching repository content:", error.message)
    }
}

app.get("/get-image", async (req, res) => {
    var files = await getFileNames("patyczakus", "Memhub-API", "src/images")

    res.send({ file: "https://raw.githubusercontent.com/patYczakus/Memhub-API/main/src/images/" + files[Math.floor(Math.random() * files.length)] })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
