<template>
  <div class="video-embed">
    <img :src="cover" class="video-embed__cover">
    <div class="toggler" @click="toggle">{{ label }}</div>
    <div v-if="isVisible" class="fade" @click="toggle">
      <iframe :src="src" class="frame" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import config from '/@/config.video.yaml';

const providers = {
  // https://developers.google.com/youtube/player_parameters?hl=es-419
  youtube: (parameters, playlist) => {
    const { subs: hl, start, end, quality: vq } = parameters;
    return { ...config.providers.youtube, playlist, hl, start, end, vq };
  },
  // https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters
  vimeo: ({ quality, subs: texttrack }) => ({ ...config.providers.vimeo, quality, texttrack }),
};

export default {
  name: 'VideoEmbed',
  props: {
    url: { type: String, required: true },
    cover: { type: String, required: true },
    label: { type: String, default: 'Play' },
    // ISO 639-2 code for subtitles language
    subs: { type: String, default: 'ca' },
    // Video aspect ratio. Default 16:9
    aspectRatio: { type: Number, default: 16 / 9 },
    // Seconds from the start to init reproduction (0 from the beginning)
    start: { type: Number, default: 0 },
    // Seconds from the start to stop reproduction (undefined till the end)
    end: { type: Number, default: undefined },
    quality: { type: String, default: 'medium' },
  },
  setup(props) {
    const isVisible = ref(false);
    const toggle = () => { isVisible.value = !isVisible.value; };

    const src = computed(() => {
      const [, provider, id] = props.url.match(/\.(.*)\.com(?:\/embed)?(?:\/video)?\/(.+)/);
      const parameters = providers[provider](props, id);
      return `${props.url}?${new URLSearchParams(parameters).toString()}`;
    });
    return { src, isVisible, toggle };
  },
};
</script>

<style lang="scss" scoped>
.video-embed {
  position: relative;

  .toggler {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    cursor: pointer;
  }

  &__cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .fade {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #000a;
    z-index: 10;
    display: flex;
    cursor: pointer;

    .frame {
      margin: auto;
      width: 80vw;
      aspect-ratio: 16 / 9;
    }
  }
}
</style>
