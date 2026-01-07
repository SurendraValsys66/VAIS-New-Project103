import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  onCreate: () => LandingPageBlock;
}

interface SectionGroup {
  id: string;
  label: string;
  items: BlockItem[];
  defaultExpanded?: boolean;
}

export const BlocksPanel: React.FC<BlocksPanelProps> = ({ onAddBlock }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["start", "blocks", "cms", "elements"]),
  );

  const sectionGroups: SectionGroup[] = [
    {
      id: "start",
      label: "Start",
      items: [
        {
          id: "userguide",
          label: "User Guide",
          onCreate: createHeaderBlock,
        },
      ],
      defaultExpanded: true,
    },
    {
      id: "blocks",
      label: "Blocks",
      items: [
        {
          id: "sections",
          label: "Sections",
          onCreate: createHeaderBlock,
        },
        {
          id: "navigation",
          label: "Navigation",
          onCreate: createHeaderBlock,
        },
        {
          id: "menus",
          label: "Menus",
          onCreate: createHeaderBlock,
        },
      ],
      defaultExpanded: true,
    },
    {
      id: "cms",
      label: "CMS",
      items: [
        {
          id: "collections",
          label: "Collections",
          onCreate: createHeroBlock,
        },
        {
          id: "fonts",
          label: "Fonts",
          onCreate: createFeaturesBlock,
        },
      ],
      defaultExpanded: true,
    },
    {
      id: "elements",
      label: "Elements",
      items: [
        {
          id: "icons",
          label: "Icons",
          onCreate: createTestimonialsBlock,
        },
        {
          id: "mobile",
          label: "Mobile",
          onCreate: createAboutBlock,
        },
        {
          id: "forms",
          label: "Forms",
          onCreate: createContactFormBlock,
        },
        {
          id: "icons-more",
          label: "Icons/More",
          onCreate: createFooterBlock,
        },
      ],
      defaultExpanded: true,
    },
    {
      id: "social",
      label: "Social",
      items: [
        {
          id: "social-icons",
          label: "Social Icons",
          onCreate: createSectionSpacerBlock,
        },
      ],
    },
    {
      id: "drafts",
      label: "Drafts",
      items: [
        {
          id: "draft-pages",
          label: "Draft Pages",
          onCreate: createHeaderBlock,
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
      <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
        <Input
          placeholder="Search blocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div>
          {filteredSections.map((section) => (
            <div key={section.id} className="py-0">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>{section.label}</span>
                {expandedSections.has(section.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedSections.has(section.id) && (
                <div className="bg-white px-0 py-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onAddBlock(item.onCreate())}
                      className="w-full text-left px-6 py-2 text-sm text-gray-600 hover:text-valasys-orange hover:bg-orange-50 transition-colors"
                    >
                      {item.label}
                    </button>
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
