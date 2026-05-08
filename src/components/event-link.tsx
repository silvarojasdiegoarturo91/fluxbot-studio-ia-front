"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type EventLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
  eventName: string;
};

export function EventLink({
  className,
  children,
  eventName,
  href,
  ...props
}: EventLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(eventName, { href: href.toString() })}
      {...props}
    >
      {children}
    </Link>
  );
}
