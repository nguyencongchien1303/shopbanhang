import passport from "passport"
import passportFacebook from "passport-Facebook"
import userModel from "./../../models/userModel"
import { transErrors, transSuccess } from "./../../../lang/vi"

let FacebookStrategy = passportFacebook.Strategy

let FB_APP_ID = "979468419084771"
let FB_APP_SCRET = "a70bbc7597554cf3221a9ca18c32f4a3"
let FB_CALLBACK_URL = `https://localhost:1998/auth/facebook/callback`

let initPassportFacebook = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FB_APP_ID,
        clientSecret: FB_APP_SCRET,
        callbackURL: FB_CALLBACK_URL,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findByFacebookUid(profile.id)
          if (user) {
            return done(
              null,
              user,
              req.flash("success", transSuccess.loginSuccess(user.username))
            )
          }
          console.log(profile)
          let newUserItem = {
            username: profile.displayName,
            gender: profile.gender,
            local: { isActive: true },
            facebook: {
              uid: profile.id,
              token: accessToken,
              email: profile.emails[0].value
            }
          }
          let newUser = await userModel.createNew(newUserItem)
          return done(
            null,
            newUser,
            req.flash("success", transSuccess.loginSuccess(newUser.username))
          )
        } catch (error) {
          console.error(error)
          return done(
            null,
            false,
            req.flash("errors", transErrors.server_error)
          )
        }
      }
    )
  )

  //lưu userId vào session
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    userModel
      .findUserById(id)
      .then(user => {
        return done(null, user)
      })
      .catch(error => {
        return done(error, null)
      })
  })
}
module.exports = initPassportFacebook
