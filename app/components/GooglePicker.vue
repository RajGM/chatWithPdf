<template>
  <button @click="openPicker">Select from Google Drive</button>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
const oauthToken = ref<string>('')
const emit = defineEmits(['file-selected'])

interface GooglePickerDocument {
  id: string
  name: string
  type: string
  mimeType: string
  url: string
  embedUrl?: string
  downloadUrl?: string
  webContentLink?: string
}

// These would typically come from your environment variables
const API_KEY = 'AIzaSyCxV5SficyXoyD7ZkdB-tQalW-xTRX9wtM'
const CLIENT_ID = '291123850624-6at4b8u7oil4955bknf3trttg2utai1k.apps.googleusercontent.com'
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

let picker: any = null
let tokenClient: any = null

onMounted(() => {
  loadGoogleAPIs()
})

async function loadGoogleAPIs() {
  // Load the Google API Client Library
  await loadScript('https://apis.google.com/js/api.js')
  await loadScript('https://accounts.google.com/gsi/client')

  // Initialize the tokenClient
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    callback: '', // defined at request time
  })

  // Load the picker API
  await new Promise((resolve) => {
    gapi.load('picker', resolve)
  })
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (e) => reject(e)
    document.body.appendChild(script)
  })
}

function openPicker() {
  if (!tokenClient) {
    console.error('Token client not initialized')
    return
  }

  // Request an access token
  tokenClient.callback = async (response: any) => {
    if (response.error !== undefined) {
      throw response
    }

    const accessToken = response.access_token
    oauthToken.value = response.access_token
    createPicker(accessToken)
  }

  tokenClient.requestAccessToken({ prompt: 'consent' })
}

function createPicker(accessToken: string) {
  if (typeof google === 'undefined' || !google.picker) {
    console.error('Picker library not loaded')
    return
  }

  const view = new google.picker.View(google.picker.ViewId.DOCS)
  // Optionally set MIME types
  // view.setMimeTypes('application/pdf,text/plain')

  picker = new google.picker.PickerBuilder()
    .enableFeature(google.picker.Feature.NAV_HIDDEN)
    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    .setAppId(CLIENT_ID)
    .setOAuthToken(accessToken)
    .setDeveloperKey(API_KEY)
    .addView(view)
    .setCallback(pickerCallback)
    .build()

  picker.setVisible(true)
}

function pickerCallback(data) {
  if (data.action === google.picker.Action.PICKED && data.docs && data.docs.length) {
    const docs = data.docs // array of selected documents
    console.log('Selected documents from Drive:', docs)

    // Instead of uploading here, we emit the docs + token to the parent
    // We'll let the parent handle the actual upload (FormData + streaming)
    emit('file-selected', {
      docs,
      token: oauthToken.value
    })
  }
}

</script>