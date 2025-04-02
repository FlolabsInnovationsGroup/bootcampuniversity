'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  estimatedHours: number;
  image?: string;
}

interface FilterOptions {
  category: string[];
  level: string[];
  duration: string[];
}

export function CourseSearch() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    category: [],
    level: [],
    duration: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedFilters.category.length === 0 ||
                          selectedFilters.category.includes(course.category);
    
    const matchesLevel = selectedFilters.level.length === 0 ||
                        selectedFilters.level.includes(course.level);
    
    const matchesDuration = selectedFilters.duration.length === 0 ||
                          selectedFilters.duration.some(duration => {
                            const [min, max] = duration.split('-').map(Number);
                            return course.estimatedHours >= min && course.estimatedHours <= max;
                          });

    return matchesSearch && matchesCategory && matchesLevel && matchesDuration;
  });

  const categories = [...new Set(courses.map(course => course.category))];
  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  const durations = [
    { label: '0-2 hours', value: '0-2' },
    { label: '2-5 hours', value: '2-5' },
    { label: '5-10 hours', value: '5-10' },
    { label: '10+ hours', value: '10-100' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Your Course</CardTitle>
          <CardDescription>Search and filter courses to find what you're looking for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedFilters.category.includes(category)}
                          onCheckedChange={(checked) => {
                            setSelectedFilters(prev => ({
                              ...prev,
                              category: checked
                                ? [...prev.category, category]
                                : prev.category.filter(c => c !== category)
                            }));
                          }}
                        />
                        <Label htmlFor={category}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Level</Label>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={selectedFilters.level.includes(level)}
                          onCheckedChange={(checked) => {
                            setSelectedFilters(prev => ({
                              ...prev,
                              level: checked
                                ? [...prev.level, level]
                                : prev.level.filter(l => l !== level)
                            }));
                          }}
                        />
                        <Label htmlFor={level}>{level}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="space-y-2">
                    {durations.map((duration) => (
                      <div key={duration.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={duration.value}
                          checked={selectedFilters.duration.includes(duration.value)}
                          onCheckedChange={(checked) => {
                            setSelectedFilters(prev => ({
                              ...prev,
                              duration: checked
                                ? [...prev.duration, duration.value]
                                : prev.duration.filter(d => d !== duration.value)
                            }));
                          }}
                        />
                        <Label htmlFor={duration.value}>{duration.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      {course.image && (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">{course.category}</Badge>
                          <Badge variant="outline">{course.level}</Badge>
                          <Badge variant="outline">{course.estimatedHours} hours</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 