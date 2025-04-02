import { useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Download, Upload, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  status: 'active' | 'inactive';
  lastActive: string;
}

interface UserManagementProps {
  users: User[];
  onUpdateUser: (userId: string, data: Partial<User>) => Promise<void>;
  onDeleteUser: (userId: string) => Promise<void>;
  onBulkImport: (file: File) => Promise<void>;
}

export function UserManagement({ users, onUpdateUser, onDeleteUser, onBulkImport }: UserManagementProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const columns = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      render: (value: string) => (
        <Badge variant={
          value === 'admin' ? 'default' :
          value === 'instructor' ? 'secondary' :
          'outline'
        }>
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'destructive'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'lastActive',
      title: 'Last Active',
      sortable: true,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, user: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onUpdateUser(user.id, {
                role: user.role === 'student' ? 'instructor' : 'student'
              })}
            >
              Change Role
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUpdateUser(user.id, {
                status: user.status === 'active' ? 'inactive' : 'active'
              })}
            >
              Toggle Status
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDeleteUser(user.id)}
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onBulkImport(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <div className="relative">
            <Input
              type="file"
              accept=".csv"
              className="hidden"
              id="import-users"
              onChange={handleFileUpload}
            />
            <Button variant="outline" asChild>
              <label htmlFor="import-users" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Import CSV
              </label>
            </Button>
          </div>
        </div>
      </div>

      <DataTable
        data={users}
        columns={columns}
        searchable={true}
      />
    </div>
  );
} 