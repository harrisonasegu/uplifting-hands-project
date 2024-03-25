<script setup lang="ts">
import {
    NNotificationProvider,
    NMessageProvider,
    NDialogProvider,
    NConfigProvider,
    useLoadingBar
} from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

import { useRouter } from 'vue-router'

import { themeOverrides } from '@/theme-config/theme-overrides'
import { useThemeModeStore } from '@/stores/common/themeMode'

const router = useRouter()
const loadingBar = useLoadingBar()
const store = useThemeModeStore()

const theme = store.getThemeMode as never as GlobalTheme

router.beforeEach(() => loadingBar?.start())
router.afterEach(() => loadingBar?.finish())
</script>

<template>
    <n-config-provider
        :theme="theme"
        :theme-overrides="themeOverrides"
    >        
        <n-notification-provider>
            <n-message-provider>
                <n-dialog-provider>
                    <div class="app-provider">
                        <slot></slot>
                    </div>
                </n-dialog-provider>
             </n-message-provider>
        </n-notification-provider>
    </n-config-provider>
</template>

<style lang="scss" scoped>
div.app-provider {
  min-height: 100vh;
}
</style>
