# Shine on Hover

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

## Features

- Lightweight < 3kb
- No dependencies
- Framework agnostic
- Customizable

## Installation

```sh
# npm
npm install shine-on-hover

# yarn
yarn add shine-on-hover

# pnpm
pnpm add shine-on-hover

# bun
bun add shine-on-hover
```

## Usage

### Vanilla JS

```html
<div class="card" />
```

```js
import { shine } from 'shine-on-hover';

shine('.card', {
  smooothness: 'BALANCE'
  shineColor: 'hsl(0deg 0% 0% / 4%)',
  shineSize: '5%',
  shineSpread: '50%',
  shineBorder: 'hsl(220deg 5% 88%)'
})
```

### React

```tsx
import { useEffect } from 'react';
import { shine } from 'shine-on-hover';

const Card = () => {
  useEffect(() => {
    shine('.card', {
      smooothness: 'BALANCE'
      shineColor: 'hsl(0deg 0% 0% / 4%)',
      shineSize: '5%',
      shineSpread: '50%',
      shineBorder: 'hsl(220deg 5% 88%)'
    })
  }, [])

  return <div className="card" />
}
```

### Vue

```vue
<template>
	<div class="card" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { shine } from 'shine-on-hover';

onMounted(() => {
  shine('.card', {
    smooothness: 'BALANCE'
    shineColor: 'hsl(0deg 0% 0% / 4%)',
    shineSize: '5%',
    shineSpread: '50%',
    shineBorder: 'hsl(220deg 5% 88%)'
  })
})
</script>
```

### Svelte

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { shine } from 'shine-on-hover';

  onMount(() => {
    shine('.card', {
      smooothness: 'BALANCE'
      shineColor: 'hsl(0deg 0% 0% / 4%)',
      shineSize: '5%',
      shineSpread: '50%',
      shineBorder: 'hsl(220deg 5% 88%)'
    })
  })
</script>
```

## Configuration

Five properties are available to configure the shine effect:

| Property       | Type     | Default Value          | Description                                  |
| -------------- | -------- | ---------------------- | -------------------------------------------- |
| `shineColor`   | `string` | `hsl(0deg 0% 0% / 4%)` | The color of the shine effect.               |
| `shineSize`    | `string` | `5%`                   | The size of the shine effect.                |
| `shineSpread`  | `string` | `50%`                  | The spread of the shine effect.              |
| `shineBorder`  | `string` | `transparent`          | The color of the border of the shine effect. |
| `smoooothness` | `string` | `BALANCE`              | The smoothness of the shine effect.          |