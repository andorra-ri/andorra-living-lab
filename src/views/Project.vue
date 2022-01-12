<template>
  <div v-if="project">
    <header class="section primary">
      <img :src="project.cover[0].url" class="cover shaded" draggable="false">
    </header>
    <section class="section">
      <div class="container">
        <aside class="light">
        </aside>
        <div class="main">
          <h1>{{ project.name }}</h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="md" v-html="project.description" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Remarkable } from 'remarkable';
import { getProjects } from '/@/services/api.service';

export default {
  name: 'Project',
  setup() {
    const { t, locale } = useI18n();
    const { params } = useRoute();
    const project = ref(undefined);

    const md = new Remarkable('full', {
      html: true,
      breaks: true,
      typographer: true,
    });

    onMounted(async () => {
      const [{
        [`name_${locale.value}`]: name,
        [`description_${locale.value}`]: description,
        ...rest
      }] = await getProjects(params.slug);
      project.value = { ...rest, name, description: md.render(description) };
    });

    return { t, locale, project };
  },
};
</script>

<style lang="scss" scoped>
header.section { height: 10rem; }

.container {
  display: flex;
  gap: 2rem;

  aside {
    flex: 0 0 18rem;
    padding: 1rem;
    box-sizing: border-box;
  }
}
</style>
