<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NDrawer, NDrawerContent, NSpace, NMenu } from 'naive-ui'

import { useMobileSidebarMenu } from '@/stores/common/mobileSidebarMenu'

defineProps<{
    navMenu: any,
    hasFooter: boolean
}>()

const route: string | any = useRoute()
const activeRoute = computed(() => route?.name)

const store = useMobileSidebarMenu()
const { setSideMenuState } = store

const sidebarState = computed<boolean>(() => store.getSideMenuState)

const active = ref<boolean>(false)

const toggleSidebarMenu = (state: boolean) => {
    active.value = state
}

const resetSideMenuState = () => setSideMenuState(false)

watch(sidebarState, (state: boolean) => toggleSidebarMenu(state))

// close sidebar menu on route change for mobile devices
watch(route, () => resetSideMenuState())
</script>

<template>
    <n-drawer
        placement="left"
        v-model:show="active"
        :on-after-leave="resetSideMenuState"
    >
        <n-drawer-content closable>
            <template #header>MENU</template>
            
            <n-space vertical :size="40">
                <n-menu
                    :collapsed-width="64"
                    :collapsed-icon-size="22"
                    :options="navMenu"
                    :default-value="activeRoute"
                />
            </n-space>
        </n-drawer-content>
    </n-drawer>
</template>
