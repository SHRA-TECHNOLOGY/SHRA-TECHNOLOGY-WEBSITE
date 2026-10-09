const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

async function sendResetMail({ resetUrl, email }) {

  try {
    const info = await transporter.sendMail({
      from: `"SHRA Technology" <${process.env.AUTH_USER}>`,
      to: email,
      subject: "Reset Your SHRA Technology Password",

      html: `
<!DOCTYPE html>
<html>
<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Reset Your Password</title>

  <style>

    /* ==========================================
       DESKTOP DEFAULT
    ========================================== */

    body {
      margin: 0;
      padding: 0;
      background: #f4fbff;
      font-family: Arial, Helvetica, sans-serif;
    }

    .email-wrapper {
      width: 100%;
      background: #f4fbff;
      padding: 30px 10px;
    }

    .email-card {
      width: 100%;
      max-width: 620px;
      background: #ffffff;
      border: 1px solid #dbeafe;
      border-radius: 18px;
      overflow: hidden;
    }

    .email-header {
      padding: 38px 25px 34px;
      text-align: center;
      background: linear-gradient(
        135deg,
        #0f4c81 0%,
        #1267b1 38%,
        #08a9b5 72%,
        #19c3b1 100%
      );
    }

    .email-logo {
      display: block;
      width: 120px;
      max-width: 120px;
      height: auto;
      margin: 0 auto 12px;
      border: 0;
    }

    .email-brand {
      color: #ffffff;
      font-size: 25px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .email-tagline {
      margin-top: 8px;
      color: #e6fbff;
      font-size: 13px;
      letter-spacing: 3px;
    }

    .email-content {
      padding: 45px 55px 35px;
    }

    .email-title {
      margin: 0;
      color: #12395f;
      font-size: 42px;
      line-height: 1.15;
      font-weight: 750;
      letter-spacing: -1px;
    }

    .email-title span {
      color: #1479d1;
    }

    .title-line {
      width: 140px;
      height: 5px;
      margin-top: 22px;
      border-radius: 10px;

      background: linear-gradient(
        90deg,
        #0f6dcc,
        #19c3b1
      );
    }

    .email-hello {
      margin: 45px 0 15px;
      color: #193b5d;
      font-size: 22px;
      line-height: 1.4;
    }

    .email-text {
      margin: 0;
      color: #65758b;
      font-size: 16px;
      line-height: 1.8;
    }

    .email-text.second {
      margin-top: 20px;
    }

    .button-row {
      width: 100%;
      margin: 35px 0;
    }

    .reset-button {
      display: inline-block;

      padding: 16px 38px;

      background: linear-gradient(
        135deg,
        #1769d2,
        #09a7b5,
        #19c3b1
      );

      color: #ffffff;

      text-decoration: none;

      border-radius: 12px;

      font-size: 16px;

      font-weight: 700;

      box-shadow:
        0 8px 22px rgba(20, 125, 200, 0.25);
    }

    .expiry-box {
      width: 100%;

      background: #eff9ff;

      border: 1px solid #9bdcff;

      border-radius: 14px;
    }

    .expiry-icon-cell {
      width: 70px;

      padding: 18px 10px 18px 18px;

      text-align: center;
      vertical-align: middle;
    }

    .expiry-icon {
      width: 42px;
      height: 42px;

      line-height: 42px;

      border-radius: 50%;

      background: #e2f4ff;

      color: #0879cf;

      font-size: 21px;
    }

    .expiry-text-cell {
      padding: 18px 18px 18px 5px;

      vertical-align: middle;
    }

    .expiry-text {
      margin: 0;

      color: #65758b;

      font-size: 15px;

      line-height: 1.6;
    }

    .expiry-time {
      display: block;

      color: #126dcc;

      font-size: 17px;
    }

    .security-text {
      margin: 32px 0 0;

      color: #65758b;

      font-size: 14px;

      line-height: 1.7;
    }

    .fallback-text {
      margin: 28px 0 0;

      color: #9aa8b8;

      font-size: 11px;

      line-height: 1.6;
    }

    .fallback-link {
      color: #087dcc;

      font-size: 11px;

      line-height: 1.5;

      word-break: break-all;

      text-decoration: none;
    }

    .email-footer {
      padding: 28px 20px;

      text-align: center;

      border-top: 1px solid #e1f0f8;

      background: #f8fcff;
    }

    .footer-brand {
      color: #124d80;

      font-size: 20px;

      font-weight: 700;
    }

    .footer-tagline {
      margin-top: 7px;

      color: #5c7187;

      font-size: 12px;

      letter-spacing: 3px;
    }

    .social-icon {
      display: inline-block;

      width: 30px;
      height: 30px;

      line-height: 30px;

      margin: 0 4px;

      border-radius: 50%;

      color: #ffffff;

      font-size: 13px;

      font-weight: bold;

      text-align: center;
    }

    .youtube {
      background: #1683cf;
    }

    .instagram {
      background: #10a9bb;
    }

    .linkedin {
      background: #126dcc;
    }

    .copyright {
      margin: 18px 0 0;

      color: #718096;

      font-size: 11px;
    }


    /* ==========================================
       MOBILE
    ========================================== */

    @media only screen and (max-width: 600px) {

      .email-wrapper {
        padding: 12px 6px !important;
      }

      .email-card {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 14px !important;
      }

      .email-header {
        padding: 28px 16px 24px !important;
      }

      .email-logo {
        width: 88px !important;
        max-width: 88px !important;
      }

      .email-brand {
        font-size: 21px !important;
      }

      .email-tagline {
        font-size: 10px !important;
        letter-spacing: 2px !important;
      }

      .email-content {
        padding: 30px 20px 26px !important;
      }

      .email-title {
        font-size: 30px !important;
        line-height: 1.18 !important;
        letter-spacing: -0.5px !important;
      }

      .title-line {
        width: 95px !important;
        height: 4px !important;
        margin-top: 15px !important;
      }

      .email-hello {
        margin-top: 28px !important;
        font-size: 19px !important;
      }

      .email-text {
        font-size: 14px !important;
        line-height: 1.7 !important;
      }

      .button-row {
        margin: 28px 0 !important;
      }

      .reset-button {
        padding: 14px 22px !important;
        font-size: 14px !important;
        border-radius: 10px !important;
      }

      .expiry-icon-cell {
        width: 52px !important;
        padding: 14px 5px 14px 10px !important;
      }

      .expiry-icon {
        width: 36px !important;
        height: 36px !important;
        line-height: 36px !important;
        font-size: 18px !important;
      }

      .expiry-text-cell {
        padding: 14px 10px 14px 5px !important;
      }

      .expiry-text {
        font-size: 12.5px !important;
      }

      .expiry-time {
        font-size: 15px !important;
      }

      .security-text {
        margin-top: 25px !important;
        font-size: 12.5px !important;
        line-height: 1.65 !important;
      }

      .fallback-text {
        margin-top: 22px !important;
        font-size: 10px !important;
      }

      .fallback-link {
        font-size: 10px !important;
      }

      .email-footer {
        padding: 23px 14px !important;
      }

      .footer-brand {
        font-size: 18px !important;
      }

      .footer-tagline {
        font-size: 10px !important;
        letter-spacing: 2px !important;
      }

      .social-icon {
        width: 28px !important;
        height: 28px !important;
        line-height: 28px !important;
        font-size: 12px !important;
      }

      .copyright {
        font-size: 10px !important;
      }
    }


    /* ==========================================
       SMALL MOBILE
    ========================================== */

    @media only screen and (max-width: 380px) {

      .email-wrapper {
        padding: 8px 4px !important;
      }

      .email-content {
        padding: 25px 15px 22px !important;
      }

      .email-title {
        font-size: 26px !important;
      }

      .email-hello {
        font-size: 18px !important;
      }

      .email-text {
        font-size: 13px !important;
      }

      .reset-button {
        padding: 13px 18px !important;
        font-size: 13px !important;
      }

      .expiry-text {
        font-size: 11.5px !important;
      }

      .expiry-time {
        font-size: 14px !important;
      }

    }

  </style>

</head>

<body>

  <!-- ==========================================
       MAIN WRAPPER
  =========================================== -->

  <table
    class="email-wrapper"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >

    <tr>
      <td align="center">


        <!-- =====================================
             EMAIL CARD
        ====================================== -->

        <table
          class="email-card"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
        >


          <!-- ==================================
               HEADER
          =================================== -->

          <tr>

            <td class="email-header">

              <img
                class="email-logo"
                src="${process.env.LOGO_URL}"
                alt="SHRA Technology"
              >

              <div class="email-brand">
                SHRA Technology
              </div>

              <div class="email-tagline">
                LEARN • BUILD • GROW
              </div>

            </td>

          </tr>


          <!-- ==================================
               CONTENT
          =================================== -->

          <tr>

            <td class="email-content">


              <!-- TITLE -->

              <h1 class="email-title">

                Reset Your

                <span>
                  Password
                </span>

              </h1>


              <!-- TITLE LINE -->

              <div class="title-line"></div>


              <!-- HELLO -->

              <h2 class="email-hello">
                Hello,
              </h2>


              <!-- DESCRIPTION -->

              <p class="email-text">

                We received a request to reset the password
                for your

                <strong style="color:#314a66;">
                  SHRA Technology
                </strong>

                account.

              </p>


              <p class="email-text second">

                Click the button below to create a new password.

              </p>


              <!-- ==================================
                   RESET BUTTON
              =================================== -->

              <table
                class="button-row"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >

                <tr>

                  <td align="center">

                    <a
                      class="reset-button"
                      href="${resetUrl}"
                      target="_blank"
                    >
                      🔐 &nbsp; Reset Password &nbsp; →
                    </a>

                  </td>

                </tr>

              </table>


              <!-- ==================================
                   EXPIRY BOX
              =================================== -->

              <table
                class="expiry-box"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >

                <tr>

                  <td class="expiry-icon-cell">

                    <div class="expiry-icon">
                      🔒
                    </div>

                  </td>


                  <td class="expiry-text-cell">

                    <p class="expiry-text">

                      This password reset link
                      will expire in

                      <strong class="expiry-time">
                        15 minutes.
                      </strong>

                    </p>

                  </td>

                </tr>

              </table>


              <!-- ==================================
                   SECURITY
              =================================== -->

              <p class="security-text">

                If you did not request a password reset,
                you can safely ignore this email.
                Your password will remain unchanged.

              </p>


              <!-- ==================================
                   FALLBACK LINK
              =================================== -->

              <p class="fallback-text">

                If the button above doesn't work,
                copy and paste this link into your browser:

              </p>

              <a
                class="fallback-link"
                href="${resetUrl}"
                target="_blank"
              >
                ${resetUrl}
              </a>


            </td>

          </tr>


          <!-- ==================================
               FOOTER
          =================================== -->

          <tr>

            <td class="email-footer">

              <div class="footer-brand">
                SHRA Technology
              </div>

              <div class="footer-tagline">
                LEARN • BUILD • GROW
              </div>


              <!-- SOCIAL -->

              <div style="margin-top:18px;">

                <span
                  class="social-icon youtube"
                >
                  ▶
                </span>

                <span
                  class="social-icon instagram"
                >
                  ◎
                </span>

                <span
                  class="social-icon linkedin"
                >
                  in
                </span>

              </div>


              <p class="copyright">

                © ${new Date().getFullYear()}
                SHRA Technology.
                All rights reserved.

              </p>

            </td>

          </tr>


        </table>

      </td>

    </tr>

  </table>

</body>
</html>
      `,
    });

    console.log(
      "Reset email sent successfully:",
      info.messageId
    );

    return info;

  } catch (error) {

    console.error("Mail Error:", error);

    throw error;
  }
}

module.exports = {
  sendResetMail,
};