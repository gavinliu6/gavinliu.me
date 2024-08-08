<template>
  <footer class="absolute inset-x-0 bottom-0 text-xs text-muted">
    <div class="mx-auto flex h-11 max-w-screen-md items-center px-4 text-center">
      <ul class="mx-auto space-x-4">
        <li class="inline-block">
          <span>{{ `© ${(new Date()).getFullYear()} Gavin Liu` }}</span>
        </li>
        <li class="inline-block">
          <span> Built with <a
            href="https://nuxt.com"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-[.2rem] hover:text-link"
          >VitePress</a> 🫰</span>
        </li>
        <li class="inline-block">
          <span>Theme inspired by <a
            href="https://primer.style"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-[.2rem] hover:text-link"
          >Primer Design System</a> 🎨</span>
        </li>
      </ul>
    </div>
  </footer>
</template>
