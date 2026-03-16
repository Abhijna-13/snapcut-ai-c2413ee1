import { useState, useCallback } from 'react';
import { Upload, X, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UPLOAD_CONFIG } from '@/constants/copy';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useProcessStore } from '@/store/useProcessStore';

const Dashboard = () => {
  const { originalImage, processedImage, isProcessing, setOriginalImage, setProcessing, setProcessedImage, reset } = useProcessStore();
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!(UPLOAD_CONFIG.acceptedFormats as readonly string[]).includes(file.type)) {
      toast.error('Unsupported format. Please use JPG, PNG, or WEBP.');
      return;
    }
    if (file.size > UPLOAD_CONFIG.maxSize) {
      toast.error('File too large. Maximum size is 10MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string, file);
    };
    reader.readAsDataURL(file);
  }, [setOriginalImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleProcess = async () => {
    setProcessing(true);
    // Simulate processing
    await new Promise((r) => setTimeout(r, 2000));
    setProcessedImage(originalImage);
    toast.success('Background removed successfully!');
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = 'snapcut-result.png';
    a.click();
    toast.success('Image downloaded!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2">Remove Background</h2>
        <p className="text-muted-foreground text-sm mb-8">Upload an image and let AI do the magic.</p>

        {!originalImage ? (
          /* Upload zone */
          <div
            className={`border-2 border-dashed rounded-xl p-12 md:p-20 text-center cursor-pointer transition-colors duration-150 ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-accent/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = UPLOAD_CONFIG.acceptedExtensions;
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleFile(file);
              };
              input.click();
            }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center">
              <Upload className="text-primary" size={28} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Drop your image here</h3>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <p className="text-xs text-muted-foreground">JPG, PNG, WEBP • Max 10MB</p>
          </div>
        ) : (
          /* Preview area */
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="bg-card rounded-xl overflow-hidden card-shadow">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Original</span>
                  <button onClick={reset} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <img src={originalImage} alt="Original" className="w-full rounded-lg object-contain max-h-80" />
                </div>
              </div>

              {/* Processed */}
              <div className="bg-card rounded-xl overflow-hidden card-shadow">
                <div className="px-4 py-3 border-b border-border">
                  <span className="text-sm font-semibold text-foreground">Result</span>
                </div>
                <div className="p-4">
                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center h-80">
                      <Loader2 className="animate-spin text-primary mb-4" size={32} />
                      <p className="text-sm text-muted-foreground">Processing your image...</p>
                    </div>
                  ) : processedImage ? (
                    <div style={{ backgroundImage: 'repeating-conic-gradient(hsl(var(--border)) 0% 25%, hsl(var(--card)) 0% 50%)', backgroundSize: '16px 16px' }} className="rounded-lg">
                      <img src={processedImage} alt="Processed" className="w-full rounded-lg object-contain max-h-80" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-80 text-muted-foreground text-sm">
                      Click "Remove Background" to start
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!processedImage && !isProcessing && (
                <Button onClick={handleProcess} className="gradient-primary hover:opacity-90 rounded-lg min-h-[44px] px-8 font-semibold">
                  Remove Background
                </Button>
              )}
              {processedImage && (
                <Button onClick={handleDownload} className="gradient-primary hover:opacity-90 rounded-lg min-h-[44px] px-8 font-semibold gap-2">
                  <Download size={18} />
                  Download PNG
                </Button>
              )}
              <Button variant="outline" onClick={reset} className="rounded-lg min-h-[44px] px-8">
                Upload New Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
