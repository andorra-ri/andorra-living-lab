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
          <img :src="project.cover[0].url" class="cover">
          <figcaption>{{ project.cover[0].filename }}</figcaption>
        </figure>
        <div class="box secondary">
          <p class="tags">
            <span v-for="tag in project.area" :key="tag" class="tag">
              {{ t(`sectors.${tag}`) }}
            </span>
          </p>
          <h3>{{ project[`name_${locale}`] }}</h3>
          <p>{{ project[`abstract_${locale}`] }}</p>
          <p><a :href="`/project/${project.slug}`">{{ t('projects.more') }} &rarr;</a></p>
        </div>
      </div>
    </paginated>
    <p v-else class="empty">{{ t('projects.empty') }}</p>
  </section>
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getProjects } from '/@/services/api.service';
import Paginated from '/@/components/Paginated.vue';

export default {
  name: 'CaseStudies',
  components: { Paginated },
  setup() {
    const { t, locale } = useI18n();
    const projects = ref([]);

    watch(locale, async () => {
      projects.value = await getProjects();
    }, { immediate: true });

    return { t, locale, projects };
  },
};
</script>
