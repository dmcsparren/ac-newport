# Google Sheets Sync Setup

This guide connects your tryout registrations database to Google Sheets using Google Apps Script. New tryout registrations will automatically appear in your sheet, and payment status updates will be reflected in real-time.

## Step 1: Your Google Sheet

Your sheet should have a tab named **Tryout Registrations** with these columns (A through Y):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Waiver | jersey # | Day 1 | Day 2 | fee_paid | id | first_name | last_name | date_of_birth | gender | primary_position | secondary_position | dominant_foot | email | phone | city | state | country | experience | created_at | updated_at | payment_status | stripe_payment_id | paid_at | payment_amount |

Columns A-E (Waiver, jersey #, Day 1, Day 2, fee_paid) are your custom columns that you manage manually. The sync will fill in columns F onward (id through payment_amount).

## Step 2: Add the Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Tryout Registrations');

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Helper: find row by id in column F (index 5)
    function findRowById(sheet, id) {
      var dataRange = sheet.getDataRange();
      var values = dataRange.getValues();
      for (var i = 1; i < values.length; i++) {
        if (String(values[i][5]) === String(id)) {
          return i + 1; // 1-based row number
        }
      }
      return -1;
    }

    if (data.type === 'tryout_registration') {
      // Check if this id already exists
      var existingRow = findRowById(sheet, data.id);
      if (existingRow > 0) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'already exists', id: data.id }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // Columns A-E are custom (Waiver, jersey #, Day 1, Day 2, fee_paid) — left blank
      // Columns F onward match the database fields
      sheet.appendRow([
        '',                                        // A: Waiver
        '',                                        // B: jersey #
        '',                                        // C: Day 1
        '',                                        // D: Day 2
        '',                                        // E: fee_paid
        data.id,                                   // F: id
        data.firstName,                            // G: first_name
        data.lastName,                             // H: last_name
        data.dateOfBirth,                          // I: date_of_birth
        data.gender,                               // J: gender
        data.primaryPosition,                      // K: primary_position
        data.secondaryPosition || '',              // L: secondary_position
        data.dominantFoot || '',                   // M: dominant_foot
        data.email,                                // N: email
        data.phone,                                // O: phone
        data.city,                                 // P: city
        data.state,                                // Q: state
        data.country,                              // R: country
        data.experience,                           // S: experience
        data.createdAt || new Date().toISOString(),// T: created_at
        '',                                        // U: updated_at
        data.paymentStatus || 'pending',           // V: payment_status
        '',                                        // W: stripe_payment_id
        '',                                        // X: paid_at
        ''                                         // Y: payment_amount
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: 'ok', sheet: 'tryout_registration' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.type === 'payment_update') {
      var dataRange = sheet.getDataRange();
      var values = dataRange.getValues();
      // Email is in column N (index 13)
      for (var i = 1; i < values.length; i++) {
        if (values[i][13] === data.email) {
          sheet.getRange(i + 1, 22).setValue(data.paymentStatus);     // V: payment_status
          sheet.getRange(i + 1, 23).setValue(data.stripePaymentId);   // W: stripe_payment_id
          sheet.getRange(i + 1, 24).setValue(new Date().toISOString()); // X: paid_at
          sheet.getRange(i + 1, 25).setValue(9900);                   // Y: payment_amount (cents)
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: 'ok', updated: data.email }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.type === 'mailing_list') {
      // Mailing list sync — add a "Mailing List" tab when ready
      return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'mailing_list skipped' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Unknown type' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (Ctrl+S / Cmd+S)
5. Name the project "AC Newport Sheet Sync"

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Set the following:
   - **Description:** "Registration sync"
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. **Authorize** the app when prompted (click through the "unsafe" warning — this is your own script)
6. **Copy the Web app URL** — it will look like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Step 4: Add the URL to Your Server

Add this environment variable to your `.env` file (and Railway):

```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

For Railway:
1. Go to your Railway project
2. Click on your service > **Variables**
3. Add `GOOGLE_APPS_SCRIPT_URL` with the URL from Step 3

## Step 5: Test It

After deploying, any new registration on your site will automatically appear in the Google Sheet. You can test locally by running your dev server with the env var set.

## Updating the Script

If you need to change the Apps Script code:
1. Edit in Apps Script editor
2. Click **Deploy > Manage deployments**
3. Click the pencil icon on your deployment
4. Set version to **New version**
5. Click **Deploy**

> **Important:** You must create a new version each time you update — otherwise the old code continues to run.
