import * as solidIcons from '@fortawesome/free-solid-svg-icons';

export interface SidebarProps {
    isExpanded: boolean;
}

interface SidebarMenuTopicItem {
    icon: keyof typeof solidIcons;
    text: string;
}

interface SidebarMenuTopic {
    title: string;
    items: SidebarMenuTopicItem[];
}

export type SidebarMenuTopics = SidebarMenuTopic[]