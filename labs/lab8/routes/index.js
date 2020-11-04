const showsRoutes = require('./shows');
const searchRoutes = require('./search');

const constructorMethod = (app) => {
    app.use('/shows', showsRoutes);
    app.use('/search', searchRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'That route was not found.'});
    });
};

module.exports = constructorMethod;