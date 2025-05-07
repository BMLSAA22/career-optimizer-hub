
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from '@/components/ui/sonner';

interface AdvancedSchedulerProps {
  candidate: {
    id: number;
    name: string;
    position: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const AdvancedScheduler: React.FC<AdvancedSchedulerProps> = ({ 
  candidate, 
  open, 
  onOpenChange 
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [isScheduling, setIsScheduling] = useState(false);
  const [participantEmail, setParticipantEmail] = useState('');
  const [scheduledSuccessfully, setScheduledSuccessfully] = useState(false);
  
  if (!candidate) return null;

  const handleToggleTimeSlot = (timeSlot: string) => {
    setSelectedTimeSlots(current => 
      current.includes(timeSlot)
        ? current.filter(slot => slot !== timeSlot)
        : [...current, timeSlot]
    );
  };

  const handleScheduleMeeting = () => {
    if (!date || selectedTimeSlots.length === 0) {
      toast("Please select a date and at least one time slot");
      return;
    }

    setIsScheduling(true);
    
    // Simulate scheduling API call with a timeout
    setTimeout(() => {
      setIsScheduling(false);
      setScheduledSuccessfully(true);
      
      // Reset form after showing success
      setTimeout(() => {
        toast.success(`Interview scheduled with ${candidate.name} on ${format(date, "PPP")}`);
        setDate(undefined);
        setSelectedTimeSlots([]);
        setParticipantEmail('');
        setScheduledSuccessfully(false);
        onOpenChange(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Schedule Interview</h3>
            <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {scheduledSuccessfully ? (
            <div className="py-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Successfully Scheduled!</h3>
              <p className="text-gray-600">
                The interview with {candidate.name} has been scheduled and all participants notified.
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Schedule an interview with <span className="font-medium text-gray-700">{candidate.name}</span> for {candidate.position} position.
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => 
                        date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                        date.getDay() === 0 || 
                        date.getDay() === 6
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Available Time Slots</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(timeSlot => (
                    <button
                      key={timeSlot}
                      type="button"
                      onClick={() => handleToggleTimeSlot(timeSlot)}
                      className={cn(
                        "px-2 py-1 text-xs rounded-md border flex items-center justify-center gap-1",
                        selectedTimeSlots.includes(timeSlot) 
                          ? "bg-brand-blue text-white border-brand-blue" 
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <Clock className="h-3 w-3" />
                      {timeSlot}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="participant-email" className="text-sm font-medium">Additional Participant</label>
                <input
                  id="participant-email"
                  type="email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            
              <div className="flex space-x-3 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleScheduleMeeting}
                  className="flex-1"
                  disabled={isScheduling || !date || selectedTimeSlots.length === 0}
                >
                  {isScheduling ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Scheduling...
                    </>
                  ) : "Schedule Interview"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedScheduler;
