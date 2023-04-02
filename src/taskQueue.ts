export class TaskQueue<T = any> {
	#queues: T[] = [];

	push(task: T) {
		this.#queues.push(task);
	}

	getSize() {
		return this.#queues.length;
	}
}
