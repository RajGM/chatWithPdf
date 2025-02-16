<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

// Modal state and selections
const modalOpen = ref(false);
const documents = useDocuments();
const selectedFiles = ref<string[]>([]);
const selectedPersona = ref<string | null>(null);

// Define personas (same as avatars)
const personas = [
  { id: 'financialAnalyst', name: "10x Underwriter", description: "Focuses on financial metrics, risk assessment, and financial analysis.", src: '/legal.png' },
  { id: 'legalOperations', name: "Risk Checker", description: "Expert in legal compliance and operational risk assessment.", src: '/risk.png' },
  { id: 'generalAdvisor', name: "Sounding Board", description: "Open-ended strategic insights for general discussions.", src: '/consultant.png' }
];

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

function createDealRoom() {
  if (!selectedFiles.value.length || !selectedPersona.value) {
    toast.error('Please select at least one file and a persona.');
    return;
  }

  const dealRoom = {
    id: `deal-${Date.now()}`,
    name: 'New Deal Room',
    documents: documents.value.filter(doc => selectedFiles.value.includes(doc.name)),
    systemPrompt: personas.find(persona => persona.id === selectedPersona.value),
    conversations: [],
    created: new Date(),
    updated: new Date()
  };

  router.push({ name: 'DealRoom', params: { id: dealRoom.id } });
}
</script>

<template>
  <div>
    <UButton @click="openModal">Create Deal Room</UButton>

    <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-zinc-800 p-6 rounded shadow-lg w-11/12 md:w-1/2">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-primary">Create Deal Room</h2>
          <button class="text-zinc-500 hover:text-zinc-700" @click="closeModal">&times;</button>
        </div>

        <!-- File Selection -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-2">Select Files</h3>
          <div v-if="documents.length">
            <ul>
              <li v-for="doc in documents" :key="doc.name" class="flex items-center mb-1">
                <input type="checkbox" :id="doc.name" :value="doc.name" v-model="selectedFiles" class="mr-2" />
                <label :for="doc.name" class="text-sm text-zinc-700 dark:text-zinc-300">
                  {{ doc.name }} ({{ doc.size }} MB)
                </label>
              </li>
            </ul>
          </div>
          <div v-else class="text-sm text-zinc-500">No documents available. Please upload documents first.</div>
        </div>

        <!-- Persona (Avatar) Selection -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-2">Select a Persona</h3>
          <div class="flex gap-4">
            <div v-for="persona in personas" :key="persona.id" @click="selectedPersona = persona.id"
                 :class="['cursor-pointer border rounded p-4 flex flex-col items-center', selectedPersona === persona.id ? 'border-blue-500 shadow-lg' : 'border-transparent']">
              <img :src="persona.src" :alt="persona.name" class="w-16 h-16 mb-2" />
              <span class="text-sm font-medium">{{ persona.name }}</span>
              <span class="text-xs text-zinc-600 dark:text-zinc-400">{{ persona.description }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3">
          <UButton variant="ghost" color="neutral" @click="closeModal">Cancel</UButton>
          <UButton color="primary" @click="createDealRoom">Create Deal Room</UButton>
        </div>
      </div>
    </div>
  </div>
</template>
