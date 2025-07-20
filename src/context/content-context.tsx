
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
    homepageContent as initialHomepageContent, 
    headerContent as initialHeaderContent,
    freeApisContent as initialFreeApisContent,
    aiTaggerContent as initialAiTaggerContent,
    type PageContent,
    type HeaderContent,
    type FreeApisContent,
    type AITaggerContent
} from '@/lib/content-structure';

interface AllContent {
    homepageContent: PageContent;
    headerContent: HeaderContent;
    freeApisContent: FreeApisContent;
    aiTaggerContent: AITaggerContent;
}

interface ContentContextType {
  content: AllContent;
  setContent: React.Dispatch<React.SetStateAction<AllContent>>;
}

const initialContent: AllContent = {
    homepageContent: initialHomepageContent,
    headerContent: initialHeaderContent,
    freeApisContent: initialFreeApisContent,
    aiTaggerContent: initialAiTaggerContent,
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<AllContent>(initialContent);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
