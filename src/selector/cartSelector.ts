import { createSelector } from 'reselect';

const getCart = (state, props) => {
    console.log(state, 'state')
    console.log(props, 'props')
    return state
}

export const makeGetCartState = () => createSelector(
    getCart,
    cart => { cart }
)