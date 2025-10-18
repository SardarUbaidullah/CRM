<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class files extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'task_id',
        'user_id',
        'file_name',
        'file_path',
        'version',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
