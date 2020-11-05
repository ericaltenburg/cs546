const showsRoutes = require('./shows');
const searchRoutes = require('./search');
const homeRoutes = require('./home');

const constructorMethod = (app) => {
    app.use('/shows', showsRoutes);
    app.use('/search', searchRoutes);
    app.use('/', homeRoutes);

    app.use('*', (req, res) => {
        res.status(404).render('shows/error', {thing: "Error", type3: true});
    });
};

module.exports = constructorMethod;