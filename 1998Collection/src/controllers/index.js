var homeController = require("./loginController/homeController");
var authController = require("./loginController/authController");
import userController from "./loginController/userController";
import homeShopController from "./shopController/homeShopController"
import shopShopController from "./shopController/shopShopController"
import aboutShopController from "./shopController/aboutShopController"
import productSingleShopController from "./shopController/productSingleShopController"


export const homeLogin = homeController;
export const auth = authController;
export const userLogin = userController;
export const homeShop = homeShopController;
export const shopShop = shopShopController;
export const aboutShop = aboutShopController
export const productSingleShop = productSingleShopController



import adminController from "./adminController/adminController"
import getLoginController from "./adminController/adminController"
import postLoginController from "./adminController/adminController"
export const admin = adminController
export const getLogin = getLoginController
export const postLogin = postLoginController