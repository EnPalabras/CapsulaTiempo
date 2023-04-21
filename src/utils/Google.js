import { google } from 'googleapis'

const GOOGLE_SHEET_ID = process.env.SHEET_ID

const auth = new google.auth.GoogleAuth({
  keyFile: './src/connections/cred.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
})

const client = async () => {
  return await auth.getClient()
}

const googleSheets = google.sheets({
  version: 'v4',
  auth: client,
})

export const getRows = async (table_name) => {
  const response = await googleSheets.spreadsheets.values.get({
    auth,
    GOOGLE_SHEET_ID,
    range: table_name,
  })

  return response
}

export const appendData = async (table_name, values) => {
  try {
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId: GOOGLE_SHEET_ID,
      range: table_name,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: values,
      },
    })
    return 'Ok'
  } catch (error) {
    return 'Error'
  }
}
