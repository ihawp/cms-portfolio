const portfolioInsertController = (req, res) => {

    const {
        title,
        intro,
        role,
        timeline,
        toolsUsed,
        skillsApplied,
        keyTasks,
        challenges,
        takeaways
    } = req.body;

    console.log({
        title, intro, role,
        timeline, toolsUsed, skillsApplied,
        keyTasks, challenges, takeaways
    });

    res.status(200).json({ success: true, data: {}, message: 'Portfolio item inserted successfully!' });

}

module.exports = portfolioInsertController;