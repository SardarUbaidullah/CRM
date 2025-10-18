<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class tasks extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'assigned_to',
        'title',
        'description',
        'priority',
        'status',
        'due_date',
    ];

    protected $dates = [
        'due_date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Assigned user
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function subtasks()
    {
        return $this->hasMany(TaskSubtask::class);
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function timeLogs()
    {
        return $this->hasMany(TimeLog::class);
    }
}
