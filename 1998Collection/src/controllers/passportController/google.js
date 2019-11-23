import passport from "passport"
import passportGoogle from "passport-google-oauth"
import userModel from "./../../models/userModel"
import { transErrors, transSuccess } from "./../../../lang/vi"

let GoogleStrategy = passportGoogle.OAuth2Strategy

let GG_APP_ID =
  "327382488137-gumehpnpmdegfdnura9tr6c5ur8rliph.apps.googleusercontent.com"
let GG_APP_SCRET = "CJcynP8bhAjXaySLF3-qfCNN"
let GG_CALLBACK_URL = `https://localhost:1998/auth/google/callback`

let initPassportGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GG_APP_ID,
        clientSecret: GG_APP_SCRET,
        callbackURL: GG_CALLBACK_URL,
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findByGoogleUid(profile.id)
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
            google: {
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
module.exports = initPassportGoogle
