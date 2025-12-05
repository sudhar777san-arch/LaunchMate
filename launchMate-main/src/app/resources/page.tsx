import { resourceDomains } from '@/lib/data';
import ResourcesClientPage from './resources-client';

export default function ResourcesPage() {
  // This is now a Server Component.
  // We fetch the data here and pass it to the client component.
  const domains = resourceDomains;

  return <ResourcesClientPage resourceDomains={domains} />;
}
