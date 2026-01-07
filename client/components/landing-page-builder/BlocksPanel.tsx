import React, { useState } from "react";
import { ChevronDown, ChevronRight, Grid3x3, Settings, Zap, Share2, Lock, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  createHeaderBlock,
  createHeroBlock,
  createFeaturesBlock,
  createTestimonialsBlock,
  createAboutBlock,
  createContactFormBlock,
  createFooterBlock,
  createSectionSpacerBlock,
} from "./utils";
import { LandingPageBlock } from "./types";

interface BlocksPanelProps {
  onAddBlock: (block: LandingPageBlock) => void;
}

interface BlockItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onCreate: () => LandingPageBlock;
}

interface SectionGroup {
  id: string;
  label: string;
  items: BlockItem[];
}

export const BlocksPanel: React.FC<BlocksPanelProps> = ({ onAddBlock }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["start", "basics", "cms", "elements"]),
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(),
  );

  const getIconColor = (itemId: string) => {
    const iconMap: Record<string, string> = {
      sections: "text-gray-500",
      navigation: "text-gray-500",
      menus: "text-gray-500",
      collections: "text-blue-500",
      fields: "text-blue-500",
      icons: "text-blue-500",
      media: "text-cyan-500",
      forms: "text-green-500",
      interactive: "text-orange-500",
      social: "text-red-500",
      utility: "text-gray-500",
      creative: "text-purple-500",
      wireframer: "text-gray-500",
    };
    return iconMap[itemId] || "text-gray-500";
  };

  const getIcon = (itemId: string) => {
    const iconSize = "w-5 h-5";
    const colorClass = getIconColor(itemId);
    
    const iconMap: Record<string, React.ReactNode> = {
      sections: <Grid3x3 className={`${iconSize} ${colorClass}`} />,
      navigation: <Settings className={`${iconSize} ${colorClass}`} />,
      menus: <Zap className={`${iconSize} ${colorClass}`} />,
      collections: <Settings className={`${iconSize} ${colorClass}`} />,
      fields: <Grid3x3 className={`${iconSize} ${colorClass}`} />,
      icons: <Settings className={`${iconSize} ${colorClass}`} />,
      media: <Share2 className={`${iconSize} ${colorClass}`} />,
      forms: <Lock className={`${iconSize} ${colorClass}`} />,
      interactive: <Zap className={`${iconSize} ${colorClass}`} />,
      social: <Share2 className={`${iconSize} ${colorClass}`} />,
      utility: <Settings className={`${iconSize} ${colorClass}`} />,
      creative: <Palette className={`${iconSize} ${colorClass}`} />,
      wireframer: <Grid3x3 className={`${iconSize} ${colorClass}`} />,
    };
    return iconMap[itemId] || null;
  };

  const sectionGroups: SectionGroup[] = [
    {
      id: "start",
      label: "Start",
      items: [
        {
          id: "wireframer",
          label: "Wireframer",
          onCreate: createHeaderBlock,
        },
      ],
    },
    {
      id: "basics",
      label: "Basics",
      items: [
        {
          id: "sections",
          label: "Sections",
          onCreate: createHeroBlock,
        },
        {
          id: "navigation",
          label: "Navigation",
          onCreate: createHeaderBlock,
        },
        {
          id: "menus",
          label: "Menus",
          onCreate: createContactFormBlock,
        },
      ],
    },
    {
      id: "cms",
      label: "CMS",
      items: [
        {
          id: "collections",
          label: "Collections",
          onCreate: createFeaturesBlock,
        },
        {
          id: "fields",
          label: "Fields",
          onCreate: createTestimonialsBlock,
        },
      ],
    },
    {
      id: "elements",
      label: "Elements",
      items: [
        {
          id: "icons",
          label: "Icons",
          onCreate: createAboutBlock,
        },
        {
          id: "media",
          label: "Media",
          onCreate: createFeaturesBlock,
        },
        {
          id: "forms",
          label: "Forms",
          onCreate: createContactFormBlock,
        },
        {
          id: "interactive",
          label: "Interactive",
          onCreate: createTestimonialsBlock,
        },
        {
          id: "social",
          label: "Social",
          onCreate: createSectionSpacerBlock,
        },
        {
          id: "utility",
          label: "Utility",
          onCreate: createHeaderBlock,
        },
        {
          id: "creative",
          label: "Creative",
          onCreate: createFooterBlock,
        },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const filteredSections = sectionGroups
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0 || searchQuery === "");

  return (
    <div className="flex flex-col bg-white w-full h-full overflow-hidden">
      <div className="p-3 border-b border-gray-200 bg-white flex-shrink-0">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm h-9"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div>
          {filteredSections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <span className="text-gray-600">{section.label}</span>
              </button>

              {expandedSections.has(section.id) && (
                <div className="bg-white">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          onAddBlock(item.onCreate());
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-valasys-orange transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {getIcon(item.id)}
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
