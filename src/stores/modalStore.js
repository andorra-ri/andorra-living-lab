import { ref, readonly } from 'vue';

const isVisible = ref(false);
// const modalComponent = ref(null);
// const modalProps = ref({});

export const useModal = () => {
  const openModal = () => {
    isVisible.value = true;
    // modalComponent.value = markRaw(component);
    // modalProps.value = props;
  };

  const closeModal = () => {
    isVisible.value = false;
    // modalComponent.value = null;
    // modalProps.value = {};
  };

  return {
    isVisible: readonly(isVisible),
    // modalProps: readonly(modalProps),
    // modalComponent: modalComponent,
    openModal,
    closeModal,
  };
};

export const modal = useModal();
