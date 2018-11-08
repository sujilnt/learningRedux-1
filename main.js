
/**
 * There are 3 basic parts in redux
 1- actions : - represent different event that changes in the store.
 2- reducer : represent state change when an new action occured
 3- store :- creating the actual store.
 * */
/*
* set of rules
*  1) Only an event can change the state of the store .
*
* */

function reducerTodo(state=[],action){
    if(action.type === "ADD_TODO"){
        state.push([action.todo]);
        //console.log("current state",state);
        return state;
    }
    return state;
}
/*
* createStore function it creates a store.
* createStore.getData : getting the state.
* create.subscribe : listening the changes in the state .
* reducerTodo : A reducer function, that returns new state of the app .
*/
// library code begins from here
const createStore= (reducer)=>{
/* The store has 4 parts
    * 1) the State
    * 2) Get the State
    *3) Listen to changes on the State
    *4) Update the State
*/
let state;
let listeners = [];
const subscribe=(listener) => {
    listeners.push(listener);
    return ()=>{
        listeners=listeners.filter((l) => l !== listener)
    }

};

// updating a state is using Dispatch method
const dispatch = (action)=>{
    state = reducer(state,action); // a reducer inorder to get new state
    console.log("bee",state);
    listeners.forEach((listener)=> listener())
};
const getState= ()=> state;
return {
    getState,
    dispatch,
    subscribe
}
};
// library code ends here .
// App code starts here ...
console.log("check", reducerTodo);
const store = createStore(reducerTodo);
store.subscribe(()=>{
    console.log("the new state is ",store.getState());
});
const unsubscribe = store.subscribe(()=>{
   console.log("The store changed ");
});

store.dispatch({
    type: "ADD_TODO",
    todo:{
        id: 0 ,
        name: "test Redux",
        complete:false

    }
});

unsubscribe();
