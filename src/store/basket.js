import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            basket: [],
        }
    },
    getters: {
        basket(state) {
            return state.basket
        }
    },
    mutations: {
        addProductToStoreBasket (state, selectedProduct) {
            selectedProduct.product.chosenSize = selectedProduct.size;
            return state.basket.push(selectedProduct.product);
        }
    }
});

export default store;

