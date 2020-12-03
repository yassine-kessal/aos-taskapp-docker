<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
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

        $responseWhenWeAreNotLogged = $this->getJson('/api/task');

        $responseWhenWeAreNotLogged->assertStatus(401);

        Sanctum::actingAs($user, ['*']);

        $responseWhenWeAreLogged = $this->getJson('/api/task');

        $responseWhenWeAreLogged
            ->assertStatus(200)
            ->assertJsonPath('0.user_id', $user->id)
            ->assertJsonCount($task->count());
    }

    /**
     * Test add new Task
     *
     * @return void
     */
    public function testAddTask() {
        $user = \App\Models\User::factory()->create();

        $responseWhenWeAreNotLogged = $this->postJson('/api/task');

        $responseWhenWeAreNotLogged->assertStatus(401);

        Sanctum::actingAs($user, ['*']);

        $responseWhenWeAreLoggedWithInvalidData = $this->postJson('/api/task', []);

        $responseWhenWeAreLoggedWithInvalidData
            ->assertStatus(422)
            ->assertJsonValidationErrors(["title"]);

        $responseWhenWeAreLoggedWithValidData = $this->postJson('/api/task', [
            'title' => 'New Task Test'
        ]);

        $responseWhenWeAreLoggedWithValidData
            ->assertStatus(201)
            ->assertJson(["title"=>"New Task Test", "user_id" => $user->id]);
    }

    /**
     * Test toggle completed Task
     *
     * @return void
     */
    public function testToggleCompletedTask() {
        $user = \App\Models\User::factory()->create();
        $task = \App\Models\Task::factory()->create();

        $responseWhenWeAreNotLogged = $this->patchJson("/api/task/{$task->id}/completed");

        $responseWhenWeAreNotLogged->assertStatus(401);

        Sanctum::actingAs($user, ['*']);

        $responseWhenWeTaskNotFound = $this->patchJson('/api/123/completed');

        $responseWhenWeTaskNotFound
            ->assertStatus(404);

        $responseWhenWeTaskFounded = $this->patchJson("/api/task/{$task->id}/completed");

        $responseWhenWeTaskFounded
            ->assertStatus(200)
            ->assertJson(["title"=>$task->title, "completed" => !$task->completed]);
    }

    /**
     * Test remove Task
     *
     * @return void
     */
    public function testRemoveTask() {
        $user = \App\Models\User::factory()->create();
        $task = \App\Models\Task::factory()->create();

        $responseWhenWeAreNotLogged = $this->deleteJson("/api/task/{$task->id}");

        $responseWhenWeAreNotLogged->assertStatus(401);

        Sanctum::actingAs($user, ['*']);

        $responseWhenWeAreLoggedWithTaskNotFound = $this->deleteJson('/api/123');

        $responseWhenWeAreLoggedWithTaskNotFound
            ->assertStatus(404);

        $responseWhenWeAreLoggedWithTaskFounded = $this->deleteJson("/api/task/{$task->id}");

        $responseWhenWeAreLoggedWithTaskFounded
            ->assertStatus(200);
    }

    /**
     * Test edit Task
     *
     * @return void
     */
    public function testEditTask() {
        $user = \App\Models\User::factory()->create();
        $task = \App\Models\Task::factory()->create();

        $responseWhenWeAreNotLogged = $this->patchJson("/api/task/{$task->id}");

        $responseWhenWeAreNotLogged->assertStatus(401);

        Sanctum::actingAs($user, ['*']);

        $responseWhenWeAreLoggedWithInvalidData = $this->patchJson('/api/task/'.$task->id, []);

        $responseWhenWeAreLoggedWithInvalidData
            ->assertStatus(422)
            ->assertJsonValidationErrors(["title"]);

        $responseWhenWeAreLoggedWithTaskNotFound = $this->patchJson('/api/task/123');

        $responseWhenWeAreLoggedWithTaskNotFound
            ->assertStatus(404);

        $responseWhenWeAreLoggedWithTaskFounded = $this->patchJson("/api/task/{$task->id}", ['title' => 'test', 'description'=>'descripption']);

        $responseWhenWeAreLoggedWithTaskFounded
            ->assertStatus(200)
            ->assertJson(["title"=>'test', 'description'=>'descripption']);
    }
}
