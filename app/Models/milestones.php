<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class milestones extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'title',
        'due_date',
        'status',
    ];

    protected $dates = [
        'due_date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
