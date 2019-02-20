export default (state=[], action) => {
    switch (action.type){
        case 'FETCH_POSTS':
            console.log("running petch post")
            return action.payload;
        default:
            return state;
    };
};