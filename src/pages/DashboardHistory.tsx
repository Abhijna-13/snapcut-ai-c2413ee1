import { Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const mockHistory = [
  { id: '1', status: 'completed' as const, created_at: '2026-03-16T10:30:00Z', original_url: '/placeholder.svg', processed_url: '/placeholder.svg' },
  { id: '2', status: 'completed' as const, created_at: '2026-03-16T09:15:00Z', original_url: '/placeholder.svg', processed_url: '/placeholder.svg' },
  { id: '3', status: 'failed' as const, created_at: '2026-03-15T18:45:00Z', original_url: '/placeholder.svg', processed_url: null },
];

const statusColors = {
  completed: 'bg-success/10 text-success border-success/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
  pending: 'bg-primary/10 text-primary border-primary/20',
};

const DashboardHistory = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2">Processing History</h2>
        <p className="text-muted-foreground text-sm mb-8">View and download your previously processed images.</p>

        <div className="bg-card rounded-xl card-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockHistory.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors duration-150">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg bg-brand-surface overflow-hidden">
                        <img src={item.original_url} alt="Thumbnail" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={statusColors[item.status]}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye size={14} /></Button>
                        {item.processed_url && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Download size={14} /></Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {mockHistory.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No processing history yet.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHistory;
