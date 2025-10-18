<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
           $table->id();
$table->foreignId('team_id')->constrained('teams')->onDelete('cascade');
$table->string('name');
$table->text('description')->nullable();
$table->date('start_date')->nullable();
$table->date('due_date')->nullable();
$table->string('status')->default('planned');
$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
