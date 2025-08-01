<template>
  <div v-if="!indieVersion">
    <div id="wiki_content" v-if="hatred">
      <div ref="themeVarsSheet">
        <template v-for="sheet in sheets">
          <link rel="stylesheet" v-bind:href="sheet">
        </template>
      </div>
      <div :class="`theme-fandomdesktop-${currentTheme.toLowerCase()} fandomdesktop-background skin-fandomdesktop`">
        <div class="main-container m-auto">
          <div class="fandom-community-header__background cover fullScreen"
            style="background-attachment: fixed; background-position: center top; background-repeat: no-repeat;"></div>
          <div class="resizable-container">
            <component :is="pageComponentForNamespace(getPageNamespace(page))" v-on:sheetAdd="sheets.push" :site="site"
              :page="page"></component>
            <div id="recursion" class="min-h-12 w-full bg-elevated flex flex-col !space-y-2 rounded-md !p-4"
              style="margin-top: 8px" ref="commentsNode" v-if="['Main'].includes(getPageNamespace(page))">
              <template v-if="comments">
                <span class="font-bold">
                  {{ comments.totalCount }} comments
                </span>
                <template v-for="cmt in comments.threads">
                  <Comment :data="cmt"></Comment>
                </template>
              </template>
            </div>
            <div class="h-96"></div>
          </div>
        </div>
      </div>
    </div>
    <span v-else>
      not doing allat
    </span>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen p-4">
    <UCard class="max-w-md w-full text-center">
      <template #header>
        <h2 class="text-xl font-bold">Important Announcement!</h2>
      </template>

      <p class="mb-6">
        This wiki has moved to an independent host! Click the button below to browse the up-to-date and totally
        non-greedy
        version!
      </p>

      <UButton :to="redirectUrl" target="_blank" icon="i-heroicons-arrow-top-right-on-square" size="lg">
        Go to the New Wiki!
      </UButton>

      <template #footer>
        <p class="text-sm text-gray-500 dark:text-gray-400">Thanks for your understanding!</p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import * as cheerio from 'cheerio';
import { useElementVisibility } from '@vueuse/core';
import type { Comment as WikiaComment } from '~~/shared/types/comment';

import { WikiPageMain, WikiPageSpecial, WikiPageUser } from '#components';
import type { ShallowRef } from 'vue';
import type { APIResponse, Parse, Parse_PDisplayTitle, Query_Pages_PPageImages, Query_Pages_PArticleSnippet, Query_Pages_PPageImages_thumbnail } from '~~/shared/types/actionapi';

function pageComponentForNamespace(ns: string): any {
  return (
    ns === "Main" ? WikiPageMain :
      ns === "User" ? WikiPageUser :
        ns === "Special" ? WikiPageSpecial :
          'div'
  )
}

const route = useRoute();
if ((route.params.site! as string).endsWith(".fandom.com")) {
  await navigateTo(route.fullPath.replace(".fandom.com", ""));
}
const currentTheme = useCookie("theme", { "default": () => "Dark", watch: "shallow" });

const page = (route.params.page as string[]).join("/")
const site = route.params.site as string;
if (site.includes(".")) {
  throw "amogus";
}

const indieVersion: ({
  id: string;
  origins_label: string;
  origins: Array<{
    origin: string;
    origin_base_url: string;
    origin_content_path: string;
    origin_main_page: string;
  }>;
  destination: string;
  destination_base_url: string;
  destination_platform: string;
  destination_icon: string;
  destination_main_page: string;
  destination_search_path: string;
  destination_content_path: string;
  destination_host: string;
  tags: Array<string>;
}) | null = (await useFetch("http://localhost:3000/indies_en.json").then(data => {
  const indies = data.data.value! as any[];
  for (const i of indies) {
    for (const originInfo of i.origins) {
      if ((originInfo.origin_base_url as string).startsWith(site)) return i;
    }
  }
  return null;
}))


const displayTitle = getPageNamespace(page) !== "Special" ? cheerio.load((await useWikiFetch<APIResponse<[Parse<[Parse_PDisplayTitle]>]>>(
  '/parse',
  {
    query: {
      "page": page,
      "prop": "displaytitle",
    }
  }
)).data.value.parse.displaytitle, null, false)("*").text() : "";
if (import.meta.server) {
  const url = useRequestURL().toString();
  const { data: balls } = await useWikiFetch<APIResponse<[Query<[Query_Pages<[Query_Pages_PArticleSnippet, Query_Pages_PPageImages<[Query_Pages_PPageImages_thumbnail]>]>]>]>>(
    "/query",
    {
      query: {
        "prop": "articlesnippet|pageimages",
        "piprop": "thumbnail",
        "titles": page
      }
    }
  )
  const { data: meta } = await useFetch(`/api/${site}/meta`)
  useHead({
    link: [
      {
        rel: "icon",
        type: 'image/x-icon',
        href: meta.value["favicon"].replace("$wgUploadPath", `https://static.wikia.nocookie.net/${site}/images`)
      },
      {
        rel: 'canonical',
        href: url
      },
      {
        rel: 'license',
        /// tee hee
        href: 'https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License'
      }
    ],
    /// TODO: no mediawiki engine object we need to do this ourselves
    /*
    script: ()=>{
      return includeWDSIcons ? [
        {
          src: `/api/wikiassets/${site}/style?variant=${currentTheme.value.toLowerCase()}&modules=u:dev:MediaWiki:WDSIcons/code.js`
        }
      ] : []
    }
    */
  })
  useSeoMeta({
    title: `${displayTitle} | ${meta.value.sitename} | FancyBreeze`,
    description: balls.value.query.pages[0]!.extract,
    robots: {
      maxImagePreview: "standard",
    },
    twitterCard: "summary",
    twitterDescription: balls.value.query.pages[0]!.extract,
    twitterTitle: `${displayTitle} | ${meta.value.sitename} | FancyBreeze`,
    ogSiteName: meta.value.sitename,
    ogType: "article",
    ogTitle: displayTitle,
    ogUrl: url,
    ogDescription: balls.value.query.pages[0]!.extract,
    ogImage: balls.value.query.pages[0]!.thumbnail.source,
    formatDetection: "telephone=no",
    generator: "MediaWiki 1.43.1", // not exactly i think
  })
}
definePageMeta({
  //key: `wiki-${page}`,
  layout: "wiki",
})
const hatred = !page.startsWith("User blog:")
if (!hatred) {
  await navigateTo(`/${site}`)
}
let sheets: globalThis.Ref<string[], string[]>;
let themeVarsSheet: Readonly<ShallowRef<HTMLDivElement | null>>;
let isCommentsVisible: Ref<boolean, boolean>;
type beef = ({
  links: any[],
  threads: WikiaComment[],
  totalCount: number,
  readOnlyMode: boolean
});
let comments: Ref<beef | null>;
let redirectUrl: string;
if (!indieVersion) {

  sheets = ref([
    //`/api/wikiassets/${site}/style?variant=${currentTheme.value.toLowerCase()}&modules=site.styles`,
    `/api/wikiassets/${site}/style?variant=${currentTheme.value.toLowerCase()}&type=main`,
    `/api/wikiassets/${site}/style?variant=${currentTheme.value.toLowerCase()}&type=wikiTheme`,
    `/api/wikiassets/${site}/style?variant=${currentTheme.value.toLowerCase()}&type=themeVars`,
  ]);
  themeVarsSheet = useTemplateRef("themeVarsSheet");
  watch(currentTheme, () => {
    document.documentElement.className = currentTheme.value.toLowerCase();
    Array.prototype.filter.call(themeVarsSheet.value?.querySelectorAll("link[rel='stylesheet']"), (e) => e.href.includes("wikia.php") || e.href.includes("/api/wikiassets")).forEach(
      (v) => { v.href = v.href.replace(/variant=([a-z]*)/g, `variant=${currentTheme.value.toLowerCase()}`); }
    );
    //console.log("Theme changed to: ", currentTheme.value);
  });
  comments = ref(null);
  isCommentsVisible = useElementVisibility(useTemplateRef("commentsNode"));
  watch(isCommentsVisible, async (e) => {
    if (e && comments.value == null) {
      comments.value = (await useFetch<beef>(`/api/${site}/ArticleCommentsController/getComments`, {
        query: {
          title: displayTitle,
          namespace: "0", /// TODO
          hideDeleted: true
        }
      })).data.value!
    }
  });
} else {
  redirectUrl = (() => {
    const currentPath = route.fullPath;

    // Find the origin in the data that matches the current host
    // Origin is guaranteed to be found
    const matchingOrigin = indieVersion.origins.find(
      (origin) => origin.origin_base_url.startsWith(site)
    )!;

    // Replace the old content path with the new one, then prepend the new base URL
    const newPath = currentPath.replace(
      matchingOrigin.origin_content_path,
      indieVersion.destination_content_path
    ).substring(currentPath.indexOf("/", 2));
    return `https://${indieVersion.destination_base_url}${newPath}`;
  })();
}
</script>



<style>
.balls {
  flex-grow: 1;
}

.toc {
  max-width: 22rem;
}

.fandomdesktop-background {
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center top;
}

.fancybreeze-disabledImages {
  display: none;
}

.fancybreeze-slider__caption-cur {
  display: block !important;
  opacity: 1 !important;
}
</style>