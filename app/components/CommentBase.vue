<template>
  <div class="!p-4 w-full bg-elevated rounded-md flex flex-col space-y-2">
    <div class="flex flex-row !space-x-1" style="align-items: center;">
      <UAvatar :src="data.createdBy.avatarUrl ?? '/defaultpfp.jpg'"></UAvatar>
      <a class="align-middle" :href="`/wiki/User:${data.createdBy.name}`">{{ data.createdBy.name }}</a>
      <span class="px-1">·</span>
      {{ new Date(data.creationDate.epochSecond*1000).toLocaleDateString() }}
    </div>
    <WikiaDoc :content="content" :attachments="data.attachments"></WikiaDoc>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const {data} = defineProps<{
    data: Post
  }>();
  const content: CommentContentModel = JSON.parse(data.jsonModel);
</script>
