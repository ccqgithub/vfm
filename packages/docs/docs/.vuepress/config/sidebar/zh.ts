import { SidebarConfig4Multiple } from 'vuepress/config'
import {
  getApiSidebar,
  getGuideSidebar,
} from './shared'

export const Sidebar4ZH: SidebarConfig4Multiple = {
  '/zh/api/': getApiSidebar(),
  '/zh/guide/': getGuideSidebar()
}