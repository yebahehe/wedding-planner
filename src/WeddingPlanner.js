import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

const WeddingPlanner = () => {
  // import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

const WeddingPlanner = () => {
  const initialTasks = {
    "IMMEDIATE (November 2024)": [
      {
        id: "nov1",
        title: "Set Budget and Guest Count",
        priority: "critical",
        dueDate: "2024-11-15",
        budget: "$35,000-45,000",
        notes: "💡 Average Brisbane wedding: $42,000\n📊 Typical breakdown:\n- Venue/Catering: 45%\n- Photography: 10%\n- Attire: 10%\n- Flowers: 8%\n- Music: 7%\n- Others: 20%",
        urgent: true,
        completed: false
      }
    ],
    "December 2024": [
      {
        id: "dec1",
        title: "Book Catering",
        priority: "high",
        dueDate: "2024-12-05",
        budget: "$12,000-15,000",
        notes: "🍽️ 2024/25 Trends:\n- Food trucks\n- Grazing tables\n- Interactive food stations\n- Dietary-inclusive menus\n\n💡 Consider weather-appropriate menu for April",
        completed: false
      }
    ]
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [showCompleted, setShowCompleted] = useState(true);
  const [newTask, setNewTask] = useState({ month: '', title: '', dueDate: '', priority: 'high', notes: '', budget: '' });

  const priorityColors = {
    critical: "bg-red-100 border-l-4 border-red-500",
    high: "bg-orange-100 border-l-4 border-orange-500",
    medium: "bg-yellow-100 border-l-4 border-yellow-500",
    low: "bg-blue-100 border-l-4 border-blue-500",
    completed: "bg-gray-100 border-l-4 border-gray-500 opacity-60"
  };

  const TaskCard = ({ task, month }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    return (
      <div className={`p-4 rounded-lg mb-4 ${task.completed ? priorityColors.completed : priorityColors[task.priority]}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Checkbox 
              checked={task.completed}
              onCheckedChange={() => {
                setTasks(prev => ({
                  ...prev,
                  [month]: prev[month].map(t => 
                    t.id === task.id ? { ...t, completed: !t.completed } : t
                  )
                }));
              }}
            />
            {isEditing ? (
              <Input
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="w-full"
              />
            ) : (
              <h3 className="font-medium text-lg">{task.title}</h3>
            )}
          </div>
          <div className="flex items-center gap-2">
            {task.urgent && !task.completed && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">URGENT</span>
            )}
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save" : "Edit"}
            </Button>
            <Select
              value={task.priority}
              onValueChange={(value) => {
                setTasks(prev => ({
                  ...prev,
                  [month]: prev[month].map(t => 
                    t.id === task.id ? { ...t, priority: value } : t
                  )
                }));
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="ml-10">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Calendar size={14} />
            Due: {isEditing ? (
              <Input
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                className="w-auto"
              />
            ) : (
              task.dueDate
            )}
            {task.budget && (
              <>
                <DollarSign size={14} className="ml-4" />
                Budget: {isEditing ? (
                  <Input
                    value={editedTask.budget}
                    onChange={(e) => setEditedTask({ ...editedTask, budget: e.target.value })}
                    className="w-auto"
                  />
                ) : (
                  task.budget
                )}
              </>
            )}
          </div>

          {isEditing ? (
            <Textarea
              value={editedTask.notes}
              onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
              className="text-sm text-gray-600 bg-white bg-opacity-50 p-3 rounded"
            />
          ) : (
            <div className="text-sm text-gray-600 whitespace-pre-line bg-white bg-opacity-50 p-3 rounded">
              {task.notes}
            </div>
          )}
        </div>
      </div>
    );
  };

  const addNewTask = () => {
    if (newTask.month && newTask.title) {
      setTasks(prev => ({
        ...prev,
        [newTask.month]: [
          ...(prev[newTask.month] || []),
          {
            ...newTask,
            id: `${newTask.month.toLowerCase().replace(/\s/g, '')}${Math.random().toString(36).substring(2, 9)}`,
            completed: false,
          }
        ]
      }));
      setNewTask({ month: '', title: '', dueDate: '', priority: 'high', notes: '', budget: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Brisbane Wedding Planning Timeline</CardTitle>
          <div className="text-center text-gray-600">Wedding Date: Mid-April 2025</div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Accelerated Planning Notice:</strong> This is a 5-month planning schedule for an April 2025 wedding. Many premium vendors may already be booked. Consider flexibility with dates/venues and be prepared to make quick decisions. Rush fees may apply for some services.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              {showCompleted ? "Hide" : "Show"} Completed Tasks
            </Button>
          </div>

          {Object.entries(tasks).map(([month, monthTasks]) => (
            <div key={month} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{month}</h2>
              {monthTasks
                .filter(task => showCompleted || !task.completed)
                .map(task => (
                  <TaskCard key={task.id} task={task} month={month} />
                ))}
            </div>
          ))}

          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                placeholder="Month (e.g., IMMEDIATE (November 2024))"
                value={newTask.month}
                onChange={(e) => setNewTask({ ...newTask, month: e.target.value })}
              />
              <Input
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Input
                placeholder="Due Date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <Select
                value={newTask.priority}
                onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Budget"
                value={newTask.budget}
                onChange={(e) => setNewTask({ ...newTask, budget: e.target.value })}
              />
              <Textarea
                placeholder="Notes"
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="sm:col-span-2"
              />
            </div>
            <Button className="mt-4" onClick={addNewTask}>Add Task</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeddingPlanner;

};

export default WeddingPlanner;
