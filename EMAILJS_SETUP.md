# EmailJS Setup Guide - Appointment Form

Complete step-by-step guide to set up automated email notifications for your appointment form.

---

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **Sign Up** (it's FREE - 200 emails/month)
3. Sign up with your email or Google account
4. Verify your email address

---

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (Recommended - easiest setup)
   - Outlook
   - Yahoo
   - Or Custom SMTP

### For Gmail (Recommended):
1. Select **Gmail**
2. Click **Connect Account**
3. Sign in with your Google account (the email where you want to receive appointments)
4. Allow EmailJS permissions
5. Give your service a name (e.g., "Multisensa Appointments")
6. Click **Create Service**
7. **Copy your Service ID** (e.g., `service_abc123`) - you'll need this!

---

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. **Replace** the default template with this:

### Template Configuration:

**Template Name:** `Appointment Notification`

**Subject:**
```
New Appointment Request from {{from_name}}
```

**Email Body (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #33A9B1; border-bottom: 3px solid #33A9B1; padding-bottom: 10px;">
        🩺 New Appointment Request
    </h2>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1F3D3F; margin-top: 0;">Patient Information:</h3>

        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">{{from_name}}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">{{from_email}}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">{{phone}}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;"><strong>Gender:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">{{gender}}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;"><strong>Service:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">{{service}}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;"><strong>Preferred Date & Time:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">{{appointment_date}}</td>
            </tr>
        </table>
    </div>

    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
        <h4 style="margin: 0 0 10px 0; color: #856404;">📝 Patient Message:</h4>
        <p style="margin: 0; color: #856404;">{{message}}</p>
    </div>

    <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="margin: 0; color: #2e7d32; font-size: 14px;">
            ⚡ <strong>Action Required:</strong> Please contact the patient to confirm the appointment.
        </p>
    </div>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p style="color: #6c757d; font-size: 12px; text-align: center; margin: 0;">
        Sent from Multisensa Physiotherapy Website<br>
        477 Nishtar Block, Allama Iqbal Town, Lahore | 0314 7367769
    </p>
</div>
```

4. Click **Save** at the bottom
5. **Copy your Template ID** (e.g., `template_xyz789`) - you'll need this!

---

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find **Public Key** section
3. **Copy your Public Key** (e.g., `abc123XYZ456`) - you'll need this!

---

## Step 5: Update Your Website Code

Open your `script.js` file and update lines 84-86:

```javascript
// Find these lines:
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// Replace with your actual values:
const EMAILJS_PUBLIC_KEY = 'abc123XYZ456';  // From Step 4
const EMAILJS_SERVICE_ID = 'service_abc123';  // From Step 2
const EMAILJS_TEMPLATE_ID = 'template_xyz789';  // From Step 3
```

**Also update the recipient email (line 116):**
```javascript
to_email: 'your-actual-email@gmail.com'  // Email where you want to receive notifications
```

---

## Step 6: Test Your Form!

1. Open `index.html` in your browser
2. Scroll to the appointment form
3. Fill out all required fields:
   - Name: Test Patient
   - Email: test@example.com
   - Phone: 1234567890
   - Service: Back Pain Treatment
   - Gender: Male
   - Date & Time: Select any future date/time
   - Message: This is a test
4. Click **"Schedule Your Visit"**
5. Check your email inbox - you should receive the appointment notification!

---

## Email Template Variables

These are automatically filled from the form:

| Variable | Description |
|----------|-------------|
| `{{from_name}}` | Patient's name |
| `{{from_email}}` | Patient's email |
| `{{phone}}` | Patient's phone number |
| `{{service}}` | Type of service selected |
| `{{gender}}` | Patient's gender |
| `{{appointment_date}}` | Formatted date and time |
| `{{message}}` | Patient's message |
| `{{to_email}}` | Your email (recipient) |

---

## Troubleshooting

### Error: "Invalid Public Key"
- Go to EmailJS dashboard → Account → General
- Copy the correct Public Key
- Make sure there are no extra spaces

### Error: "Service Not Found"
- Go to Email Services
- Copy the exact Service ID (starts with `service_`)
- Check for typos

### Error: "Template Not Found"
- Go to Email Templates
- Copy the exact Template ID (starts with `template_`)
- Make sure the template is saved

### Not Receiving Emails
- Check your spam/junk folder
- Verify the Gmail account is connected in EmailJS
- Test sending from EmailJS dashboard directly
- Make sure your email quota (200/month) isn't exceeded

### Form Shows Error
- Open browser console (F12)
- Look for detailed error message
- Verify all three IDs are correct in script.js

---

## Free Plan Limits

✅ **200 emails per month** (FREE)
✅ Unlimited templates
✅ Multiple email services
✅ Email tracking

If you need more emails, EmailJS has paid plans starting at $7/month for 1,000 emails.

---

## Optional: Auto-Reply to Patient

Want to send a confirmation email to the patient too?

1. Create a **second template** in EmailJS:
   - Name: "Patient Confirmation"
   - Subject: `Appointment Request Received - Multisensa`
   - Body: Thank you message to patient

2. Add this code after line 114 in `script.js`:

```javascript
// Send confirmation to patient
await emailjs.send(
    EMAILJS_SERVICE_ID,
    'template_patient_confirmation',  // Your second template ID
    {
        to_email: formData.get('email'),
        patient_name: formData.get('name'),
        appointment_date: `${formattedDate} at ${formattedTime}`
    }
);
```

---

## Security Note

⚠️ EmailJS Public Key is safe to use in frontend code - it's designed for this purpose. However:

- Don't share your Private Key (if you have one)
- Set up reCAPTCHA in EmailJS dashboard to prevent spam
- Monitor your email quota

---

## Next Steps

After setup, you can:

1. ✅ Customize the email template design
2. ✅ Add auto-reply to patients
3. ✅ Enable reCAPTCHA for spam protection
4. ✅ Track email delivery stats in EmailJS dashboard
5. ✅ Set up multiple notification recipients

---

## Support

- **EmailJS Documentation:** https://www.emailjs.com/docs/
- **Tutorial Videos:** Available on EmailJS website
- **Support:** support@emailjs.com

---

**That's it!** Your appointment form now sends automated emails directly to your inbox. No database needed!
