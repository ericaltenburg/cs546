const people = require("./people");
const work = require("./work");

async function main(){

    console.log("\n ------------------------------------------------------------ \n");

    console.log("getPersonById:");
    try{ // Success
        const ex1 = await people.getPersonById(43);
        console.log ("SUCCESS: \n",ex1);
        const ex = await people.getPersonById(1);
        console.log ("SUCCESS: \n",ex);
        const ex2 = await people.getPersonById(1000);
        console.log ("SUCCESS: \n",ex2);
    }catch(e){
        console.log (e);
    }

    try { // Fail
        const ex = await people.getPersonById();
        console.log("Fail:" , ex);
    } catch (e) {
        console.log (`SUCCESSFUL FAIL:\n${e}`);
    }

    console.log("\n ------------------------------------------------------------ \n");

    console.log("\nhowManyPerState");
    try { // Success
        const ex = await people.howManyPerState("NY");
        console.log ("SUCCESS: \n",ex);
        const ex1 = await people.howManyPerState("CO");
        console.log ("SUCCESS: \n",ex1);
    } catch (e) {
        console.log(e);
    }

    try { // Fail
        const ex = await people.howManyPerState("     ");
        console.log(ex);
        // const ex1 = await people.howManyPerState();
        // console.log(ex1);
    } catch (e) {
        console.log (`SUCCESSFUL FAIL:\n${e}`);
    }

    console.log("\n ------------------------------------------------------------ \n");

    console.log("\npersonByAge");
    try { // Success
        const ex = await people.personByAge(0);
        console.log ("SUCCESS: \n",ex);
        const ex1 = await people.personByAge(43);
        console.log ("SUCCESS: \n",ex1);
        const ex2 = await people.personByAge(708);
        console.log ("SUCCESS: \n",ex2);
        const ex3 = await people.personByAge(999);
        console.log ("SUCCESS: \n",ex3);
    } catch (e) {
        console.log(e);
    }

    try { // Fail
        const ex = await people.personByAge('dof');
        console.log(ex);
    } catch (e) {
        console.log (`SUCCESSFUL FAIL:\n${e}`);
    }

    console.log("\n ------------------------------------------------------------ \n");

    console.log("\npeopleMetrics");
    try { // Success
        const ex = await people.peopleMetrics();
        console.log ("SUCCESS:\n",ex);
    } catch (e) {
        console.log(e);
    }


    console.log("\n ------------------------------------------------------------ \n");

    console.log("\nlistEmployees");
    try { // Success
        const ex = await work.listEmployees();
        // console.log ("SUCCESS: \n", JSON.stringify(ex)); // this causes it to look disgusting
        console.log("Success:\n",ex);
    } catch (e) {
        console.log(e);
    }

    console.log("\n ------------------------------------------------------------ \n");

    console.log("\nfourOneOne");
    try { // Success
        // const ex = await work.fourOneOne("816-877-0507");
        const ex = await work.fourOneOne('240-144-7553');
        console.log ("SUCCESS:\n",ex);
    } catch (e) {
        console.log(e);
    }

    try { // Fail
        const ex = await work.fourOneOne("919-3S4-8398");
        // const ex1 = await work.fourOneOne('2401447553');
        // const ex1 = await work.fourOneOne(' ');
        console.log(ex);
    } catch (e) {
        console.log (`SUCCESSFUL FAIL:\n${e}`);
    }

    console.log("\n ------------------------------------------------------------ \n");

    console.log("\nwhereDoTheyWork");
    try { // Success
        const ex1 = await work.whereDoTheyWork('299-63-8866');
        console.log("SUCCESS:\n",ex1);
        const ex = await work.whereDoTheyWork('277-85-0056');
        console.log ("SUCCESS:\n",ex);
    } catch (e) {
        console.log(e);
    }

    try { // Fail
        const ex = await work.whereDoTheyWork("919 34-8398");
        // const ex = await work.whereDoTheyWork("264-67-0084");
        // const ex = await work.whereDoTheyWork('299-60-8866');
        console.log(ex);
    } catch (e) {
        console.log (`SUCCESSFUL FAIL:\n${e}`);
    }
}

//call main
main();