<template>
  <footer class="footer">
    <div class="container">
      <div class="columns columns--2">
        <div class="column">
          <p><img :src="`images/logo_${locale}.svg`" class="logo"></p>
          <i18n-t tag="p" keypath="footer.last_will">
            <template #hashtag>
              <a href="https://twitter.com/search?q=%23andorralivinglab&src=typed_query" target="blank">
                #andorralivinglab
              </a>
            </template>
          </i18n-t>
          <ul class="social">
            <li v-for="(url, name) in social" :key="name">
              <a :href="url" target="blank" :title="t('follow_us', { name })">
                <img v-svg-inline :src="`icons/${name}.svg`">
              </a>
            </li>
          </ul>
        </div>
        <div class="column">
          <div id="contact" class="column">
            <h3>{{ t('contact') }}</h3>
            <address>
              <p>
                c/ Prat de la Creu 68-76, 3a Planta<br>
                Edifici Administratiu Comú Andorra la Vella<br>
                AD500 - Andorra la Vella
              </p>
            </address>
            <p>{{ t('contact_phone') }}: <a :href="`tel:${phone}`">{{ phone }}</a></p>
            <p>{{ t('contact_email') }}: <a :href="`mailto:${email}`">{{ email }}</a></p>
          </div>
        </div>
      </div>
      <p class="copyright">
        Copyright &copy; 2021 Andorra Recerca + Innovació.
        {{ t('footer.copyright_all_rights') }}
      </p>
    </div>
  </footer>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { contact } from '/@/config.yaml';

export default {
  name: 'PageFooter',
  setup() {
    const { t, locale } = useI18n();
    return { t, locale, ...contact };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 5rem 0 1px;
  background: var(--color-light);

  a {
    color: var(--color-primary);

    &:hover { color: var(--color-secondary); }
  }

  .copyright {
    padding: 2rem 1rem 1rem;
    font-size: 0.8rem;
    text-align: center;
  }
}
</style>
