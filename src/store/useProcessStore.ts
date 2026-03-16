import { create } from 'zustand';

interface ProcessState {
  isProcessing: boolean;
  originalImage: string | null;
  processedImage: string | null;
  originalFile: File | null;
  error: string | null;
  setOriginalImage: (image: string | null, file: File | null) => void;
  setProcessedImage: (image: string | null) => void;
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useProcessStore = create<ProcessState>((set) => ({
  isProcessing: false,
  originalImage: null,
  processedImage: null,
  originalFile: null,
  error: null,
  setOriginalImage: (originalImage, originalFile) =>
    set({ originalImage, originalFile, processedImage: null, error: null }),
  setProcessedImage: (processedImage) => set({ processedImage, isProcessing: false }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setError: (error) => set({ error, isProcessing: false }),
  reset: () =>
    set({ isProcessing: false, originalImage: null, processedImage: null, originalFile: null, error: null }),
}));
