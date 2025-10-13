<template>
    <header class="header primary">
        <h1> DashBoard</h1>
    </header>
</template> 


<style lang="scss" scoped>

header { 
    height: 8rem;
    position: relative;
}

h1{
  position: absolute;
  bottom: 0;     
  left: 0;      
  font-family: var(--header-font);
  font-weight: 300;
  color: var(--header-color);

    strong { 
        font-weight: 700;
        text-transform: uppercase 
    }

  font-size: min(10vw, 4rem);
  line-height: 1.1;
  text-transform: none;
  margin: 0rem;
  margin-left: 1rem;
}
</style>