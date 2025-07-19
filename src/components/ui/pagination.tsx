'use client';

import * as React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// NOTE: ShadCN does not have a Pagination component by default.
// This is a custom implementation following shadcn's style.
// The base shadcn-like components are defined here.

const ShadcnPagination = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={className}
    {...props}
  />
);

const ShadcnPaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className="flex flex-row items-center justify-center gap-1"
    {...props}
  />
));
ShadcnPaginationContent.displayName = 'PaginationContent';

const ShadcnPaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
));
ShadcnPaginationItem.displayName = 'PaginationItem';

type ShadcnPaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Link>;

const ShadcnPaginationLink = ({
  className,
  isActive,
  ...props
}: ShadcnPaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={`flex items-center justify-center rounded-md px-3 h-9 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'hover:bg-accent hover:text-accent-foreground'
    } ${className}`}
    {...props}
  />
);
ShadcnPaginationLink.displayName = 'PaginationLink';

const ShadcnPaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnPaginationLink>) => (
  <ShadcnPaginationLink
    aria-label="Go to previous page"
    className={`gap-1 pl-2.5 ${className}`}
    {...props}
  >
    <span>Previous</span>
  </ShadcnPaginationLink>
);
ShadcnPaginationPrevious.displayName = 'PaginationPrevious';

const ShadcnPaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnPaginationLink>) => (
  <ShadcnPaginationLink
    aria-label="Go to next page"
    className={`gap-1 pr-2.5 ${className}`}
    {...props}
  >
    <span>Next</span>
  </ShadcnPaginationLink>
);
ShadcnPaginationNext.displayName = 'PaginationNext';

const ShadcnPaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={`flex h-9 w-9 items-center justify-center ${className}`}
    {...props}
  >
    ...
  </span>
);
ShadcnPaginationEllipsis.displayName = 'PaginationEllipsis';


export {
    ShadcnPagination as Pagination,
    ShadcnPaginationContent as PaginationContent,
    ShadcnPaginationItem as PaginationItem,
    ShadcnPaginationLink as PaginationLink,
    ShadcnPaginationNext as PaginationNext,
    ShadcnPaginationPrevious as PaginationPrevious,
    ShadcnPaginationEllipsis as PaginationEllipsis
}


export function PaginationComponent({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <ShadcnPagination>
      <ShadcnPaginationContent>
        <ShadcnPaginationItem>
          <ShadcnPaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            style={{ pointerEvents: currentPage <= 1 ? 'none' : 'auto', opacity: currentPage <= 1 ? 0.5 : 1}}
          />
        </ShadcnPaginationItem>
        {[...Array(totalPages)].map((_, i) => (
          <ShadcnPaginationItem key={i}>
            <ShadcnPaginationLink
              href={createPageURL(i + 1)}
              isActive={currentPage === i + 1}
            >
              {i + 1}
            </ShadcnPaginationLink>
          </ShadcnPaginationItem>
        ))}
        <ShadcnPaginationItem>
          <ShadcnPaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            style={{ pointerEvents: currentPage >= totalPages ? 'none' : 'auto', opacity: currentPage >= totalPages ? 0.5 : 1}}
          />
        </ShadcnPaginationItem>
      </ShadcnPaginationContent>
    </ShadcnPagination>
  );
}
