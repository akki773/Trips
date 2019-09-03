import tripsdb, {
    bulkcreate
} from './Module.js'

let db = tripsdb("Tripsdb", {
    trips: '++id, start, destination, fares, price'
});

//input tags
const id = document.getElementById("id");
const start = document.getElementById("start");
const destination = document.getElementById("destination");
const fares = document.getElementById("fares");
const price = document.getElementById("price");

//buttons

const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// insert value using create button

btncreate.onclick = (event) => {
    let flag = bulkcreate(db.trips, {
        start: start.value,
        destination: destination.value,
        fares: fares.value,
        price: price.value
    })
    console.log(flag)
}