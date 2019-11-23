var homeController = require("./loginController/homeController");
var authController = require("./loginController/authController");
import userController from "./loginController/userController";
import homeShopController from "./shopController/homeShopController"
import shopShopController from "./shopController/shopShopController"
import aboutShopController from "./shopController/aboutShopController"

export const homeLogin = homeController;
export const auth = authController;
export const userLogin = userController;

export const homeShop = homeShopController;
export const shopShop = shopShopController;
export const aboutShop = aboutShopController