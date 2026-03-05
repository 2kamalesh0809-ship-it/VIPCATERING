const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure the email transport using Gmail
// In a real environment, you should use environment variables:
// firebase functions:config:set gmail.email="myemail@gmail.com" gmail.password="app_password"
const gmailEmail = process.env.GMAIL_EMAIL || functions.config().gmail?.email;
const gmailPassword = process.env.GMAIL_PASSWORD || functions.config().gmail?.password;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.sendQuotationEmail = functions.firestore
    .document("quotations/{quotationId}")
    .onCreate(async (snap, context) => {
        const data = snap.data();
        const { customer, selectedItems } = data;

        const categories = ['Beverages', 'Starters', 'Main Course', 'Desserts', 'Live Counters', 'Serving'];

        const itemsHtml = categories.map(category => {
            const itemsInCategory = selectedItems.filter(item => item.category === category);
            if (itemsInCategory.length === 0) return "";

            return `
                <tr>
                    <td colspan="2" style="background: #fdfaf0; padding: 12px 10px; font-weight: bold; color: #C29200; text-transform: uppercase; border-bottom: 2px solid #C29200; font-size: 13px; letter-spacing: 1px;">
                        ${category}
                    </th>
                </tr>
                ${itemsInCategory.map(item => `
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 10px; color: ${item.veg ? '#2e7d32' : '#c62828'}; font-size: 18px; width: 30px; text-align: center;">
                            ●
                        </td>
                        <td style="padding: 10px; color: #333; font-size: 14px;">${item.name}</td>
                    </tr>
                `).join("")}
                <tr><td colspan="2" style="height: 15px;"></td></tr>
            `;
        }).join("");

        const mailOptions = {
            from: `"VIP Catering" <${gmailEmail}>`,
            to: "vipcateringservice1@gmail.com", // Official Business Email
            cc: customer.email, // Send a copy to the customer
            subject: `New VIP Catering Quotation - ${customer.fullName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 15px; overflow: hidden; background: #fff;">
                    <div style="background: #111; color: #C9A227; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; font-style: italic;">VIP CATERING</h1>
                        <p style="margin: 5px 0 0; color: #fff; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;">The Gold Standard of Taste</p>
                    </div>
                    
                    <div style="padding: 30px;">
                        <h2 style="color: #111; border-bottom: 2px solid #C9A227; padding-bottom: 10px; font-size: 20px;">Customer Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #666;">Name:</td><td style="color: #111;">${customer.fullName}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td><td style="color: #111;">${customer.phone}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td><td style="color: #111;">${customer.email}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Event Date:</td><td style="color: #111;">${customer.eventDate}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Event Type:</td><td style="color: #111;">${customer.eventType}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Guest Count:</td><td style="color: #111;">${customer.guestCount} Guests</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Address:</td><td style="color: #111;">${customer.address}</td></tr>
                        </table>

                        <h2 style="color: #111; border-bottom: 2px solid #C9A227; padding-bottom: 10px; margin-top: 40px; font-size: 20px;">Selected Gourmet Menu</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                        </table>

                        <div style="margin-top: 40px; text-align: center; color: #777; font-size: 12px;">
                            <p>This is an automated quotation request from vipcatering.in</p>
                            <p>© 2026 VIP Catering Chennai. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            `,
        };

        try {
            await mailTransport.sendMail(mailOptions);
            console.log("Email sent successfully to:", customer.email);
            return snap.ref.update({ status: "email_sent" });
        } catch (error) {
            console.error("There was an error while sending the email:", error);
            return snap.ref.update({ status: "email_error", error: error.message });
        }
    });

exports.sendEnquiryEmail = functions.firestore
    .document("enquiries/{enquiryId}")
    .onCreate(async (snap, context) => {
        const data = snap.data();
        const { name, phone, email, eventType, eventDate, message } = data;

        const mailOptions = {
            from: `"VIP Catering" <${gmailEmail}>`,
            to: "vipcateringservice1@gmail.com", // Official Business Email
            cc: email, // Send a copy to the customer
            subject: `New Event Enquiry - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 15px; overflow: hidden; background: #fff;">
                    <div style="background: #111; color: #C9A227; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; font-style: italic;">VIP CATERING</h1>
                        <p style="margin: 5px 0 0; color: #fff; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;">General Event Enquiry</p>
                    </div>
                    
                    <div style="padding: 30px;">
                        <h2 style="color: #111; border-bottom: 2px solid #C9A227; padding-bottom: 10px; font-size: 20px;">Inquiry Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #666;">Name:</td><td style="color: #111;">${name}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td><td style="color: #111;">${phone}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td><td style="color: #111;">${email}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Event Type:</td><td style="color: #111;">${eventType}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Event Date:</td><td style="color: #111;">${eventDate}</td></tr>
                        </table>

                        <h2 style="color: #111; border-bottom: 2px solid #C9A227; padding-bottom: 10px; margin-top: 30px; font-size: 20px;">Customer Message</h2>
                        <div style="padding: 20px; background: #f9f9f9; border-radius: 10px; color: #333; line-height: 1.6; margin-top: 10px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>

                        <div style="margin-top: 40px; text-align: center; color: #777; font-size: 12px;">
                            <p>This is an automated enquiry from your website contact form.</p>
                            <p>© 2026 VIP Catering Chennai. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            `,
        };

        try {
            await mailTransport.sendMail(mailOptions);
            console.log("Enquiry email sent successfully to:", email);
            return snap.ref.update({ status: "email_sent" });
        } catch (error) {
            console.error("Error sending enquiry email:", error);
            return snap.ref.update({ status: "email_error", error: error.message });
        }
    });
