<template>
  <section id="testimonials" class="section">
    <div v-if="testimonials.length" class="container columns columns--2">
      <div class="column">
        <figure class="cover cover--partial secondary" style="--width:115%">
          <img :src="cover" class="shaded">
        </figure>
      </div>
      <div class="column testimonials">
        <i18n-t tag="h2" keypath="testimonials.title">
          <template #strong><strong>{{ t('testimonials.title_em') }}</strong></template>
        </i18n-t>
        <paginated
          v-slot="{ item: testimonial }"
          :items="testimonials"
          :per-page="1">
          <blockquote class="primary">
            <p>{{ testimonial[`testimonial_${locale}`] }}</p>
            <div class="author">
              <img :src="testimonial.photo[0].url" class="avatar">
              <div class="details">
                <h4>{{ testimonial.name }}</h4>
                <em>{{ testimonial.company }}</em>
              </div>
            </div>
          </blockquote>
        </paginated>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTestimonials } from '/@/services/api.service';
import Paginated from '/@/components/Paginated.vue';
import config from '/@/config.yaml';

export default {
  name: 'Testimonials',
  components: { Paginated },
  setup() {
    const { t, locale } = useI18n();
    const testimonials = ref([]);

    watch(locale, async () => {
      testimonials.value = await getTestimonials();
    }, { immediate: true });

    return { t, locale, testimonials, ...config.testimonials };
  },
};
</script>

<style lang="scss" scoped>
.testimonials {
  z-index: 1;

  h2 { margin-left: 25% };
  .paginated { margin: 0; }

  blockquote {
    padding: 2rem;
    box-sizing: border-box;
    z-index: 1;

    p {
      font-size: 1.25rem;
      font-style: italic;
      opacity: 0.75;
    }

    .author {
      display: flex;
      align-items: center;
      margin: 1rem;

      .avatar {
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
        border-radius: 50%;
      }

      h4 { margin: 0; }
    }
  }
}
</style>
