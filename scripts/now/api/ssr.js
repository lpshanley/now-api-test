module.exports = (req, res) => {
    return res.status(200)
        .json({ greeting: "Hello from SSR" })
}