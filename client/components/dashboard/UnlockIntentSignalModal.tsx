import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Target } from "lucide-react";

interface UnlockIntentSignalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnlock: (selectedOption: string) => void;
  currentlyClickedBadgeId?: string;
}

const unlockOptions = [
  {
    id: "current",
    label: "Unlock Current Signal",
    description: "Unlock only this company's intent signal",
  },
  {
    id: "super_strong",
    label: "Unlock Super Strong Signals Only",
    description: "Unlock only companies with super strong intent signals",
  },
  {
    id: "very_strong",
    label: "Unlock Very Strong Signals Only",
    description: "Unlock only companies with very strong intent signals",
  },
  {
    id: "strong",
    label: "Unlock Strong Signals Only",
    description: "Unlock only companies with strong intent signals",
  },
  {
    id: "all",
    label: "Unlock All Signals",
    description: "Unlock all intent signals in this list",
  },
];

export default function UnlockIntentSignalModal({
  open,
  onOpenChange,
  onUnlock,
  currentlyClickedBadgeId,
}: UnlockIntentSignalModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleUnlock = () => {
    if (selectedOption) {
      onUnlock(selectedOption);
      onOpenChange(false);
      setSelectedOption("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 border-0">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Unlock Intent Signals
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Choose how you'd like to unlock Bombora intent data signals to access deeper insights into company buying behaviors and decision-making timelines.
            </p>
          </div>

          {/* Bombora Logo Section */}
          <div className="px-8 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">
                Powered by
              </span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F826a3e27b58443589187ad5b7757a718%2F26618173823c471191d805cde87239d2?format=webp&width=800"
                alt="Powered by Bombora"
                style={{ width: "120px" }}
                className="object-contain"
              />
            </div>
          </div>

          {/* Options Section */}
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-5 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4" />
                Select unlock option
              </h3>
              <div className="space-y-3">
                {unlockOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all hover:shadow-md hover:bg-blue-50"
                  >
                    <Checkbox
                      checked={selectedOption === option.id}
                      onCheckedChange={() => setSelectedOption(option.id)}
                      className="mt-1 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {option.label}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Info Message */}
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded mb-6">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">💡 Tip:</span> Each unlock uses 1 credit per company. Choose wisely to maximize your intent signal access.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  onOpenChange(false);
                  setSelectedOption("");
                }}
                variant="outline"
                className="flex-1 h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUnlock}
                disabled={!selectedOption}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-11 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 mr-2" />
                Unlock
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
