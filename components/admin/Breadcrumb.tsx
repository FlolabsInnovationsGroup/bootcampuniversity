import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;

    // Handle dynamic segments
    const formattedLabel = segment.startsWith('[') 
      ? segment.replace(/[\[\]]/g, '').split('Id')[0].charAt(0).toUpperCase() + 
        segment.replace(/[\[\]]/g, '').split('Id')[0].slice(1)
      : label;

    return {
      href,
      label: formattedLabel,
      isLast,
    };
  });

  if (!breadcrumbItems.length) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      <Link
        href="/admin"
        className="flex items-center hover:text-primary transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4" />
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {item.isLast ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <>
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
            </>
          )}
        </div>
      ))}
    </nav>
  );
} 