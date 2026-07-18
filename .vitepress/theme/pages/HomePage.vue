<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'
import {
  EmailCard,
  GitHubStatsCard,
  LatestPostCard,
  LifeCard,
  MapCard,
  ThemeSwitcherCard,
  XCard
} from '@theme/components/bento-cards'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@theme/components/ui/avatar'
import { BentoGrid } from '@theme/components/ui/bento-grid'
</script>

<template>
  <div class="@container min-h-svh px-[clamp(20px,4vw,64px)]">
    <div
      class="
        mx-auto grid w-full max-w-[640px] grid-cols-1 gap-y-16 py-16
        @min-[1140px]:mt-10 @min-[1140px]:max-w-[1600px]
        @min-[1140px]:grid-cols-[minmax(0,24fr)_minmax(0,8fr)_minmax(0,41fr)]
        @min-[1140px]:gap-y-0
        @min-[1460px]:grid-cols-[480px_minmax(160px,1fr)_820px]
      "
    >
      <section
        aria-labelledby="intro-title"
        class="
          min-w-0
          @min-[1140px]:sticky @min-[1140px]:top-[64px]
          @min-[1140px]:col-start-1 @min-[1140px]:row-start-1
          @min-[1140px]:self-start
        "
      >
        <div>
          <Avatar
            class="
              size-32 select-none
              @min-[640px]:size-40
            "
          >
            <AvatarImage
              src="https://github.com/gavinliu6.png"
              alt="Gavin Liu"
            />
            <AvatarFallback>GL</AvatarFallback>
          </Avatar>
          <div class="mt-10 ml-2">
            <h1
              id="intro-title"
              class="
                text-heading-40
                @min-[640px]:text-heading-56
              "
            >
              Hello.
            </h1>
            <p class="mt-4 text-copy-20">
              I'm
              <span
                class="
                  relative isolate inline-block font-semibold text-primary
                  after:absolute after:inset-x-[-0.12em] after:bottom-[0.08em]
                  after:-z-10 after:h-[0.38em] after:-rotate-1
                  after:rounded-[2px] after:bg-sky-300/70 after:content-['']
                  dark:after:bg-sky-400/60
                "
              >Gavin</span>, a full-time software developer passionate about building for
              the web and crafting clean design.
            </p>
          </div>
        </div>
      </section>
      <div
        class="
          grid min-w-0 gap-16
          @min-[1140px]:col-start-3 @min-[1140px]:row-start-1
        "
      >
        <section aria-labelledby="connect-title">
          <h2
            id="connect-title"
            class="p-4 text-heading-20 text-[18px]!"
          >
            Around the Web
          </h2>
          <BentoGrid>
            <LatestPostCard />
            <XCard />
            <LifeCard />
            <GitHubStatsCard />
            <MapCard />
            <EmailCard />
            <ThemeSwitcherCard />
          </BentoGrid>
        </section>
      </div>
      <div class="@min-[1140px]:fixed @min-[1140px]:bottom-6">
        <p
          class="
            text-center text-copy-13 text-gray-900
            @min-[1140px]:text-left
          "
        >
          ✦ The design of this page is inspired by
          <a
            href="https://bento.me"
            target="_blank"
            class="inline-flex items-center gap-0.5 underline"
          >
            Bento
            <ArrowUpRightIcon
              class="size-3 shrink-0"
              aria-hidden="true"
            />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
