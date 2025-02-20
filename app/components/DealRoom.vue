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
    <!-- The button that triggers the modal -->
    <UButton @click="openModal">Create Deal Room</UButton>

    <!-- Modal (only visible when modalOpen is true) -->
    <transition name="fade">
      <div
        v-if="modalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div
          class="bg-white dark:bg-zinc-800 p-6 rounded shadow-lg w-11/12 md:w-3/4 max-h-[90vh] overflow-y-auto"
        >
          <!-- Analysis Section -->
          <h2 class="text-2xl font-bold mb-4 text-primary">Analysis</h2>
          <div class="space-y-6">
            <!-- 10X Underwriter -->
            <div class="flex items-start space-x-4">
              <!-- Avatar -->
              <div class="shrink-0">
                <img
                  src="/legal.png"
                  alt="10X Underwriter"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <!-- Message Bubble -->
              <div>
                <div class="flex items-center space-x-2">
                  <span class="font-semibold text-zinc-800 dark:text-zinc-200">10X Underwriter</span>
                  <span class="text-sm text-zinc-500 dark:text-zinc-400">2:45 PM</span>
                </div>
                <p class="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                  I’ve analyzed the Q4 financial statements. Revenue growth is strong at
                  28% YoY, with improving operating margins. Credit metrics are within acceptable ranges.
                </p>
                <div class="mt-2 flex space-x-2">
                  <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Financial Analysis
                  </span>
                  <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Credit Check
                  </span>
                </div>
              </div>
            </div>

            <!-- Risk Checker -->
            <div class="flex items-start space-x-4">
              <!-- Avatar -->
              <div class="shrink-0">
                <img
                  src="/risk.png"
                  alt="Risk Checker"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <!-- Message Bubble -->
              <div>
                <div class="flex items-center space-x-2">
                  <span class="font-semibold text-zinc-800 dark:text-zinc-200">Risk Checker</span>
                  <span class="text-sm text-zinc-500 dark:text-zinc-400">2:47 PM</span>
                </div>
                <p class="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                  Quick risk assessment complete. Debt service coverage ratio is 1.8x, above
                  our minimum threshold. No significant red flags in payment history.
                </p>
                <div class="mt-2 flex space-x-2">
                  <span class="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                    Risk Assessment
                  </span>
                  <span class="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                    Payment Analysis
                  </span>
                </div>
              </div>
            </div>

            <!-- Sounding Board -->
            <div class="flex items-start space-x-4">
              <!-- Avatar -->
              <div class="shrink-0">
                <img
                  src="/consultant.png"
                  alt="Sounding Board"
                  class="w-12 h-12 rounded-full"
                />
              </div>
              <!-- Message Bubble -->
              <div>
                <div class="flex items-center space-x-2">
                  <span class="font-semibold text-zinc-800 dark:text-zinc-200">Sounding Board</span>
                  <span class="text-sm text-zinc-500 dark:text-zinc-400">2:50 PM</span>
                </div>
                <p class="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                  Based on the comprehensive analysis, this application falls within our
                  standard underwriting criteria. Recommend proceeding with standard terms.
                </p>
                <div class="mt-2 flex space-x-2">
                  <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Final Review
                  </span>
                  <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Documentation
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <hr class="my-6 border-gray-200 dark:border-zinc-600" />

          <!-- File Selection -->
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

          <!-- Persona Selection -->
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Select a Persona</h3>
            <div class="flex gap-4">
              <div
                v-for="persona in personas"
                :key="persona.id"
                @click="selectedPersona = persona.id"
                :class="[
                  'cursor-pointer border rounded p-4 flex flex-col items-center',
                  selectedPersona === persona.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 dark:border-zinc-600'
                ]"
              >
                <img
                  :src="persona.src"
                  :alt="persona.name"
                  class="w-16 h-16 mb-2"
                />
                <span class="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {{ persona.name }}
                </span>
                <span class="text-xs text-zinc-600 dark:text-zinc-400">
                  {{ persona.description }}
                </span>
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
    </transition>
  </div>
</template>
