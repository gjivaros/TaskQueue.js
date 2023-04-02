import { QueuedTask, Task } from "./types";

export class TaskQueue {
	#tasks: QueuedTask[] = [];
	#maxRetries: number;

	constructor(maxRetries = 3) {
		this.#maxRetries = maxRetries;
	}

	getSize() {
		return this.#tasks.length;
	}

	push(task: Task, ...args: any[]) {
		this.#tasks.push({ task, args, retryCount: 0 });
	}

	async run() {
		let task: QueuedTask | undefined;
		while ((task = this.#tasks.shift())) {
			await this.#runTask(task);
		}
	}

	async #runTask(task: QueuedTask) {
		try {
			await task.task();
		} catch (error) {
			if (task.retryCount < this.#maxRetries) {
				task.retryCount++;
				this.#tasks.push(task);
			} else {
				throw error;
			}
		}
	}
}
