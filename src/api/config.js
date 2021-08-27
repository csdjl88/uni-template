import '.env'
import common from "../common/common.js";
import store from "../store/index.js";

let host;
let BASE_API = process.uniEnv.BASE_API;
host = BASE_API;
const appName = '商城'


export default {
  host,
  appName,
}
