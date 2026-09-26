import { X, BadgePercent } from "lucide-react";
import { banner } from "../data/config";

export default function Banner({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
            <BadgePercent className="w-3 h-3" />
          </span>
          <span className="text-xs sm:text-sm font-medium tracking-wide">{banner.text}</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close banner"
          className="text-white/80 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
