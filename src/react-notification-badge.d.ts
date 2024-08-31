declare module 'react-notification-badge' {
    import { Component } from 'react';
    enum Effect {
        SCALE = 'scale'
    }

    interface NotificationBadgeProps {
        count: number;
        max?: number;
        style?: React.CSSProperties;
        effect?: Effect

        // Add other props as needed
    }

    export class NotificationBadge extends Component<NotificationBadgeProps> { }
    export default NotificationBadge;
}