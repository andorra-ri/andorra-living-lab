export default fn => {
  let frame;
  return (...params) => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => fn(...params));
  };
};
