import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send new inquiry notification to admin
export const sendInquiryNotification = async (inquiryData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: '🔔 New Customer Inquiry - Kagzi India',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #860000; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #860000; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #860000; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background-color: #860000; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Customer Inquiry</h1>
            </div>
            <div class="content">
              <p>You have received a new inquiry from your website:</p>
              
              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${inquiryData.name}</div>
              </div>

              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${inquiryData.email}</div>
              </div>

              <div class="field">
                <div class="label">📱 Phone:</div>
                <div class="value">${inquiryData.phone}</div>
              </div>

              ${inquiryData.company ? `
              <div class="field">
                <div class="label">🏢 Company:</div>
                <div class="value">${inquiryData.company}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${inquiryData.message}</div>
              </div>

              <div class="field">
                <div class="label">📅 Received At:</div>
                <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
              </div>

              <center>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/customer-inquiries" class="button">
                  View in Admin Panel
                </a>
              </center>
            </div>
            <div class="footer">
              <p>This is an automated notification from Kagzi India</p>
              <p>© ${new Date().getFullYear()} Kagzi India. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send product inquiry notification to admin
export const sendProductInquiryNotification = async (inquiryData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: '🛍️ New Product Inquiry - Kagzi India',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #860000; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #860000; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #860000; }
            .product-box { background-color: white; padding: 15px; border: 2px solid #860000; border-radius: 8px; margin: 20px 0; }
            .product-name { font-size: 18px; font-weight: bold; color: #860000; margin-bottom: 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 30px; background-color: #860000; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛍️ New Product Inquiry</h1>
            </div>
            <div class="content">
              <p>You have received a new product inquiry from your website:</p>
              
              ${inquiryData.productName ? `
              <div class="product-box">
                <div class="product-name">📦 Product: ${inquiryData.productName}</div>
                ${inquiryData.productImage ? `<img src="${inquiryData.productImage}" alt="${inquiryData.productName}" style="max-width: 200px; border-radius: 8px; margin-top: 10px;">` : ''}
              </div>
              ` : ''}

              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${inquiryData.name}</div>
              </div>

              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${inquiryData.email}</div>
              </div>

              <div class="field">
                <div class="label">📱 Phone:</div>
                <div class="value">${inquiryData.phone}</div>
              </div>

              ${inquiryData.company ? `
              <div class="field">
                <div class="label">🏢 Company:</div>
                <div class="value">${inquiryData.company}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${inquiryData.message}</div>
              </div>

              <div class="field">
                <div class="label">📅 Received At:</div>
                <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
              </div>

              <center>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/inquiries" class="button">
                  View in Admin Panel
                </a>
              </center>
            </div>
            <div class="footer">
              <p>This is an automated notification from Kagzi India</p>
              <p>© ${new Date().getFullYear()} Kagzi India. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Product inquiry email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending product inquiry email:', error);
    return { success: false, error: error.message };
  }
};

// Send confirmation email to customer
export const sendCustomerConfirmation = async (inquiryData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: inquiryData.email,
      subject: 'Thank You for Contacting Kagzi India',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #860000; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .highlight { color: #860000; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Dear <span class="highlight">${inquiryData.name}</span>,</p>
              
              <p>Thank you for contacting <strong>Kagzi India</strong>. We have received your inquiry and our team will get back to you shortly.</p>
              
              <p><strong>Your inquiry details:</strong></p>
              <p style="background-color: white; padding: 15px; border-left: 3px solid #860000;">
                ${inquiryData.message}
              </p>

              <p>We typically respond within 24-48 hours during business days.</p>
              
              <p>If you have any urgent questions, feel free to call us directly.</p>

              <p>Best regards,<br>
              <strong>Kagzi India Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Kagzi India. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Customer confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending customer confirmation:', error);
    return { success: false, error: error.message };
  }
};
