'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Bell, Clock, BookOpen, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';

interface StudySession {
  id: string;
  courseId: string;
  courseTitle: string;
  date: Date;
  duration: number;
  reminder: boolean;
  type: 'lecture' | 'practice' | 'review' | 'group_study' | 'office_hours';
  priority: 'low' | 'medium' | 'high';
  objectives: string[];
  notes: string;
  completed: boolean;
  instructor?: {
    name: string;
    officeHours: string;
  };
}

export function StudySchedule() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [reminder, setReminder] = useState<boolean>(true);
  const [sessionType, setSessionType] = useState<StudySession['type']>('lecture');
  const [priority, setPriority] = useState<StudySession['priority']>('medium');
  const [objectives, setObjectives] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudySessions();
  }, []);

  async function fetchStudySessions() {
    try {
      const response = await fetch('/api/study-sessions');
      if (!response.ok) throw new Error('Failed to fetch study sessions');
      const data = await response.json();
      setSessions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load study sessions');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddSession() {
    if (!selectedDate || !selectedCourse) return;

    try {
      const response = await fetch('/api/study-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse,
          date: selectedDate,
          duration,
          reminder,
          type: sessionType,
          priority,
          objectives: objectives.split('\n').filter(Boolean),
          notes,
        }),
      });

      if (!response.ok) throw new Error('Failed to add study session');
      await fetchStudySessions();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add study session');
    }
  }

  async function handleDeleteSession(sessionId: string) {
    try {
      const response = await fetch(`/api/study-sessions/${sessionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete study session');
      await fetchStudySessions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete study session');
    }
  }

  async function handleToggleCompletion(sessionId: string) {
    try {
      const response = await fetch(`/api/study-sessions/${sessionId}/toggle-completion`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to update session');
      await fetchStudySessions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update session');
    }
  }

  function resetForm() {
    setSelectedDate(new Date());
    setSelectedCourse('');
    setDuration(60);
    setReminder(true);
    setSessionType('lecture');
    setPriority('medium');
    setObjectives('');
    setNotes('');
  }

  function getPriorityColor(priority: string) {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }

  function getSessionTypeIcon(type: string) {
    const icons = {
      lecture: BookOpen,
      practice: Clock,
      review: CheckCircle2,
      group_study: Users,
      office_hours: AlertCircle,
    };
    const Icon = icons[type as keyof typeof icons] || BookOpen;
    return <Icon className="h-4 w-4" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Schedule</CardTitle>
        <CardDescription>Plan your learning sessions and track your progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {/* Add your courses here */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Session Type</Label>
              <Select value={sessionType} onValueChange={(value) => setSessionType(value as StudySession['type'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecture">Lecture</SelectItem>
                  <SelectItem value="practice">Practice</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="group_study">Group Study</SelectItem>
                  <SelectItem value="office_hours">Office Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as StudySession['priority'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={15}
                step={15}
              />
            </div>

            <div className="space-y-2">
              <Label>Objectives</Label>
              <Textarea
                placeholder="Enter your learning objectives (one per line)"
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Add any additional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reminder"
                checked={reminder}
                onChange={(e) => setReminder(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="reminder">Set reminder</Label>
            </div>

            <Button onClick={handleAddSession} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Session
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Upcoming Sessions</h3>
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  session.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {getSessionTypeIcon(session.type)}
                      <span className="font-medium">{session.courseTitle}</span>
                    </div>
                    <Badge className={getPriorityColor(session.priority)}>
                      {session.priority}
                    </Badge>
                    {session.reminder && (
                      <Bell className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(session.date), 'PPP')} • {session.duration} min
                  </div>
                  {session.objectives.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Objectives:</span>
                      <ul className="list-disc list-inside">
                        {session.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {session.notes && (
                    <div className="text-sm">
                      <span className="font-medium">Notes:</span> {session.notes}
                    </div>
                  )}
                  {session.instructor && (
                    <div className="text-sm">
                      <span className="font-medium">Instructor:</span> {session.instructor.name}
                      {session.type === 'office_hours' && (
                        <span className="text-muted-foreground"> • {session.instructor.officeHours}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleCompletion(session.id)}
                  >
                    <CheckCircle2 className={`h-4 w-4 ${session.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 