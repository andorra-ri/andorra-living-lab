<template>
  <header class="myheader primary split-layout">
    <div class="left-side">
      <h1>DashBoard</h1>
    </div>
    <div class="right-side">
      <p>Nom Usuari</p>
    </div>
  </header>
</template>

<style lang="scss" scoped>

header {
    height: 7rem;
    position: fixed;
    width: 100%;
    z-index: 10;
}

h1{
  position: absolute;
  bottom: 0;
  left: 0;
  font-family: var(--header-font);
  font-weight: 300;
  color: var(--header-color);
  font-size: min(10vw, 4rem);
  line-height: 1.1;
  text-transform: none;
  margin: 0rem;
  margin-left: 1rem;
}

.split-layout {
    display: flex;
    gap: 3rem;
}

.left-side {
    width: 70%;
    height: 100%;
}

.right-side {
    width: 30%;
    height: 100%;
}

p{
    position: absolute;
    bottom: 0rem;
    right: 1rem;
    font-family: var(--header-font);
    font-weight: 300;
    margin: 0;
    font-size: min(10vw, 1.5rem);
}
</style>
