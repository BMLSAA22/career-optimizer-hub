
import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/sonner';

interface AutomatedMessagingProps {
  candidates: Array<{
    id: number;
    name: string;
    position: string;
    status: string;
  }>;
}

const messageTemplates = [
  { id: 'interview', name: 'Interview Invitation', 
    content: 'Dear {{name}}, We are pleased to invite you to an interview for the {{position}} position. Please check your calendar for available slots.' },
  { id: 'followup', name: 'Interview Follow-up', 
    content: 'Dear {{name}}, Thank you for your time during the interview for the {{position}} role. We will be in touch soon with next steps.' },
  { id: 'rejection', name: 'Application Status Update', 
    content: 'Dear {{name}}, Thank you for your interest in the {{position}} position. After careful consideration, we have decided to pursue other candidates.' },
  { id: 'offer', name: 'Job Offer', 
    content: 'Dear {{name}}, We are delighted to offer you the {{position}} position at our company! Please find attached the formal offer letter.' },
];

const AutomatedMessaging: React.FC<AutomatedMessagingProps> = ({ candidates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [messagePreview, setMessagePreview] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    if (selectedCandidates.length === 1) {
      const candidate = candidates.find(c => c.id === selectedCandidates[0]);
      if (candidate) {
        const template = messageTemplates.find(t => t.id === templateId);
        if (template) {
          setMessagePreview(
            template.content
              .replace('{{name}}', candidate.name)
              .replace('{{position}}', candidate.position)
          );
        }
      }
    } else {
      setMessagePreview('');
    }
  };
  
  const toggleCandidateSelection = (candidateId: number) => {
    setSelectedCandidates(current => 
      current.includes(candidateId)
        ? current.filter(id => id !== candidateId)
        : [...current, candidateId]
    );
    
    // Update preview when selecting a single candidate
    if (selectedCandidates.length === 0 && selectedTemplate) {
      const candidate = candidates.find(c => c.id === candidateId);
      if (candidate) {
        const template = messageTemplates.find(t => t.id === selectedTemplate);
        if (template) {
          setMessagePreview(
            template.content
              .replace('{{name}}', candidate.name)
              .replace('{{position}}', candidate.position)
          );
        }
      }
    } else {
      setMessagePreview('');
    }
  };
  
  const handleSendMessages = () => {
    if (selectedCandidates.length === 0 || !selectedTemplate) {
      toast("Please select candidates and a message template");
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending messages with a timeout
    setTimeout(() => {
      setIsSending(false);
      toast.success(`Messages sent to ${selectedCandidates.length} candidates`);
      setSelectedCandidates([]);
      setSelectedTemplate('');
      setMessagePreview('');
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-brand-blue" />
          Automated Messaging
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Select Message Template</label>
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a message template" />
            </SelectTrigger>
            <SelectContent>
              {messageTemplates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Select Recipients</label>
          <div className="border rounded-md divide-y max-h-60 overflow-y-auto">
            {candidates.map(candidate => (
              <div 
                key={candidate.id}
                className="flex items-center p-2 hover:bg-gray-50"
              >
                <input 
                  type="checkbox"
                  id={`candidate-${candidate.id}`}
                  checked={selectedCandidates.includes(candidate.id)}
                  onChange={() => toggleCandidateSelection(candidate.id)}
                  className="mr-3"
                />
                <label 
                  htmlFor={`candidate-${candidate.id}`}
                  className="flex items-center justify-between w-full cursor-pointer"
                >
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-sm text-gray-500">{candidate.position}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                    {candidate.status}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {messagePreview && (
          <div className="bg-gray-50 border rounded-md p-3 mt-4">
            <p className="text-sm font-medium mb-1">Message Preview:</p>
            <p className="text-sm text-gray-700">{messagePreview}</p>
          </div>
        )}
        
        <div className="pt-4">
          <Button 
            className="w-full"
            disabled={selectedCandidates.length === 0 || !selectedTemplate || isSending}
            onClick={handleSendMessages}
          >
            {isSending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Messages ({selectedCandidates.length})
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomatedMessaging;
