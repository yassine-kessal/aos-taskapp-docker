<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // return Task::orderBy('completed')->orderBy('created_at', 'DESC')->get();
        return Task::where('user_id', $request->user()->id)->orderBy('created_at', 'DESC')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|min:3'
        ]);

        $task = new Task();
        $task->title = $request->title;
        $task->user_id = $request->user()->id;
        $task->completed = false;
        $task->save();

        return $task;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $this->validate($request, [
            'title' => 'required|min:3',
        ]);

        $task->fill($request->only(['title', 'description']));
        $task->save();

        return $task;
    }

    /**
     * Toggle Complete the specified task in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Task $task
     * @return bool
     */
    public function toggleCompleted(Request $request, Task $task)
    {
        $task->completed = !$task->completed;

        $task->save();

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Task::find($id)->delete();
    }
}
