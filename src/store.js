// erst mal alle messages hier storen
// und danach exportieren auf firebase
// ich brauch eine reihenfolge der nachrichten irgendwie
// und ein data attribute, dass ich weiß welche messages sent 
// bzw received sind und dieses attribute dann binden 
// für die styles
import { createStore } from "vuex";

const store = createStore({
  modules: {},
  state() {
    return {
      isLoggedIn: false,
      messages: [
        {
            // need actual id's from firebase i.e.
            id: 'm1',
            author: '',
            content: 'Hi, there how are you',
            type: 'received'
        },
        {
            // need actual id's from firebase i.e.
            id: 'm2',
            author: '',
            content: 'I am good, you',
            type: 'sent'
        },
        {
            // need actual id's from firebase i.e.
            id: 'm3',
            author: '',
            content: 'Great, me too',
            type: 'received'
        },
      ],
    };
  },
  mutations: {
    // addProductToCart(state, payload) {
    //   const productData = payload;
    //   const productInCartIndex = state.cart.items.findIndex(
    //     (ci) => ci.productId === productData.id
    //   );

    //   if (productInCartIndex >= 0) {
    //     state.cart.items[productInCartIndex].qty++;
    //   } else {
    //     const newItem = {
    //       productId: productData.id,
    //       title: productData.title,
    //       image: productData.image,
    //       price: productData.price,
    //       qty: 1,
    //     };
    //     state.cart.items.push(newItem);
    //   }
    //   state.cart.qty++;
    //   state.cart.total += productData.price;
    // },

    // removeProductFromCart(state, payload) {
    //   const prodId = payload.productId;
    //   const productInCartIndex = state.cart.items.findIndex(
    //     (cartItem) => cartItem.productId === prodId
    //   );
    //   const prodData = state.cart.items[productInCartIndex];
    //   state.cart.items.splice(productInCartIndex, 1);
    //   state.cart.qty -= prodData.qty;
    //   state.cart.total -= prodData.price * prodData.qty;
    // },

    login(state) {
      // TODO: have to be added to mutations in vuex store
      state.isLoggedIn = true;
    },
    logout(state) {
      // TODO: have to be added to mutations in vuex store
      state.isLoggedIn = false;
    },
  },

  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },

    // addProduct(context, payload) {
    //   const prodId = payload.id;
    //   const products = context.getters['currentProducts'];
    //   const product = products.find(prod => prod.id === prodId);
    //   context.commit('addProductToCart', product);
    // },
    // removeProduct(context, payload) {
    //   context.commit("removeProductFromCart", payload);
    // }
  },

  getters: {
    currentMessages(state) {
      return state.messages;
    },
    
  },
});

export default store;