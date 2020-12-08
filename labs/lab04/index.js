const movies = require('./data/movies');
const connection = require('./config/mongoConnection');
const { remove } = require('./data/movies');

async function main() {


    console.log("1. Create a movie of your choice.");
    const billAndTed = await movies.create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
    
    console.log("\n2. Log the newly created movie. (Just that movie, not all movies)");
    console.log(billAndTed);

    console.log("\n3. Create another movie of your choice.")
    const dark = await movies.create("The Dark Knight","When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.","R", "2hr 32min","Action",["Christian Bale","Heath Ledger"],{director: "Christopher Nolan", yearReleased: 2008});

    console.log("\n4. Query all movies, and log them all")
    const allMovies = await movies.getAll();
    console.log(allMovies);

    console.log("\n5. Create a 3rd movie of your choice.");
    const hidden = await movies.create("Hidden Figures","The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program.","PG","2hr 7min","Drama",["Taraji P. Henson","Octavia Spencer", "Janelle Monáe"],{director: "Theodore Melfi", yearReleased: 2016});
    
    console.log("\n6. Log the newly created 3rd movie. (Just that movie, not all movies)")
    console.log(hidden);

    console.log("\n7. Rename the first movie's title");
    const renamedBillAndTed = await movies.rename(billAndTed._id.toString(), "This is not John Wick 3");

    console.log("\n8. Log the first movie with the updated title.");
    console.log(renamedBillAndTed);

    console.log("\n9. Remove the second movie you created.");
    const removeSecond = await movies.remove(dark._id.toString());
    console.log(removeSecond);

    console.log("\n10. Query all movies, and log them all");
    const secondAll = await movies.getAll();
    console.log(secondAll);

    try {
        const badMovie = await movies.create("best movie", "this movie is about something", "PG", "1hr 1 min", "horror", ['person a', 'person b'], {director: "person c", yearReleased:2900});
        console.log("Failed: ", badMovie);
    } catch (e) {
        console.log("\n11. Try to create a movie with bad input parameters to make sure it throws errors.");
        console.log(e);
    }

    try {
        const badRemove = await movies.remove(dark._id.toString());
        console.log("Failed: ", badRemove);
    } catch (e) {
        console.log("\n12. Try to remove a movie that does not exist to make sure it throws errors.");
        console.log(e);
    }

    try {
        const badRename = await movies.rename(dark._id.toString(), "the man bat");
        console.log("Failed: ", badRename);
    } catch (e) {
        console.log("\n13. Try to rename a movie that does not exist to make sure it throws errors.");
        console.log(e);
    }

    try {
        const badRename1 = await movies.rename(hidden._id.toString(), {newTitle: "hide"});
        console.log("Failed: ", badRename1);
    } catch (e) {
        console.log("\n14. Try to rename a movie passing in invalid data for the parameter to make sure it throws errors.");
        console.log(e);
    }

    try {
        const badRemove = await movies.get("5f77c5a9a5a6667d678feb0c");
        console.log("Failed: ", badRemove);
    } catch (e) {
        console.log("\n15. Try getting a movie by ID that does not exist to make sure it throws errors.");
        console.log(e);
    }

    const db = await connection();
    await db.serverConfig.close();

    console.log('Done!');
}

main().catch((error) => { 
    console.log(error);
});