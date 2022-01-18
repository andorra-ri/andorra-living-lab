<template>
  <div v-if="project">
    <header class="section primary">
      <img :src="project.cover[0].url" class="cover shaded" draggable="false">
    </header>
    <section class="section">
      <div class="container">
        <aside class="light">
          <div v-if="project.url" class="external">
            <h3>{{ t('projects.links') }}</h3>
            <p><a :href="project.url">{{ t('projects.visit_website') }} &rarr;</a></p>
          </div>
          <div v-if="project.documents.length" class="documents">
            <h3>{{ t('projects.documents') }}</h3>
            <ul>
              <li v-for="doc in project.documents" :key="doc.filename">
                <a :href="doc.url" target="blank" class="button block">
                  <img v-svg-inline :src="`/icons/${doc.icon}.svg`" class="icon">
                  {{ doc.filename }}
                </a>
              </li>
            </ul>
          </div>
          <div class="more">
            <h3>{{ t('projects.know_more') }}</h3>
            <p>{{ t('projects.contact') }}</p>
            <p><a href="#contact">{{ t('projects.contact_us') }} &rarr;</a></p>
          </div>
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
import { useRoute, useRouter } from 'vue-router';
import { Remarkable } from 'remarkable';
import { getProjects } from '/@/services/api.service';
import fileIcon from '/@/utils/file-icons';

export default {
  name: 'Project',
  setup() {
    const { t, locale } = useI18n();
    const { params } = useRoute();
    const { push } = useRouter();
    const project = ref(undefined);

    const md = new Remarkable('full', {
      html: true,
      breaks: true,
      typographer: true,
    });

    onMounted(async () => {
      try {
        const [{
          [`name_${locale.value}`]: name,
          [`description_${locale.value}`]: description,
          documents: docs = [],
          ...rest
        }] = await getProjects(params.slug);
        const documents = docs.map(doc => ({ ...doc, icon: fileIcon(doc.type) }));
        project.value = { ...rest, name, documents, description: md.render(description) };
      } catch (error) {
        push('/#case-studies');
      }
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

  .more {
    background: #fff;
    padding: 0.75rem 1rem;
    margin: 2rem 0;
  }
}
</style>
