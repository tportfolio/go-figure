// shared module between React source and Electron source
module.exports = {
    channels: {
        RECEIVER_CHANNEL: "fromMain",
        SENDER_CHANNEL: "toMain",
        FIGURE_DRAWING_FILE_RECEIVER_CHANNEL: "fromFigureDrawing",
        FIGURE_DRAWING_FILE_SENDER_CHANNEL: "toFigureDrawing",
        STATS_RECEIVER_CHANNEL: "fromStatsOverView",
        STATS_SENDER_CHANNEL: "toStatsOverview"
    }
}