<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDocuments } from '~/composables/documents' // returns a reactive array of uploaded docs
import { useToast } from '~/composables/toast'

const router = useRouter()
const toast = useToast()

// Modal state and selections
const modalOpen = ref(false)
// This will be a reactive array of uploaded documents (e.g. [{ name, size, ... }, ...])
const documents = useDocuments() 
const selectedFiles = ref<string[]>([])
const selectedAvatar = ref<string | null>(null)

// Define three avatars – replace the src values with your actual image paths
const avatars = [
  { id: 'avatar1', label: 'Avatar 1', src: '/avatars/avatar1.png' },
  { id: 'avatar2', label: 'Avatar 2', src: '/avatars/avatar2.png' },
  { id: 'avatar3', label: 'Avatar 3', src: '/avatars/avatar3.png' }
]

// Modal control functions
function openModal() {
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

// Create Deal Room function
function createDealRoom() {
  // Validate that at least one file and an avatar have been selected
  if (selectedFiles.value.length === 0 || !selectedAvatar.value) {
    toast.add({
      title: 'Selection Required',
      description: 'Please select at least one file and an avatar.',
      color: 'error'
    })
    return
  }

  // Construct a DealRoom object (for illustration purposes)
  const dealRoom = {
    id: 'deal-' + Date.now(),
    name: 'New Deal Room',
    documents: documents.value.filter(doc => selectedFiles.value.includes(doc.name)),
    systemPrompt: {
      id: 'default',
      type: 'general',
      content: '',
      metadata: {
        name: 'Default Prompt',
        description: 'A default system prompt'
      }
    },
    conversations: [],
    created: new Date(),
    updated: new Date()
  }

  // Optionally, save the dealRoom to a global store or via an API call.
  // Navigate to the DealRoom page (assuming a route named 'DealRoom' exists)
  router.push({ name: 'DealRoom', params: { id: dealRoom.id } })
}
</script>

<template>
  <div>
    <!-- Button to open the modal -->
    <UButton @click="openModal">
      Create Deal Room
    </UButton>

    <!-- Modal overlay -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <!-- Modal content -->
      <div class="bg-white dark:bg-zinc-800 p-6 rounded shadow-lg w-11/12 md:w-1/2">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-primary">Create Deal Room</h2>
          <button class="text-zinc-500 hover:text-zinc-700" @click="closeModal">
            &times;
          </button>
        </div>

        <!-- File Selection Section -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-2">Select Files</h3>
          <div v-if="documents.length">
            <ul>
              <li
                v-for="doc in documents"
                :key="doc.name"
                class="flex items-center mb-1"
              >
                <input
                  type="checkbox"
                  :id="doc.name"
                  :value="doc.name"
                  v-model="selectedFiles"
                  class="mr-2"
                />
                <label
                  :for="doc.name"
                  class="text-sm text-zinc-700 dark:text-zinc-300"
                >
                  {{ doc.name }} ({{ doc.size }} MB)
                </label>
              </li>
            </ul>
          </div>
          <div v-else class="text-sm text-zinc-500">
            No documents available. Please upload documents first.
          </div>
        </div>

        <!-- Avatar Selection Section -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-2">Select an Avatar</h3>
          <div class="flex gap-4">
            <div
              v-for="avatar in avatars"
              :key="avatar.id"
              @click="selectedAvatar = avatar.id"
              :class="[
                'cursor-pointer border rounded p-2 flex flex-col items-center',
                selectedAvatar === avatar.id ? 'border-blue-500' : 'border-transparent'
              ]"
            >
              <img
                :src="avatar.src"
                :alt="avatar.label"
                class="w-16 h-16 mb-2"
              />
              <span class="text-sm">{{ avatar.label }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3">
          <UButton variant="ghost" color="neutral" @click="closeModal">
            Cancel
          </UButton>
          <UButton color="primary" @click="createDealRoom">
            Create Deal Room
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
