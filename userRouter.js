router.get("/authorise", verifyToken, (req, res) => {
    res.status(200).json({ allowed: true });
});