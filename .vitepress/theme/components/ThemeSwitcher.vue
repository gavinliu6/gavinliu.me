<script setup lang="ts">
import { useData } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'

type Theme = 'system' | 'light' | 'dark'

const appearanceKey = 'vitepress-theme-appearance'
const themes: Theme[] = ['system', 'light', 'dark']
const selectedTheme = ref<Theme>('system')
const { isDark } = useData()

let colorScheme: MediaQueryList | undefined

function isTheme(value: string | null): value is Theme {
  return value === 'system' || value === 'light' || value === 'dark'
}

function applyTheme(theme: Theme) {
  const dark = theme === 'dark' || (theme === 'system' && colorScheme?.matches)

  isDark.value = Boolean(dark)
  localStorage.setItem(appearanceKey, theme === 'system' ? 'auto' : theme)
}

function selectTheme(theme: Theme) {
  selectedTheme.value = theme
  applyTheme(theme)
}

function handleSystemThemeChange() {
  if (selectedTheme.value === 'system') applyTheme('system')
}

onMounted(() => {
  colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

  const storedTheme = localStorage.getItem(appearanceKey)
  selectedTheme.value
    = storedTheme === 'auto'
      ? 'system'
      : isTheme(storedTheme)
        ? storedTheme
        : 'system'

  applyTheme(selectedTheme.value)
  colorScheme.addEventListener('change', handleSystemThemeChange)
})

onBeforeUnmount(() => {
  colorScheme?.removeEventListener('change', handleSystemThemeChange)
})
</script>

<template>
  <fieldset
    class="
      isolate m-0 flex h-6 w-fit rounded-full border-0 p-0
      shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]
    "
  >
    <legend class="sr-only">
      Select a display theme:
    </legend>

    <span
      v-for="theme in themes"
      :key="theme"
      class="h-full"
    >
      <input
        :id="`theme-switch-${theme}`"
        v-model="selectedTheme"
        :value="theme"
        :aria-label="theme"
        type="radio"
        class="peer absolute m-0 appearance-none p-0 outline-none"
        @change="selectTheme(theme)"
      />
      <label
        :for="`theme-switch-${theme}`"
        class="
          relative m-0 flex size-6 cursor-pointer items-center justify-center
          rounded-full bg-none text-gray-700
          peer-checked:bg-background-100 peer-checked:text-gray-1000
          peer-checked:shadow-[0_0_0_1px_var(--ds-gray-400),0px_1px_2px_0px_var(--ds-gray-alpha-100)]
          peer-focus-visible:text-gray-1000
          peer-focus-visible:shadow-[0_0_0_1px_var(--ds-background-100),0_0_0_2px_var(--ds-blue-700),0_0_0_4px_var(--ds-blue-300)]
          hover:text-gray-1000
        "
      >
        <span class="sr-only">{{ theme }}</span>
        <svg
          v-if="theme === 'system'"
          viewBox="0 0 16 16"
          height="16"
          width="16"
          style="color: currentColor"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M2.5 5.25C2.5 3.45 3.96 2 5.75 2h4.5c1.8 0 3.25 1.46 3.25 3.25V14h-11V5.25M5.75 3.5C4.78 3.5 4 4.28 4 5.25v7.25h8V5.25c0-.97-.78-1.75-1.75-1.75zM5 5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V9H5zm3.5 6H11V10H8.5z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <svg
          v-else-if="theme === 'light'"
          viewBox="0 0 16 16"
          height="16"
          width="16"
          style="color: currentColor"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M8.75 2v-.75h-1.5V3h1.5V2M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.75 1.5v1.75h-1.5V13zM13 7.25h1.75v1.5H13zm-11 0h-.75v1.5H3v-1.5H2m9-3.32.54-.53.17-.17.53-.53 1.06 1.06-.53.53-.17.17-.53.53zm-7.77 7.78-.53.53 1.06 1.06.53-.53.17-.17.53-.53L3.93 11l-.53.53zM3.93 5l-.53-.53-.17-.17-.53-.53L3.76 2.7l.53.53.17.17.53.53zm7.78 7.78.53.53 1.06-1.06-.53-.53-.17-.17-.53-.53L11 12.07l.53.53z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <svg
          v-else
          viewBox="0 0 16 16"
          height="16"
          width="16"
          style="color: currentColor"
        >
          <path
            fill="currentColor"
            d="m6.3 3.3.7.25A4.25 4.25 0 0 0 12.45 9l.96.96-.08.2A5.75 5.75 0 1 1 6.04 2.6zM5.25 4.76a4.24 4.24 0 1 0 6 5.99H11a5.75 5.75 0 0 1-5.75-6M12.5 3.5h1.25V5H12.5v1.25H11V5H9.75V3.5H11V2.25h1.5zM7 3.55l-.7-.25-.26-.7z"
          ></path>
        </svg>
      </label>
    </span>
  </fieldset>
</template>
