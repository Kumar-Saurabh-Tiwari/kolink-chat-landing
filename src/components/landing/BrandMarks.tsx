import { useId, type ReactNode } from "react";

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {children}
    </svg>
  );
}

export function InstagramMark({ className = "size-6" }: { className?: string }) {
  const id = useId();
  return (
    <Svg className={className}>
      <defs>
        <radialGradient id={`${id}-ig`} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill={`url(#${id}-ig)`} />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.6" stroke="white" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.7" stroke="white" strokeWidth="1.7" />
      <circle cx="16.7" cy="7.3" r="0.95" fill="white" />
    </Svg>
  );
}

export function MessengerMark({ className = "size-6" }: { className?: string }) {
  const id = useId();
  return (
    <Svg className={className}>
      <defs>
        <linearGradient id={`${id}-ms`} x1="0" y1="24" x2="24" y2="0">
          <stop stopColor="#00B2FF" />
          <stop offset="0.5" stopColor="#006AFF" />
          <stop offset="1" stopColor="#A033FF" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill={`url(#${id}-ms)`} />
      <path
        d="M12 5.4c-3.7 0-6.6 2.7-6.6 6.1 0 1.9.9 3.6 2.4 4.7v1.8l2.2-1.2c.6.2 1.3.3 2 .3 3.7 0 6.6-2.7 6.6-6.1S15.7 5.4 12 5.4Z"
        fill="white"
      />
      <path
        d="M8.3 13.3 11 10.4l2.1 2.1 2.6-2.1-2.7 2.9-2.1-2.1-2.6 2.1Z"
        fill={`url(#${id}-ms)`}
      />
    </Svg>
  );
}

export function WhatsAppMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#25D366" />
      <path
        d="M12 6.15A5.85 5.85 0 0 0 7.08 15l-.62 2.7 2.78-.73A5.85 5.85 0 1 0 12 6.15Zm3.28 8.28c-.14.4-.82.78-1.16.83-.33.05-.67.07-1.08-.07-.25-.08-.58-.18-1-.37-1.68-.73-2.78-2.42-2.86-2.54-.09-.12-.7-.93-.7-1.77s.44-1.25.59-1.42c.16-.17.34-.21.46-.21h.32c.1 0 .24-.04.37.29.14.34.48 1.17.52 1.25.04.09.07.2 0 .3-.06.12-.1.2-.19.3l-.27.32c-.09.1-.18.21 0 .36.16.14.36.6.78 1 .53.5.97.67 1.12.75.14.07.22.06.3-.04.08-.1.36-.42.45-.56.1-.14.2-.12.33-.07.14.05.86.4 1.01.48.15.07.24.11.28.17.03.07.03.4-.1.8Z"
        fill="white"
      />
    </Svg>
  );
}

export function FacebookMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#1877F2" />
      <path
        d="M13.6 18.5v-5.3h1.8l.27-2.1h-2.07V9.8c0-.6.17-1.02 1.04-1.02h1.1V6.9c-.19-.03-.85-.08-1.61-.08-1.6 0-2.69.97-2.69 2.76v1.54H9.4v2.1h1.94v5.3h2.26Z"
        fill="white"
      />
    </Svg>
  );
}

export function ThreadsMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#0a0a0a" />
      <path
        d="M15.7 11.1c-.1-2.1-1.26-3.5-3.5-3.58-1.7-.06-3.14.86-3.5 2.5-.08.36.16.5.4.5h.9c.26 0 .42-.16.48-.4.22-.9.96-1.48 2.1-1.44 1.3.04 1.96.8 2.02 2.12-1.1-.18-2.28-.08-3.2.4-1.18.62-1.94 1.8-1.86 3.22.08 1.5 1.18 2.52 2.72 2.58 1.16.04 2.1-.4 2.7-1.3.22.78.62 1.14 1.4 1.18.3.02.62-.04.9-.16.1-.04.16-.22.08-.32-.7-.3-.86-.78-.86-1.7V11.1Zm-2.1 3.66c-.86.84-2.22.7-2.7.14-.42-.5-.36-1.2.14-1.66.56-.5 1.5-.78 2.56-.7v2.22Z"
        fill="white"
      />
    </Svg>
  );
}

export function XMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#0f1419" />
      <path
        d="M16.9 6.6h1.7l-3.72 4.25 4.38 6.55h-3.43l-2.68-3.5-3.07 3.5H8.38l3.98-4.55L8.1 6.6h3.52l2.42 3.2 2.86-3.2Z"
        fill="white"
      />
    </Svg>
  );
}

export function LinkedInMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#0A66C2" />
      <path
        d="M8.4 10.2H6.3v7.3h2.1v-7.3ZM7.34 6.5A1.22 1.22 0 1 0 7.35 8.94 1.22 1.22 0 0 0 7.34 6.5ZM17.7 13.04c0-2.18-1.17-3.2-2.72-3.2-1.26 0-1.82.7-2.14 1.18V10.2H10.8c.03.6 0 7.3 0 7.3h2.04v-4.08c0-.22.02-.43.08-.59.18-.43.58-.88 1.26-.88.89 0 1.24.68 1.24 1.67v3.88h2.28v-4.46Z"
        fill="white"
      />
    </Svg>
  );
}

export function GmailMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="white" />
      <path
        d="M5.2 7.4v9.2h3.05V12L12 14.6 15.75 12v4.6H18.8V7.4L12 12.4 5.2 7.4Z"
        fill="#EA4335"
      />
      <path d="M5.2 7.4 12 12.4l6.8-5" stroke="#C5221F" strokeWidth="0.6" />
      <path d="M5.2 7.4h3.05v9.2H5.2z" fill="#4285F4" opacity="0.9" />
      <path d="M15.75 7.4H18.8v9.2h-3.05z" fill="#34A853" />
      <path d="M5.2 16.6h3.05V12L5.2 9.6v7Z" fill="#FBBC04" />
    </Svg>
  );
}

export function SlackMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#4A154B" />
      <path d="M9.1 13.4a1.35 1.35 0 1 1-1.35 1.35v-1.35H9.1Z" fill="#E01E5A" />
      <path d="M9.7 13.4a1.35 1.35 0 1 1 2.7 0v3.2a1.35 1.35 0 0 1-2.7 0v-3.2Z" fill="#E01E5A" />
      <path d="M10.6 9.1A1.35 1.35 0 1 1 9.25 7.75H10.6V9.1Z" fill="#36C5F0" />
      <path d="M10.6 9.7a1.35 1.35 0 1 1 0 2.7H7.4a1.35 1.35 0 0 1 0-2.7h3.2Z" fill="#36C5F0" />
      <path d="M14.9 10.6A1.35 1.35 0 1 1 16.25 9.25V10.6H14.9Z" fill="#2EB67D" />
      <path d="M14.3 10.6a1.35 1.35 0 1 1-2.7 0V7.4a1.35 1.35 0 0 1 2.7 0v3.2Z" fill="#2EB67D" />
      <path d="M13.4 14.9a1.35 1.35 0 1 1 1.35 1.35H13.4V14.9Z" fill="#ECB22E" />
      <path d="M13.4 14.3a1.35 1.35 0 1 1 0-2.7h3.2a1.35 1.35 0 0 1 0 2.7h-3.2Z" fill="#ECB22E" />
    </Svg>
  );
}

export function DiscordMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#5865F2" />
      <path
        d="M16.7 7.4c-1.04-.48-2.16-.82-3.34-1.02-.14.26-.31.6-.42.87-1.26-.19-2.5-.19-3.74 0-.12-.27-.29-.61-.43-.87-1.18.2-2.3.54-3.34 1.02C3.7 10.3 3.3 13.1 3.5 15.86c1.4 1.04 2.76 1.68 4.1 2.1.33-.45.63-.93.88-1.43-.48-.18-.94-.41-1.37-.67.12-.08.23-.17.34-.26 2.62 1.24 5.46 1.24 8.06 0 .11.1.22.18.34.26-.43.26-.89.49-1.37.67.26.5.55.98.88 1.43 1.34-.42 2.7-1.06 4.1-2.1.24-3.2-.4-5.96-1.76-8.46ZM10.1 14.3c-.78 0-1.42-.72-1.42-1.6 0-.88.62-1.6 1.42-1.6s1.44.72 1.42 1.6c0 .88-.62 1.6-1.42 1.6Zm3.8 0c-.78 0-1.42-.72-1.42-1.6 0-.88.62-1.6 1.42-1.6s1.44.72 1.42 1.6c0 .88-.62 1.6-1.42 1.6Z"
        fill="white"
      />
    </Svg>
  );
}

export function ShopifyMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#96BF48" />
      <path
        d="M16.9 7.3s-.14-.12-.38-.08l-1.94.48c-.1-.3-.36-.74-.86-.74h-.08l-.16-.16c-.9-.86-2.08-1.04-2.54-.86-.12.04-.2.1-.26.16l-.7-2.1s-2.28.6-2.2 2.56c0 .18.04.86.12 1.5L6.4 8.3c-.24.06-.26.08-.28.28l-1.12 8.4 10.04 1.86 4.06-1.02-2.2-10.52ZM12.1 6.7c.08 0 .36.04.7.42l-.54.14c.02-.18.08-.42.2-.56.08 0 .12 0 .16 0Zm-.86-.5c.18-.04.62 0 1.18.42-.16.16-.26.4-.32.6l-1.5.38c.14-.7.42-1.32.64-1.4Z"
        fill="white"
      />
    </Svg>
  );
}

export function WebhookMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#7C3AED" />
      <path
        d="M9.4 10.1a2.3 2.3 0 1 0-2.02 3.4h.08l2.66 4.6a2.3 2.3 0 1 0 2.02-1.16L9.5 12.34a2.3 2.3 0 0 0-.1-2.24Zm7.22-.02a2.3 2.3 0 0 0-2.12 1.38l-2.66-1.54a2.3 2.3 0 1 0-.9 1.56l2.66 1.54a2.3 2.3 0 1 0 3.02-2.94Z"
        fill="white"
      />
    </Svg>
  );
}

export function TelegramMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#26A5E4" />
      <path
        d="M17.8 7.5 6.86 11.7c-.74.3-.73.72-.14.9l2.8.88 6.48-4.08c.3-.2.58-.09.35.13l-5.24 4.74-.2 2.86c.3 0 .42-.14.58-.3l1.4-1.36 2.9 2.14c.54.3.92.14 1.06-.5l1.9-8.96c.2-.8-.3-1.16-.95-.85Z"
        fill="white"
      />
    </Svg>
  );
}

export function HubSpotMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#FF7A59" />
      <circle cx="16.2" cy="7.8" r="1.6" fill="white" />
      <circle cx="8.2" cy="12" r="2.1" fill="white" />
      <circle cx="15.4" cy="15.6" r="2.5" fill="white" />
      <path
        d="M9.8 11.2 14.6 8.4M9.9 13.2l3.4 1.7"
        stroke="#FF7A59"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ZapierMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#FF4A00" />
      <path d="M7.2 8.2h6.4l-2.6 3.3h3.8L9.2 16.8l1.5-4.2H7.4L8.8 8.2H7.2Z" fill="white" />
    </Svg>
  );
}

export function SheetsMark({ className = "size-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect width="24" height="24" rx="6.5" fill="#0F9D58" />
      <path d="M8 6.6h5.2L16.8 10v7.4H8V6.6Z" fill="white" opacity="0.95" />
      <path d="M13.2 6.6V10H16.8" fill="#87CEAC" />
      <path
        d="M9.2 12h5.6M9.2 14.2h5.6M9.2 16.4h5.6M12 12v4.4"
        stroke="#0F9D58"
        strokeWidth="0.9"
      />
    </Svg>
  );
}
