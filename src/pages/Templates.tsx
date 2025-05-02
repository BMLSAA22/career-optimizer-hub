
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  thumbnail: string;
  type: 'resume' | 'cover-letter';
  category: string;
  popular: boolean;
}

const templates: Template[] = [
  {
    id: 'template-1',
    title: 'Modern Professional',
    thumbnail: 'https://i.imgur.com/qF2UGFW.jpg',
    type: 'resume',
    category: 'professional',
    popular: true
  },
  {
    id: 'template-2',
    title: 'Clean Minimal',
    thumbnail: 'https://i.imgur.com/W9RVXAI.jpg',
    type: 'resume',
    category: 'minimal',
    popular: true
  },
  {
    id: 'template-3',
    title: 'Executive',
    thumbnail: 'https://i.imgur.com/XeeHJQU.jpg',
    type: 'resume',
    category: 'professional',
    popular: false
  },
  {
    id: 'template-4',
    title: 'Creative Designer',
    thumbnail: 'https://i.imgur.com/5coFQ9M.jpg',
    type: 'resume',
    category: 'creative',
    popular: false
  },
  {
    id: 'template-5',
    title: 'Technical Specialist',
    thumbnail: 'https://i.imgur.com/4k96lD9.jpg',
    type: 'resume',
    category: 'technical',
    popular: true
  },
  {
    id: 'template-6',
    title: 'Bold Statement',
    thumbnail: 'https://i.imgur.com/e7Bytfu.jpg',
    type: 'resume',
    category: 'creative',
    popular: false
  },
  {
    id: 'template-7',
    title: 'Professional Cover Letter',
    thumbnail: 'https://i.imgur.com/yX2QHed.jpg',
    type: 'cover-letter',
    category: 'professional',
    popular: true
  },
  {
    id: 'template-8',
    title: 'Minimalist Cover Letter',
    thumbnail: 'https://i.imgur.com/0PL6FZu.jpg',
    type: 'cover-letter',
    category: 'minimal',
    popular: true
  },
  {
    id: 'template-9',
    title: 'Creative Cover Letter',
    thumbnail: 'https://i.imgur.com/Gw9gIrR.jpg',
    type: 'cover-letter',
    category: 'creative',
    popular: false
  }
];

const Templates: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTemplates = templates.filter(template => {
    if (activeTab === 'all') {
      return activeCategory === 'all' ? true : template.category === activeCategory;
    } else {
      return template.type === activeTab && (activeCategory === 'all' ? true : template.category === activeCategory);
    }
  });

  const categories = ['all', 'professional', 'minimal', 'creative', 'technical'];

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Resume & Cover Letter Templates</h1>
      <p className="text-gray-600 mb-8">Browse our collection of professional templates designed to pass ATS systems</p>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="resume">Resumes</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letters</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Badge 
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'} 
            className="cursor-pointer capitalize"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="overflow-hidden border group card-hover">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={template.thumbnail} 
                alt={template.title} 
                className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
              />
              {template.popular && (
                <Badge className="absolute top-2 right-2 bg-brand-blue">
                  Popular
                </Badge>
              )}
              <div className="absolute inset-0 bg-brand-blue/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                <Button size="sm" variant="default" className="bg-white text-brand-blue hover:bg-white/90">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{template.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-1" />
                {template.type === 'resume' ? 'Resume Template' : 'Cover Letter'}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-brand-lightGray rounded-lg">
        <h2 className="text-xl font-bold mb-2">Can't find what you're looking for?</h2>
        <p className="mb-4">We're constantly adding new templates. If you have specific requirements or suggestions, let us know!</p>
        <Button>
          Request Template
        </Button>
      </div>
    </div>
  );
};

export default Templates;
