// app/dashboard/page.tsx
import PortfolioDonut from "@/components/portfolioDonut";
import DiscoverGrid   from "@/components/discoverGrid";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PortfolioDonut />
      <DiscoverGrid />
    </div>
  );
}
