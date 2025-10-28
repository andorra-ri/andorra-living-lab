<template>
  <Modal title="editChallenge">
    <Form
      @submit="onFormSubmit"
      :initialValues="initialValues"
    >
      <label for="challengeName">Nom del Challenge</label>
      <InputText
        id="challengeName"
        name="challengeName"
        aria-describedby="username-help"
      />
      <Message size="small" severity="secondary" variant="simple">
        Introdueix un missatge descriptiu. Max 80 caràcters.
      </Message>

      <label for="challengeDate" class="font-bold block mb-2">Data del Challenge</label>
      <DatePicker
        id="challengeDate"
        name="challengeDate"
        showIcon
        fluid
        iconDisplay="input"
      />

      <div class="form-buttons">
        <Button label="Cancelar" severity="danger" @click="modals.close('editChallenge')" />
        <Button type="submit" label="Search" icon="pi pi-search" />
      </div>
    </Form>
  </Modal>

  <div v-if="metadata">
    <p>hoho</p>
  </div>
</template>

<script setup>
  import Modal from '../../components/Modal.vue';
  import { useModalStore } from '../../stores/modalsStore';
  import { computed, reactive } from 'vue';

  import { Form } from '@primevue/forms';
  import InputText from 'primevue/inputtext';
  import DatePicker from 'primevue/datepicker';
  import Button from 'primevue/button';

  const modals = useModalStore();
  const metadata = computed(() =>{
    const res = modals.getPayload('editChallenge')
    return res
  });

  // IMPORTANTE: usamos metadata.value
  const initialValues = reactive({
    challengeName: metadata.name
  });

  const onFormSubmit = (values) => {
    modals.open('confirmChanges', values)
  };
</script>

<style>
  .p-dialog .p-dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    gap: 1.2rem;
  }

  form label {
    font-weight: 600;
    margin-bottom: 0.4rem;
    text-align: left;
  }

  form input,
  form .p-inputtext,
  form .p-datepicker,
  form .p-calendar,
  form .p-inputwrapper {
    width: 100%;
  }

  form .p-message {
    padding-top: 10px;
    margin-bottom: 0.6rem;
  }

  form .form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  form .p-button {
    width: 48%;
  }
</style>
