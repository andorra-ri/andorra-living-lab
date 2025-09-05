<template>
  <section id="case-studies" class="section">
    <div class="container center">
      <i18n-t tag="h2" keypath="projects.title">
        <template #strong><strong>{{ t('projects.title_em') }}</strong></template>
      </i18n-t>
      <p>{{ t('projects.description') }}</p>
    </div>
    <paginated
      v-if="projects.length"
      v-slot="{ item: project }"
      :items="projects"
      class="cards">
      <div class="card-box">
        <figure class="cover">
          <img :src="project.cover[0]" class="cover">
          <figcaption>{{ project.cover_caption[0] }}</figcaption>
        </figure>
        <div class="box secondary">
          <p class="tags">
            <span v-for="tag in project.area" :key="tag" class="tag">
              {{ t(`sectors.${tag}`) }}
            </span>
          </p>
          <h3>{{ project[`name_${locale}`] }}</h3>
          <p>{{ project[`abstract_${locale}`] }}</p>
          <p>
            <router-link :to="`/project/${project.slug}`">
              {{ t('projects.more') }} &rarr;
            </router-link>
          </p>
        </div>
      </div>
    </paginated>
    <p v-else class="empty">{{ t('projects.empty') }}</p>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Paginated from '/@/components/Paginated.vue';
import { useProjectsStore } from '/@/stores/projectsStore';

export default {
  name: 'CaseStudies',
  components: { Paginated },
  setup() {
    const { t, locale } = useI18n();

    const projectsStore = useProjectsStore();

    const projects = computed(() => {
      return projectsStore.projects
    });

    return { t, locale, projects };
  },
};
</script>
