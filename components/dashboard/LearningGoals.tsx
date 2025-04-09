'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Target, Calendar, Star, Trophy, Share2, Bell, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  category: 'academic' | 'career' | 'personal' | 'skill';
  priority: 'low' | 'medium' | 'high';
  milestones: Milestone[];
  dependencies: string[];
  createdAt: Date;
  lastUpdated: Date;
  reminder: boolean;
  sharedWith: string[];
  achievements: Achievement[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  icon: string;
}

export function LearningGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: new Date(),
    category: 'academic' as Goal['category'],
    priority: 'medium' as Goal['priority'],
    reminder: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    try {
      const response = await fetch('/api/learning-goals');
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load goals');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddGoal() {
    if (!newGoal.title.trim()) return;

    try {
      const response = await fetch('/api/learning-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) throw new Error('Failed to add goal');
      await fetchGoals();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add goal');
    }
  }

  async function handleDeleteGoal(goalId: string) {
    try {
      const response = await fetch(`/api/learning-goals/${goalId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete goal');
      await fetchGoals();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete goal');
    }
  }

  async function handleUpdateProgress(goalId: string, progress: number) {
    try {
      const response = await fetch(`/api/learning-goals/${goalId}/progress`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress }),
      });

      if (!response.ok) throw new Error('Failed to update progress');
      await fetchGoals();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
    }
  }

  async function handleToggleMilestone(goalId: string, milestoneId: string) {
    try {
      const response = await fetch(`/api/learning-goals/${goalId}/milestones/${milestoneId}/toggle`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to update milestone');
      await fetchGoals();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update milestone');
    }
  }

  async function handleShareGoal(goalId: string) {
    try {
      if (navigator.share) {
        const goal = goals.find(g => g.id === goalId);
        await navigator.share({
          title: goal?.title,
          text: goal?.description,
          url: `/goals/${goalId}`,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/goals/${goalId}`);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }

  function resetForm() {
    setNewGoal({
      title: '',
      description: '',
      targetDate: new Date(),
      category: 'academic',
      priority: 'medium',
      reminder: true,
    });
  }

  function getCategoryColor(category: string) {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      career: 'bg-purple-100 text-purple-800',
      personal: 'bg-green-100 text-green-800',
      skill: 'bg-yellow-100 text-yellow-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }

  function getPriorityColor(priority: string) {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }

  const filteredGoals = goals.filter(goal => {
    const matchesCategory = selectedCategory === 'all' || goal.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || goal.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Goals</CardTitle>
        <CardDescription>Set and track your learning objectives</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="skill">Skill</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            />
            <Textarea
              placeholder="Goal description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value as Goal['category'] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="skill">Skill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({ ...newGoal, priority: value as Goal['priority'] })}>
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
            </div>
            <Input
              type="date"
              value={format(newGoal.targetDate, 'yyyy-MM-dd')}
              onChange={(e) => setNewGoal({ ...newGoal, targetDate: new Date(e.target.value) })}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reminder"
                checked={newGoal.reminder}
                onChange={(e) => setNewGoal({ ...newGoal, reminder: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="reminder">Set reminder</Label>
            </div>
            <Button onClick={handleAddGoal} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>

          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className="space-y-3 p-4 rounded-lg border"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">{goal.title}</h3>
                      <Badge className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      <Badge className={getPriorityColor(goal.priority)}>
                        {goal.priority}
                      </Badge>
                      {goal.reminder && (
                        <Bell className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Target date: {format(new Date(goal.targetDate), 'PPP')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShareGoal(goal.id)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} />
                </div>

                <div className="flex gap-2">
                  {[0, 25, 50, 75, 100].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateProgress(goal.id, value)}
                      className={goal.progress === value ? 'bg-primary/10' : ''}
                    >
                      {value}%
                    </Button>
                  ))}
                </div>

                {goal.milestones.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Milestones</h4>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted"
                        >
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleMilestone(goal.id, milestone.id)}
                            >
                              <CheckCircle2
                                className={`h-4 w-4 ${
                                  milestone.completed ? 'text-green-500' : 'text-muted-foreground'
                                }`}
                              />
                            </Button>
                            <div>
                              <div className="text-sm">{milestone.title}</div>
                              <div className="text-xs text-muted-foreground">
                                Due: {format(new Date(milestone.dueDate), 'PPP')}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {goal.achievements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {goal.achievements.map((achievement) => (
                        <Badge key={achievement.id} variant="secondary">
                          <Trophy className="mr-1 h-3 w-3" />
                          {achievement.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  Last updated: {format(new Date(goal.lastUpdated), 'PPP')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 