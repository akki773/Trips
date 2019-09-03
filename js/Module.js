const tripsdb = (dbname, table) => {
    //create database
    const db = new Dexie(dbname)
    db.version(1).stores(table);
    db.open();
    /*
    const db = new Dexie('myDb');
    db.version(1).stores({
        friends: 'name, age'
    })
    */
    return db;
}

// insert function
const bulkcreate = (dbtable, data) => {
    let flag = empty(data);
    if (flag) {
        dbtable.bulkAdd([data]);
        console.log("data inserted successfully...!");
    } else {
        console.log("Please Provide Data...!");
    }

    return flag;
}

//get data from database

const getData = (dbtable, fn) => {
    let index = 0;
    let obj = {};

    dbtable.count((count) => {
        if (count) {
            dbtable.each(table => {
                obj = Sortobj(table);
                fn(obj, index++);
            })
        } else {
            fn(0);
        }
    })
}

//Sort object

const Sortobj = sortobj => {
    let obj = {};
    obj = {
        id: sortobj.id,
        start: sortobj.start,
        destination: sortobj.destination,
        fares: sortobj.fares,
        price: sortobj.price,
    }
    return obj;
}

//check textbox validation
const empty = object => {
    let flag = false;

    for (const value in object) {
        if (object[value] != "" && object.hasOwnProperty(value)) {
            flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
}

//cretate dynamic elements
const createEle = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);
    if (appendTo) appendTo.appendChild(element);
    if (fn) fn(element);
}

export default tripsdb;
export {
    bulkcreate,
    getData,
    createEle
}