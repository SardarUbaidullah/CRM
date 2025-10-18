<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class time_logs extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'time_logs';

    protected $fillable = [
        'task_id',
        'user_id',
        'hours',
        'log_date',
    ];

    protected $dates = [
        'log_date',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
