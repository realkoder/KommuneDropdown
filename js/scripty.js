buttonFetchKommuner = document.getElementById("buttonFetchKommuner")
const dropDown = document.getElementById("ddKommuner");
const kommuneInput = document.getElementById("kommuneInput");
const kommuneLoad = document.getElementById("kommuneLoad");

const urlKommune = "https://api.dataforsyningen.dk/kommuner";
let kommuner = null;

const fetchKommuner = (apiUrl) => {
    return fetch(apiUrl).then(response => {
        if (response.ok) return response.json();
        throw new Error(`HTTP error! Status: ${response.status}`);
    });
}

const actionFetch = async () => {
    const kommunerLoaded = await fetchKommuner(urlKommune).then(result => result);
    kommuner = kommunerLoaded;
    return kommunerLoaded;
}

const fillDropDown = () => {
    while (dropDown.firstChild) {
        dropDown.removeChild(dropDown.firstChild);
    }

    const kommuner = actionFetch();
    kommuner.then(result => {
        result.forEach(kommune => {
            const option = document.createElement("option");
            option.value = kommune["href"];
            option.text = kommune["navn"];
            dropDown.appendChild(option);
        })
    })
}

buttonFetchKommuner.addEventListener('click', fillDropDown);
dropDown.addEventListener("change", () => {
    document.body.appendChild(document.createElement("br"));
    const aTag = document.createElement("a");
    aTag.href = dropDown.value;
    aTag.innerText = dropDown.value;
    document.body.appendChild(aTag);
});

kommuneLoad.addEventListener("click", () => {
    if (kommuner == null) {
        actionFetch().then(result => {
            kommuner = result;
        });
    }
    kommuner.forEach(kommune => {
        if (kommune["navn"].toLowerCase() == kommuneInput.value.toLowerCase()) {
            document.body.appendChild(document.createElement("br"));
            const aTag = document.createElement("a");
            aTag.href = kommune["href"];
            aTag.innerText = kommune["navn"];
            document.body.appendChild(aTag);
         }
      });
})