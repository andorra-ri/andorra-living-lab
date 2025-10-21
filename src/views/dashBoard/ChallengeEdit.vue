<template>
  <section v-if="challenge" class="body dash-body">
    <h2 class="center">Esteu editant <strong>{{ challenge.name_ca }}</strong></h2>
    <div class="container dash-container">
      <div class="split-layout space-between">
        <div>
          <ImageList :images="challenge.cover" />
        </div>
        <div>
          <Input v-model="name_ca" :placeholder="challenge.name_ca" label="Nom català" />
          <div class="inline-spacer" />
          <Input v-model="name_en" :placeholder="challenge.name_en" label="Nom anglès" />
        </div>
        <div>
          <div class="height-divided">
            <p class="left-space no-margin">Caracters ca</p>
            <p class="left-space no-margin">
              {{ countCharacters(name_ca, challenge.name_ca) }}/{{ maxCaracters }}
            </p>
          </div>
          <div class="inline-spacer" />
          <div class="height-divided">
            <p class="left-space no-margin">Caracters en</p>
            <p class="left-space no-margin">
              {{ countCharacters(name_en, challenge.name_en) }}/{{ maxCaracters }}
            </p>
          </div>
        </div>
      </div>
      <div class="spacer" />
      <div class="split-layout space-between">
        <DropDown
          v-model="selectedTypes"
          label="Tipus"
          :options="[
            { label: 'Tecnològic', value: 'tecnologic' },
            { label: 'Social', value: 'social' },
            { label: 'Ambiental', value: 'ambiental' },
            { label: 'Cultural', value: 'cultural' },
            { label: 'Econòmic', value: 'economic' }
          ]" />
        <DropDown
          v-model="selectedAreas"
          label="Area"
          :options="[
            { label: 'Tecnològic', value: 'tecnologic' },
            { label: 'Social', value: 'social' },
            { label: 'Ambiental', value: 'ambiental' },
            { label: 'Cultural', value: 'cultural' },
            { label: 'Econòmic', value: 'economic' }
          ]" />
        <DatePicker
          v-model="date"
          date-format="dd/mm/yy" />
        <DatePicker
          v-model="date"
          date-format="dd/mm/yy" />
      </div>
      <div class="spacer" />
      <div class="split-layout space-between">
        <Input v-model="link" :placeholder="challenge.link" label="Link" />
        <div class="height-divided">
          <p class="no-margin">Actiu</p>
          <ActiveButton v-model="active" />
        </div>
        <DropDown
          v-model="selectedTypes"
          label="Status"
          :options="[
            { label: 'Live', value: 'live' },
            { label: 'Draft', value: 'draft' },
          ]"
          style="margin-top: 1rem;" />
      </div>
      <div class="spacer" />
      <div class="split-layout space-between">
        <TextArea
          v-model="message"
          :placeholder="challenge.description_ca"
          label="Descripció català" />
        <TextArea
          v-model="message"
          :placeholder="challenge.description_en"
          label="Descripció anglès" />
      </div>
      <div class="spacer" />
      <div class="split-layout space-between">
        <PdfPreview :current-pdf="challenge.bases" />
        <ImageList :images="challenge.partners" />
      </div>

      <div class="spacer" />
      <div class="split-layout space-between">
        <Button class="btn red-btn">Cancelar</Button>
        <Button class="btn green-btn">Guardar</Button>
      </div>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import { Remarkable } from 'remarkable';
import { useChallengesStore } from '/@/stores/challengesStore';
import DatePicker from 'primevue/datepicker';
import DropDown from '../../components/DropDown.vue';
import ActiveButton from '../../components/ActiveButton.vue';
import Input from '../../components/Input.vue';
import PdfPreview from '../../components/PdfPreview.vue';
import ImageList from '../../components/ImageList.vue';
import TextArea from '../../components/TextArea.vue';

export default {
  name: 'ChallengeEdit',
  components: {
    DropDown,
    ActiveButton,
    DatePicker,
    Input,
    PdfPreview,
    ImageList,
    TextArea,
  },

  setup() {
    const { t, locale } = useI18n();
    const { params } = useRoute();
    const router = useRouter();
    const challengesStore = useChallengesStore();
    const active = ref(false);

    const maxCaracters = 80;

    /**
    const md = new Remarkable('full', {
      html: true,
      breaks: true,
      typographer: true,
    });
    */

    const challenge = computed(() => {
      const raw = challengesStore.challenge;

      if (!raw) return null;
      return { ...raw };
    });

    onBeforeMount(async () => {
      await challengesStore.getChallenge(params.slug);

      if (!challengesStore.challenge) {
        router.push('/dashboard');
        return;
      }
      active.value = challengesStore.challenge.active || false;
    });

    return { t, locale, challenge, active, maxCaracters };
  },

  data() {
    return {
      name_ca: '',
      name_en: '',
      selectedTypes: [],
      selectedAreas: [],
      link: '',
      date: null,
    };
  },

  methods: {
    countCharacters(currentStr, oldStr) {
      if (!currentStr) return oldStr ? oldStr.length : 0;
      return currentStr ? currentStr.length : 0;
    },
  },
};

</script>

<style lang="scss" scoped>

.container {
    position: relative;
    max-width: 1124px;
    margin: 0 auto;
    padding: 0 1rem;
    z-index: 1;
}

h2{
  font: var(--text-size) / 1.2 var(--text-font);
  color: var(--text-color);
  font-weight: 300;
  line-height: 1.1;
  text-transform: none;
  padding: 0.1rem;
}

.height-divided{
    height: 50%;
}

:deep(.p-datepicker) {
    height: 1.5rem;
    border: 1px solid var(--color-primary);
    border-radius: 4px;
}

</style>

<style lang="scss">
.p-datepicker-panel{
    background-color: white;
    border: 1px solid var(--color-primary);
    border-radius: 4px;
}
</style>
