import { randomUUID } from "crypto";
import { QueuedTask, Task } from "./types";
export class TaskQueue {
	#processedTasks = new Map<string, QueuedTask>();
	#tasks: QueuedTask[] = [];
	#maxRetries: number;

	constructor(maxRetries = 3) {
		this.#maxRetries = maxRetries;
	}

	/**
	 *Return the number of pending tasks
	 */
	size(): number {
		return this.#tasks.length;
	}

	/**
	 * Allows you to add a task to the queue and returns the ID of the task
	 */
	push(task: Task, ...args: any[]): string {
		const newTask: QueuedTask = {
			task,
			args,
			retryCount: 0,
			id: randomUUID(),
			status: "pending",
		};
		this.#processedTasks.set(newTask.id, newTask);
		this.#tasks.push(newTask);
		return newTask.id;
	}

	/**
	 * Execute tasks in order of adding them to the queue
	 */
	async run() {
		let task: QueuedTask | undefined;
		while ((task = this.#tasks.shift())) {
			await this.#runTask(task);
		}
	}

	async #runTask(task: QueuedTask) {
		try {
			await task.task();
			task.status = "success";
			this.#processedTasks.set(task.id, task);
		} catch (error) {
			if (task.retryCount < this.#maxRetries) {
				task.retryCount++;
				this.#tasks.push(task);
			} else {
				task.status = "error";
				task.failedReason = error;
				this.#processedTasks.set(task.id, task);
			}
		}
	}

	/**
	 * Return a task
	 */
	getTask(taskId: string) {
		const task = this.#processedTasks.get(taskId);
		if (!task) throw new Error(`can't find task ${taskId}`);
		return { id: task.id, status: task.status, failedReason: task.failedReason };
	}

	#findTask(taskId: string): QueuedTask {
		const task = this.#processedTasks.get(taskId);
		if (!task) throw new Error(`can't find task ${taskId}`);
		return task;
	}

	async runTaskById(taskId: string) {
		await this.#runTask(this.#findTask(taskId));
		const task = this.getTask(taskId);
		return { id: task.id, status: task.status, failedReason: task.failedReason };
	}
}
