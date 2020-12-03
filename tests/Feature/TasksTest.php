<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TasksTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * Test list all tasks
     *
     * @return void
     */
    public function testListAllTasks()
    {
        $user = \App\Models\User::factory()->create();
        $task = \App\Models\Task::factory(20)->create();

        $response = $this->get('/api/task');

        $response
            ->assertStatus(200)
            ->assertJsonPath('0.user_id', $user->id)
            ->assertJsonCount($task->count());
    }
}
