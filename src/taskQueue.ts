import { QueuedTask, Task } from "./types";

export class TaskQueue {
	#tasks: QueuedTask[] = [];
	#maxRetries: number;

	constructor(maxRetries = 0) {
		this.#maxRetries = maxRetries;
	}

	getSize() {
		return this.#tasks.length;
	}

	push(task: Task, ...args: any[]) {
		this.#tasks.push({ task, args, retryCount: 0 });
	}

	async run() {
		for (const task of this.#tasks) {
			await this.#runTask(task);
		}
	}

	async runParallel() {
		await Promise.all(this.#tasks.map((task) => this.#runTask(task)));
	}

	async #runTask(task: QueuedTask) {
		try {
			await task.task(...task.args);
		} catch (error) {
			if (task.retryCount < this.#maxRetries) {
				task.retryCount++;
				await this.#runTask(task);
			} else {
				throw error;
			}
		}
	}
}
