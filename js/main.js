import tripsdb, {
    bulkcreate,
    getData,
    createEle
} from './Module.js'

let db = tripsdb("Tripsdb", {
    trips: '++id, start, destination, price'
});

//input tags
const userid = document.getElementById("id");
const start = document.getElementById("start");
const destination = document.getElementById("destination");
const price = document.getElementById("price");

//buttons

const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

//notfound
const notfound = document.getElementById("notfound");
// insert value using create button

btncreate.onclick = (event) => {
    if (price.value.match('^[0-9]+$')) {
        let flag = bulkcreate(db.trips, {
            start: start.value,
            destination: destination.value,
            price: (price.value)
        })
        //console.log(flag);

        start.value = destination.value = price.value = "";
        getData(db.trips, (data) => {
            id.value = data.id + 1 || 1;
        });

        table();
        let insertmsg = document.querySelector(".insertmsg");
        getMsg(flag, insertmsg);
    } else {
        let invalidmsg = document.querySelector(".invalidmsg");
        getMsg(true, invalidmsg);
        price.value = "";
    }
}

//create event on btn-read
btnread.onclick = table;

//update event
btnupdate.onclick = () => {

    const id = parseInt(userid.value || 0);
    if (id) {
        if (price.value.match('^[0-9]+$')) {
            db.trips.update(id, {
                start: start.value,
                destination: destination.value,
                price: price.value
            }).then((updated) => {
                let get = updated ? true : false;

                // display message
                let updatemsg = document.querySelector(".updatemsg");
                getMsg(get, updatemsg);

                start.value = destination.value = price.value = "";
            })
        } else {

            let invalidmsg = document.querySelector(".invalidmsg");
            getMsg(true, invalidmsg);
            price.value = "";
        }
    }
}

//delete all records
btndelete.onclick = () => {
    recordDeletion();

}

//window onload event
window.onload = () => {
    textID(userid);
}

function textID(textboxid) {
    getData(db.trips, data => {
        textboxid.value = data.id + 1 || 1;
    })
}

function table() {
    const tbody = document.getElementById("tbody");

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    getData(db.trips, (data) => {
        if (data) {
            createEle("tr", tbody, tr => {
                for (const value in data) {
                    createEle("td", tr, td => {
                        td.textContent = data.price === data[value] ? `₹  ${data[value]}` : data[value];
                    })
                }
                createEle("td", tr, td => {
                    createEle("i", td, i => {
                        i.className += "fas fa-edit btn-edit";
                        i.setAttribute('data-id', data.id);
                        i.onclick = editbtn;
                    })
                })
                createEle("td", tr, td => {
                    createEle("i", td, i => {
                        i.className += "fas fa-trash-alt btn-delete";
                        i.setAttribute('data-id', data.id);
                        i.onclick = deletebtn;
                    })
                })
            })
        } else {
            let norecordmsg = document.querySelector(".norecordmsg");
            getMsg(true, norecordmsg);
        }
    })
}

function recordDeletion() {
    const tbody = document.getElementById("tbody");

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    getData(db.trips, (data) => {
        if (data) {
            db.delete();
            db = tripsdb("Tripsdb", {
                trips: '++id, start, destination, price'
            });
            db.open();

            let deletemsg = document.querySelector(".deletemsg");
            getMsg(true, deletemsg);
        } else {
            let norecordmsg = document.querySelector(".norecordmsg");
            getMsg(true, norecordmsg);
        }

    })
    textID(userid);
}

function editbtn(event) {
    let id = parseInt(event.target.dataset.id);
    db.trips.get(id, data => {
        userid.value = data.id || 0;
        start.value = data.start || "";
        destination.value = data.destination || "";
        price.value = data.price || "";
    })
}

function deletebtn(event) {
    let id = parseInt(event.target.dataset.id);
    db.trips.delete(id);
    table();

}
// function msg
function getMsg(flag, element) {
    if (flag) {
        // call msg 
        element.className += " movedown";

        setTimeout(() => {
            element.classList.forEach(classname => {
                classname == "movedown" ? undefined : element.classList.remove("movedown");

            })
        }, 4000);
    }
}