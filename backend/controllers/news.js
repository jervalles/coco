exports.getAllNews = (req, res, next) => {
    const news = [
        {
            _id: 'fodjfdfoj',
            title: 'Mon premier post',
            details: 'Les détails',
            imageUrl: '',
            userId: 'rtreretet',
        },
        {
            _id: 'fodjfdfoj',
            title: 'Mon premier post',
            details: 'Les détails',
            imageUrl: '',
            userId: 'rtreretet',
        },
    ]
    res.status(200).json(news)
}