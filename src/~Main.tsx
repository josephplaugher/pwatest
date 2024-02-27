// import DisplayData from "./DisplayData";

interface CollectionData {
    licensePlate: string;
    color: string;
}

const saveBtn = document.querySelector<HTMLButtonElement>("#save");
const showBtn = document.querySelector<HTMLButtonElement>("#show");
const messageDiv = document.querySelector<HTMLButtonElement>("#message");

const fakeData: CollectionData = { licensePlate: "abc123", color: "blue" }

let db: any;
const openRequest = window.indexedDB.open("parking", 1);
// error handler signifies that the database didn't open successfully
openRequest.addEventListener("error", () =>
    console.error("Database failed to open"),
);

// success handler signifies that the database opened successfully
openRequest.addEventListener("success", () => {
    console.log("Database opened successfully");

    // Store the opened database object in the db variable. This is used a lot below
    db = openRequest.result;

    // Run the displayData() function to display the notes already in the IDB
    // DisplayData(db,);
});

openRequest.addEventListener("upgradeneeded", (e: any) => {
    // Grab a reference to the opened database
    db = e.target.result;

    // Create an objectStore in our database to store notes and an auto-incrementing key
    // An objectStore is similar to a 'table' in a relational database
    const objectStore = db.createObjectStore("notes_os", {
        keyPath: "id",
        autoIncrement: true,
    });

    // Define what data items the objectStore will contain
    objectStore.createIndex("body", "body", { unique: false });

    console.log("Database setup complete");
});

saveBtn?.addEventListener("click", () => {

    // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
    const newItem = { license: "abc123", color: "blue" };

    // open a read/write db transaction, ready for adding the data
    const transaction = db.transaction(["parking"], "readwrite");

    // call an object store that's already been added to the database
    const objectStore = transaction.objectStore("parking");

    // Make a request to add our newItem object to the object store
    const addRequest = objectStore.add(newItem);

    addRequest.addEventListener("success", () => {
        // Clear the form, ready for adding the next entry
        // titleInput.value = "";
        // bodyInput.value = "";
    });

    // Report on the success of the transaction completing, when everything is done
    transaction.addEventListener("complete", () => {
        console.log("Transaction completed: database modification finished.");

        // update the display of data to show the newly added item, by running displayData() again.
        // DisplayData();
    });

    transaction.addEventListener("error", () =>
        console.log("Transaction not opened due to error"),
    );

})