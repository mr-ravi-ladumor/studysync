import transporter from "../config/nodemailer.js";

export const sendOTPByMail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"StudySync Support" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Password Reset OTP - StudySync",
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 500px; margin: auto;">
                    <h2 style="color: #22c55e;">StudySync</h2>
                    <p>You requested a password reset. Use the OTP below to proceed. This OTP is valid for 10 minutes.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 32px; font-weight: bold; background: #f0fdf4; padding: 10px 20px; border-radius: 8px; color: #1fb355; tracking: 5px;">${otp}</span>
                    </div>
                    <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Nodemailer error:", error);
        throw new Error("Failed to send OTP email.");
    }
};
