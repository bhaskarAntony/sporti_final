import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

const Verify = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      console.log("Initializing RecaptchaVerifier...");
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha resolved");
            onSignInSubmit();
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          }
        },
        auth
      );

      // Render the recaptchaVerifier
      window.recaptchaVerifier.render().then((widgetId) => {
        console.log("RecaptchaVerifier rendered with widgetId:", widgetId);
      }).catch((error) => {
        console.error("Error rendering RecaptchaVerifier:", error);
      });
    }
  }, []);

  const onSignInSubmit = (e) => {
    e.preventDefault();

    if (!window.recaptchaVerifier) {
      console.error("RecaptchaVerifier is not initialized");
      return;
    }

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        console.log("OTP has been sent");
      })
      .catch((error) => {
        console.log("Error during signInWithPhoneNumber:", error.message);
      });
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();

    if (!verificationId) {
      console.error("Verification ID is not set");
      return;
    }

    const credential = PhoneAuthProvider.credential(verificationId, otp);

    signInWithCredential(auth, credential)
      .then((result) => {
        console.log("User signed in successfully");
      })
      .catch((error) => {
        console.log("Error during signInWithCredential:", error.message);
      });
  };

  return (
    <div>
      <form onSubmit={onSignInSubmit}>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button type="submit">Send OTP</button>
        <div id="recaptcha-container"></div>
      </form>

      {verificationId && (
        <form onSubmit={onSubmitOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default Verify;
