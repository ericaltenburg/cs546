const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const books = data.books;
const reviews = data.reviews;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    const book1 = await books.create("The Shining", {authorFirstName: "Stephen", authorLastName: "King"}, ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"], "1/28/1977", "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..");
    const review1 = await reviews.create("This book is spook", "Eric Altenburg", book1._id.toString(), 10, "4/14/1999", "v good stuff in my opinion");

    console.log("Done seeding database :)");
    await db.serverConfig.close();
};

main().catch(console.log);