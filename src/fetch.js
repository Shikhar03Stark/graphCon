let data = [];
for(let i = 0; i< 10; i++){
    const obj = {
        key : i + 1,
        x : Math.random()*1000,
        y : Math.random()*800,
    }
    data.push(obj);
}

let edges = [
    {
        key : 1,
        first : 1,
        second : 2,
    },
    {
        key : 2,
        first : 1,
        second : 2,
    },
    {
        key : 3,
        first : 7,
        second : 3,
    },
    {
        key : 4,
        first : 8,
        second : 10,
    },
    {
        key : 5,
        first : 6,
        second : 4,
    },
    {
        key : 6,
        first : 2,
        second : 9,
    },
    {
        key : 7,
        first : 5,
        second : 1,
    },
    {
        key : 8,
        first : 3,
        second : 4,
    }
];


export {
    data,
    edges,
};