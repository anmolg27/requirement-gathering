import { RouteGuard } from '@/components/RouteGuard';
import { Layout } from '@/components/Layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard requireAuth={true}>
      <Layout>{children}</Layout>
    </RouteGuard>
  );
}
