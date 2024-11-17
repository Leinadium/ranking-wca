import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import type { ButtonRootTargetOptions } from '../Button/Root/types';

interface SidebarMenuTopicItem {
    icon: keyof typeof solidIcons;
    text: string;
    link: string;
    linkTarget?: ButtonRootTargetOptions;
}

interface SidebarMenuTopic {
    title: string;
    items: SidebarMenuTopicItem[];
}

export type SidebarMenuTopics = SidebarMenuTopic[]