// import DisplayData from "./DisplayData";
function Main() {
    interface CollectionData {
        licensePlate: string;
        color: string;
    }

    const STORAGE_ID: string = "parking";

    const saveBtn = document.querySelector<HTMLButtonElement>("#save");
    const showBtn = document.querySelector<HTMLButtonElement>("#show");
    const messageDiv = document.querySelector<HTMLButtonElement>("#message");

    const fakeData: CollectionData = { licensePlate: "abc123", color: "blue" }

    const seed: CollectionData[] = [{ licensePlate: "abc123", color: "blue" }]
    localStorage.setItem(STORAGE_ID, JSON.stringify(seed));
    saveBtn?.addEventListener("click", () => {
        const data = localStorage.getItem(STORAGE_ID);
        let currentData;
        if (data) currentData = JSON.parse(data);
        currentData.push(fakeData);
        localStorage.setItem(STORAGE_ID, JSON.stringify(currentData))
    });

    showBtn?.addEventListener("click", () => {
        const data = localStorage.getItem(STORAGE_ID);
        let parsedData: CollectionData[];
        if (data) {
            parsedData = JSON.parse(data);

            parsedData.forEach((entry: CollectionData) => {
                let diva = document.createElement("div")
                let divb = document.createElement("div")
                let div = document.createElement("div")
                diva.innerHTML = entry.licensePlate;
                divb.innerHTML = entry.color;
                div.appendChild(diva)
                div.appendChild(divb)
                messageDiv?.appendChild(div);
            });
        }

    })
}
Main();