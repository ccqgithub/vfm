import { SidebarConfig4Multiple } from 'vuepress/config'
import {
  getApiSidebar,
  getGuideSidebar,
} from './shared'

export const Sidebar4EN: SidebarConfig4Multiple = {
  '/api/': getApiSidebar(),
  '/guide/': getGuideSidebar()
}