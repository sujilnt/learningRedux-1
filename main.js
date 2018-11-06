const createStore= ()=>{
/* The store has 4 parts
    * 1) the State
    * 2) Get the State
    *3) Listen to changes on the State
    *4) Update the State
*/
let state;
let listeners = [];
const getState= ()=> state;
const subscribe=(listener) => {
    listener.push(listener);
    return ()=>{
        listener=listener.filter((l) => l !== listener)
    }
};
return {
    getState,
    subscribe
}
};
const store = createStore();
store.subscribe(()=>{
    console.log("the new state is ",store.getState());
});
const unsubscribe = store.subscribe(()=>{
   console.log("The store changed ");
});

unsubscribe();
