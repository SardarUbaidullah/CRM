<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

     public function ownedTeams()
    {
        return $this->hasMany(Team::class, 'owner_id');
    }

    // Projects via pivot project_user
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_user')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    // Projects created (if you want)
    public function createdProjects()
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    // Tasks assigned to this user
    public function assignedTasks()
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    // Task comments
    public function taskComments()
    {
        return $this->hasMany(TaskComment::class);
    }

    // Discussion created
    public function discussions()
    {
        return $this->hasMany(Discussion::class, 'created_by');
    }

    // Discussion comments
    public function discussionComments()
    {
        return $this->hasMany(DiscussionComment::class);
    }

    // Files uploaded by user
    public function files()
    {
        return $this->hasMany(File::class);
    }

    // Time logs
    public function timeLogs()
    {
        return $this->hasMany(TimeLog::class);
    }
}

