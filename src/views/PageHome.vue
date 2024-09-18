<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import type { IInterview } from '@/interfaces'
import { v4 as uuidv4 } from 'uuid'

const router = useRouter()
const db = getFirestore()

const company = ref<string>('')
const vacancyLink = ref<string>('')
const hrName = ref<string>('')
const contactTelegram = ref<string>('')
const contactWhatsapp = ref<string>('')
const contactPhone = ref<string>('')

const loading = ref<boolean>(false)

const addNewInterview = async (): Promise<void> => {
  loading.value = true
  const payload: IInterview = {
    id: uuidv4(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactWhatsapp: contactWhatsapp.value,
    contactPhone: contactPhone.value,
    createdAt: new Date()
  }

  const userId = getAuth().currentUser?.uid
  if (userId) {
    await setDoc(doc(db, `users/${userId}/interviews`, payload.id), payload).then(() => {
      router.push('/list')
    })
  }

  loading.value = false
  console.log(payload)
}

const dissabledSaveButton = computed<boolean>(() => {
  return !(company.value && vacancyLink.value && hrName.value)
})
</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title> Новое собеседование </template>
      <template #content>
        <app-input-text class="input mb-3" placeholder="Компания" v-model="company" />
        <app-input-text class="input mb-3" placeholder="Описание вакансии" v-model="vacancyLink" />
        <app-input-text class="input mb-3" placeholder="Контакт (Имя)" v-model="hrName" />
        <app-input-text
          class="input mb-3"
          placeholder="Telegram username HR"
          v-model="contactTelegram"
        />
        <app-input-text class="input mb-3" placeholder="Whats`app HR" v-model="contactWhatsapp" />
        <app-input-text class="input mb-3" placeholder="Телефон" v-model="contactPhone" />
        <app-button
          class="btn-primary"
          label="Создать собеседование"
          :disabled="dissabledSaveButton"
          :loading="loading"
          @click="addNewInterview"
        >
          Добавить
        </app-button>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: auto;
}
</style>
