import * as Realm from "realm-web";
import conf from "../../conf/conf";

const app = new Realm.App({ id: conf.realmAppId });
 async function loginCart(email, password) {
  // Create an email/password credential
  const credentials = Realm.Credentials.emailPassword(email, password);
  // Authenticate the user
  const user = await app.logIn(credentials);
  // 'App.currentUser' updates to match the logged in user
  console.assert(user.id === app.currentUser.id);
  return user.accessToken;
}

export default loginCart;





















// import axios from "axios";

// export function fetchItems(){
//     return axios.get(`http://localhost:5000/cart/get`)
// }

// export function addItem(item){
//     return axios.post(`https://api.jsonbin.io/v3/b/658e659a266cfc3fde6fc93f`, item)
// }

// export function updateItem(id, itemUpdate){
//     console.log("itemup and id hai to",itemUpdate, id);
//     return axios.patch(`https://api.jsonbin.io/v3/b/658e659a266cfc3fde6fc93f/${id}`, itemUpdate)
// }

// export function deleteItem(id){
//     return axios.delete(`https://api.jsonbin.io/v3/b/658e659a266cfc3fde6fc93f/${id}`)
// }